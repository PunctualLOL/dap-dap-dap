import { Clock, MapPin, Phone, Mail } from "lucide-react";

const hours = [
  ["Monday", "Closed"],
  ["Tuesday – Thursday", "12pm – 8pm"],
  ["Friday – Saturday", "12pm – 9:30pm"],
  ["Sunday", "12pm – 7pm"],
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-ink text-ink-foreground">
      <div className="container py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <p className="font-serif text-3xl mb-4">
              District <span className="text-accent">45</span>
            </p>
            <p className="text-ink-foreground/60 text-sm leading-relaxed">
              Modern European dining in the heart of Magherafelt.
              Locally sourced, beautifully served.
            </p>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs text-accent mb-4">Find us</h4>
            <ul className="space-y-3 text-sm text-ink-foreground/70">
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />7 Garden Street<br />Magherafelt BT45 5DD</li>
              <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href="tel:02879300333" className="hover:text-accent">028 7930 0333</a></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href="mailto:info@district45.co.uk" className="hover:text-accent">info@district45.co.uk</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs text-accent mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-ink-foreground/70">
              {hours.map(([d, t]) => (
                <li key={d} className="flex justify-between gap-4">
                  <span>{d}</span>
                  <span className="text-ink-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-xs text-accent mb-4">Visit</h4>
            <p className="text-sm text-ink-foreground/70 leading-relaxed mb-3 flex gap-3">
              <Clock className="h-4 w-4 mt-0.5 shrink-0" />
              Reservations are highly recommended.
            </p>
            <a
              href="https://maps.google.com/?q=7+Garden+St,+Magherafelt+BT45+5DD"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              Get directions →
            </a>
          </div>
        </div>

        <div className="border-t border-ink-foreground/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-foreground/40">
          <p>© {new Date().getFullYear()} District 45 Restaurant. All rights reserved.</p>
          <p>Crafted with care in Magherafelt.</p>
        </div>
      </div>
    </footer>
  );
};
