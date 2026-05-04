type Property = {
  name: string;
  description?: string;
  typeUrl?: string;
  icon?: string;
  icon_link?: string;
  required?: boolean;
  experimental?: boolean;
};

type Props = {
  property?: Property[];
};

function controlIconColor(iconName: string): string {
  if (iconName.toLowerCase().includes("folder")) {
    return "#f2b559";
  }
  if (iconName.toLowerCase().includes("pdf")) {
    return "#F25959";
  }
  if (iconName.toLowerCase().includes("doc") || iconName.toLowerCase().includes("file-code")) {
    return "#59a9f2";
  }
  return "currentColor";
}

export default function TypeDefinition({ property = [] }: Props) {
  return (
    <div className="bg-neutral-background rounded-lg shadow-lg border border-gray-500/20 my-6 py-2 hover:border-black transition-shadow duration-300">

      {property.map((prop, index) => (
        <div key={`property-${index}`}>

          {index !== 0 && (
            <hr className="h-px w-full bg-neutral-border border-none" />
          )}

          <div className="space-y-4 py-2 px-6">
            <div className="w-full text-sm mb-0.5 text-neutral-text">

              {prop.typeUrl ? (
                <a
                  href={prop.typeUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="block"
                  style={{ color: "black"}}
                >
                  <div className="w-full flex flex-col md:flex-row md:items-start gap-2">

                    {/* ICONA SINISTRA */}
                    <div className="flex justify-start md:w-1/9">
                          {prop.icon && (
                            <i className={prop.icon} style={{ fontSize: "2.5rem", color: controlIconColor(prop.icon) }}></i>
                          )}
                      </div>

                    {/* CONTENUTO */}
                    <div className="flex-1 md:w-7/9">

                      <div className="font-heading text-lg text-neutral-text inline-block">
                        {prop.name?.replace(/([A-Z])/g, "\u200B$1")}
                      </div>

                      {prop.description && (
                        <div className="text-neutral-text-secondary text-sm">
                          {prop.description}
                        </div>
                      )}

                      <div className="mb-1 space-y-1">
                        {prop.required && (
                          <p className="text-amber-600 font-medium text-xs">
                            REQUIRED
                          </p>
                        )}

                        {prop.experimental && (
                          <p className="bg-gradient-to-r from-brand-secondary-gradient-start to-brand-secondary-gradient-end bg-clip-text text-transparent font-medium text-xs">
                            EXPERIMENTAL
                          </p>
                        )}
                      </div>

                    </div>

                    {/* ICONA DESTRA */}
                    <div className="w-full md:w-1/9 flex justify-end"> 
                        {prop.icon_link ? (
                            <div className="flex justify-center">
                              <i className={prop.icon_link} style={{ fontSize: "1.5rem" }}></i>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <i className="fa-duotone fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "1.5rem" }}></i>
                            </div>
                          ) }
                      </div>

                  </div>
                </a>
              ) : (
                <span>{prop.name}</span>
              )}

            </div>
          </div>

        </div>
      ))}

      {property.some((prop) => prop.required) && (
        <div className="mx-6 my-2 p-4 bg-neutral-background-secondary border border-neutral-border rounded-md flex items-start gap-3">
          <p className="text-sm text-neutral-text">
            All properties marked as{" "}
            <span className="text-amber-600 font-medium">
              REQUIRED
            </span>{" "}
            must be specified for the field to work properly.
          </p>
        </div>
      )}

    </div>
  );
}