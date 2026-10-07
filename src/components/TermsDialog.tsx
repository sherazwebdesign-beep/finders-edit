import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from '@tanstack/react-router';

export function TermsDialog({ topic, close }: { topic: string | null; close: () => void }) {
  return <Dialog open={Boolean(topic)} onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
      <DialogTitle className="font-serif text-3xl font-normal">{topic}</DialogTitle>
      <DialogDescription>{topic === 'Privacy' ? 'We use your contact details to respond to your request. Styling images are stored privately and are not shown publicly. Joining the list saves your email for Finders Edit updates; you can unsubscribe at any time. Please do not upload sensitive personal information.' : 'Rental duration, deposits, delivery, returns, and damage terms will be agreed before any reservation or payment is confirmed. A piece in your bag is not a confirmed booking. Contact us for the terms for your piece and dates.'}</DialogDescription>
      <Link to="/contact" onClick={close} className="link-line self-start">Ask the Archive →</Link>
    </DialogContent>
  </Dialog>;
}