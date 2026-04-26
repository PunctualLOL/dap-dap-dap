import interior from "@/assets/interior.jpg";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-warm">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative">
          <img
            src={interior}
            alt="The warm, brick-walled dining room at District 45"
            width={1600}
            height={1024}
            loading="lazy"
            className="w-full h-[500px] object-cover shadow-elegant"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-[180px] shadow-gold">
            <p className="font-serif text-3xl">10+</p>
            <p className="text-xs uppercase tracking-widest mt-1 opacity-80">Years of fine dining</p>
          </div>
        </div>

        <div>
          <p className="uppercase tracking-[0.3em] text-primary text-xs mb-4">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-balance">
            A modern bistro with a twist
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Set on the scenic route between Belfast and Derry, District 45 has
            become a beacon of culinary delight in Magherafelt. Our expert chefs
            craft a modern bistro menu using only the finest ingredients, sourced
            locally from the most reputable producers.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Whether you're joining us for an early bird supper, a long Sunday
            lunch or a celebration with friends, we promise warm hospitality and
            food worth lingering over.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
            <div>
              <p className="font-serif text-2xl text-primary">Lunch · £14.95</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">2 courses · 12–5pm</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-primary">Early Bird · £15.95</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">2 courses · 5–7pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
