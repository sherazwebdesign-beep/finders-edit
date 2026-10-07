import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const imageSchema = z.object({ data: z.string().max(7_000_000), type: z.enum(['image/jpeg', 'image/png', 'image/webp']), name: z.string().max(200) });
export const submitRequest = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ kind: z.enum(['contact', 'styling']), name: z.string().trim().min(1).max(120), email: z.string().email().max(254), details: z.record(z.string().max(6000)), images: z.array(imageSchema).max(3).default([]), website: z.string().max(0).default('') }).parse(data))
  .handler(async ({ data }) => {
    // Public intake endpoint: only creates requests, never exposes existing customer data.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const id = crypto.randomUUID();
    const paths: string[] = [];
    try {
      for (const [i, image] of data.images.entries()) {
        const bytes = Uint8Array.from(atob(image.data), (c) => c.charCodeAt(0));
        if (bytes.length > 5 * 1024 * 1024) throw new Error('Each image must be 5 MB or smaller.');
        const valid = image.type === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 : image.type === 'image/png' ? bytes[0] === 137 && bytes[1] === 80 : String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
        if (!valid) throw new Error('Please upload a JPG, PNG, or WebP image.');
        const path = `${id}/${i}.${image.type.split('/')[1]}`;
        const { error } = await supabaseAdmin.storage.from('styling-inspiration').upload(path, bytes, { contentType: image.type });
        if (error) throw new Error('An image could not be uploaded. Please try again.');
        paths.push(path);
      }
      const { error } = await supabaseAdmin.from('website_requests').insert({ id, kind: data.kind, name: data.name, email: data.email, details: { ...data.details, images: paths } });
      if (error) throw new Error('Your note could not be saved. Please try again.');
      return { saved: true };
    } catch (error) {
      if (paths.length) await supabaseAdmin.storage.from('styling-inspiration').remove(paths);
      throw error;
    }
  });

export const subscribe = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ email: z.string().email().max(254), website: z.string().max(0).default('') }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const token = crypto.randomUUID();
    const { error } = await supabaseAdmin.from('newsletter_subscriptions').upsert({ email: data.email.toLowerCase(), subscribed: true, unsubscribe_token: token }, { onConflict: 'email' });
    if (error) throw new Error('We could not add you to the list. Please try again.');
    return { token };
  });

export const unsubscribe = createServerFn({ method: 'POST' })
  .inputValidator((data) => z.object({ token: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('newsletter_subscriptions').update({ subscribed: false }).eq('unsubscribe_token', data.token);
    if (error) throw new Error('Please try again.');
    return { saved: true };
  });