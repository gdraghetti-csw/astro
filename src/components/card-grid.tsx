export default function CardGrid (data: {
  cards: {
    title: string;
    description: string;
    link?: string;
    image?: string;
    icon?: string;
  }[];
}){
  const cardClasses =
    "border border-black bg-neutral-background/75 rounded-lg group  shadow-lg hover:border-green-500 hover:text-green-500 hover:from-transparent hover:via-transparent hover:to-brand-secondary-hover/15 transition-all duration-300";

    return (
    <div className="my-8 grid grid-cols-1 rounded-lg gap-4 lg:grid-cols-3">
      {data.cards?.map((card, index) => {
        if (card.link) {
          return (
            <a
              href={card.link}
              className={cardClasses}
              key={`card-${index}-${card.title}`}
            >
              <div className="bg-[#f4f6f9] rounded-lg py-6 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="mb-4 rounded-md h-2 object-cover"
                  />
                )}
                {card.icon && (
                  <i className={card.icon} style={{ fontSize: "2.5rem"}}></i>
                )}
              </div>
              <div className="p-4" style={{ marginTop: "0", color: "black" }}>
                <h4 className="text-2xl font-medium mb-2" style={{ marginTop: "0"}}>
                  {card.title}
                </h4>

                <p className="text-neutral-text mb-10 leading-snug h-full">
                  {card.description || ""}
                </p>

                <p className="flex items-center bottom-4">
                    Vai alla documentazione ›
                </p>
              </div>
            </a>
          );
        }

        return (
          <div className={cardClasses} key={`card-${index}-${card.title}`}>
            <h2 className="text-2xl font-medium mb-2">
              {card.title}
            </h2>
            <p className="text-neutral-text mb-4">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};