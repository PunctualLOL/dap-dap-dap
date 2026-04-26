import heroImage from "@/assets/hero-restaurant.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="District 45 Restaurant interior with candlelit tables and a beautifully plated dish"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative container text-center text-ink-foreground py-32">
        <p className="uppercase tracking-[0.4em] text-accent text-xs md:text-sm mb-6">
          Modern European • Magherafelt
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 text-balance">
          A taste of refined<br />
          <span className="italic text-accent">European elegance</span>
        </h1>
        <p className="max-w-xl mx-auto text-base md:text-lg text-ink-foreground/80 mb-10 text-balance">
          Locally sourced ingredients, classic technique and a warm welcome
          on Garden Street in the heart of Magherafelt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="min-w-48">
            <a href="#book">Reserve a Table</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-w-48 bg-transparent border-ink-foreground/40 text-ink-foreground hover:bg-ink-foreground hover:text-ink">
            <a href="#menu">View the Menu</a>
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest text-ink-foreground/70">
          <span>★ 4.7 · 670+ Google Reviews</span>
          <span>#1 of 46 in Magherafelt</span>
        </div>
      </div>
    </section>
  );
};
