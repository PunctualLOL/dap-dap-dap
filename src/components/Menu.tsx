import steak from "@/assets/dish-steak.jpg";
import dessert from "@/assets/dish-dessert.jpg";
import tacos from "@/assets/dish-tacos.jpg";

const dishes = [
  {
    name: "Filet Mignon",
    description: "Prime cut steak, peppercorn sauce, hand-cut chips, seasonal greens.",
    price: "£28",
    image: steak,
    tag: "Signature",
  },
  {
    name: "Pulled Pork Tacos",
    description: "Slow-cooked pulled pork, fresh slaw, lime, soft corn tortillas.",
    price: "£14",
    image: tacos,
    tag: "Sharing",
  },
  {
    name: "Apple Crumble",
    description: "Bramley apples, buttery crumble, vanilla bean ice cream, salted caramel.",
    price: "£8",
    image: dessert,
    tag: "Dessert",
  },
];

const more = [
  ["Smoked Cheese Arancini", "£8"],
  ["Vegetable Samosas", "£7"],
  ["Sticky Wings", "£9"],
  ["Peppered Chicken", "£19"],
  ["Roasted Duck", "£24"],
  ["Smoked Cod Dinner", "£21"],
  ["Italian Chicken", "£18"],
  ["Eton Mess", "£8"],
  ["Chocolate Fudge Cake", "£8"],
  ["Cheesecake", "£8"],
];

export const Menu = () => {
  return (
    <section id="menu" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-primary text-xs mb-4">Menu Highlights</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-balance">
            From the kitchen
          </h2>
          <p className="text-muted-foreground">
            A seasonal selection inspired by modern European technique and the
            very best of Northern Irish produce.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {dishes.map((d) => (
            <article
              key={d.name}
              className="group bg-card shadow-soft hover:shadow-elegant transition-[box-shadow,transform] duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs uppercase tracking-widest px-3 py-1">
                  {d.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-2xl">{d.name}</h3>
                  <span className="text-primary font-medium">{d.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="bg-secondary/50 p-8 md:p-12 border border-border">
          <h3 className="font-serif text-2xl mb-8 text-center">Also on the menu</h3>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
            {more.map(([name, price]) => (
              <li key={name} className="flex justify-between items-baseline border-b border-dashed border-border pb-2">
                <span>{name}</span>
                <span className="text-muted-foreground text-sm">{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
