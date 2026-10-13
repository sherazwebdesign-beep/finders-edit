<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared navigation, footer and an in-session bag in the root layout so every page shares the same browsing state.
- Use client-safe server-function modules for public intake; only validated writes reach private Cloud tables and image storage, never public reads.
- Treat sample inventory as unverified until owner-supplied product records and photographs replace it, so demonstration content cannot imply authenticity.
- Keep approved brand copy and visual preferences in project memory, not architecture rules.

## Base44 dev environment (this sandbox)

- Run everything with `docker compose -f docker-compose.base44.yml up -d`. A single service (`web`) runs the repo's own Vite dev server from the bind-mounted checkout on host port 3000; startup installs from `bun.lock` before serving. No local database exists: browsing data is static (`src/lib/pieces.ts`) and all persistence goes to the hosted Supabase project.
- The committed `.env` carries the public Supabase URL and publishable key (client-safe). `SUPABASE_SERVICE_ROLE_KEY` is a user secret delivered to `/run/base44/app.env`, which is the last `env_file:` entry so a dashboard value always overrides repo defaults. Without it every page still renders; only the contact, private-styling and newsletter server functions fail.
- `BASE44_PREVIEW_MODE` is passed through to the service but no code branches on it: this setup needs no sandbox-only application override, so behaviour is identical with the flag set or unset.
- `/archive` and `/contact` canonicalize server-side: both answer 307 to the fully-populated URL (e.g. `/archive?view=all&mood=&event=&destination=&color=&type=&mode=all`, `/contact?topic=&ref=`). Follow the redirect when checking a route by hand.
- Verifying by hand: `curl -H "Host: 3000-x.$BASE44_SANDBOX_HOST_DOMAIN" http://localhost:3000/<route>`. The preview proxy rewrites Host to that sandbox form, so a Vite allowedHosts miss shows as 403 from the container.
- Server functions POST to `/_serverFn/<id>` with `x-tsr-serverFn: true`. The CSRF middleware in `src/start.ts` trusts `Sec-Fetch-Site: same-origin`, which the preview proxy forwards, so submissions work in the preview without any origin allowlist change. A request without that header is correctly rejected with 403.
- First client-side click into each route loads that route's modules over the preview proxy and can take several seconds in this sandbox; plain server requests render in milliseconds, so slow navigation is not an app fault.
- Six product photographs are not committed to this repo as files: `src/assets/photoN.jpg.asset.json` only carries a metadata record whose `url` points at Lovable's asset host (`/__l5e/assets-v1/<asset_id>/photoN.jpg`). Those URLs 404 outside Lovable (the preview showed a black hero and missing product shots), so the same six files are mirrored under `public/__l5e/assets-v1/<asset_id>/` and Vite serves them at the root. Refresh them from `https://finders-edit.lovable.app<url>` if the originals change; drop the mirror if the asset records ever point somewhere reachable.
- The bundled vitest suite does not pass here and is not a gate for changes: under bun (`docker compose -f docker-compose.base44.yml exec web bunx vitest run`) zod fails to resolve (`z.object` undefined, a bun/vitest interop issue), and under node (`docker run --rm -v "$PWD":/app -w /app node:22 ./node_modules/.bin/vitest run`) both routing tests time out waiting for the router to mount in jsdom. Verify changes through the running app and the route checks above instead.
