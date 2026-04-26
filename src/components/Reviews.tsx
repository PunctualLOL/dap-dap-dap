import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    text: "Absolutely outstanding. The filet mignon was cooked to perfection and the service was warm and attentive. Easily the best meal we've had in Magherafelt.",
    source: "Tripadvisor",
  },
  {
    name: "James O.",
    text: "We came for the early bird and stayed for dessert. The apple crumble is a thing of beauty. Booking is essential — and well worth it.",
    source: "Google",
  },
  {
    name: "Aoife R.",
    text: "Stylish setting, brilliant cocktails and a menu with real flair. District 45 is a proper occasion restaurant that doesn't take itself too seriously.",
    source: "Google",
  },
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-ink text-ink-foreground">
      <div className="container">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-accent text-xs mb-4">Guest Reviews</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Rated <span className="text-accent">4.7</span> by our guests
          </h2>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-ink-foreground/60 text-sm">From over 1,000 verified reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="border border-ink-foreground/10 p-8 hover:border-accent/40 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-serif text-lg italic leading-relaxed mb-6 text-ink-foreground/90">
                "{r.text}"
              </p>
              <footer className="text-sm">
                <p className="font-medium">{r.name}</p>
                <p className="text-ink-foreground/50 text-xs uppercase tracking-widest mt-1">{r.source}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
