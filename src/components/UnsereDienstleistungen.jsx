import { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";

const services = [
  {
    title: "Neubau",

    imageUrl: "/images/Neubau.jpg",
    description:
      "Der Neubau bietet eine moderne und funktionale Bauweise, die sich ideal für zeitgemäße Architektur eignet.",
    optionDetails: {
      description: `
        
        <p>Der Neubau ist der erste Schritt beim Bau eines Daches und umfasst alle notwendigen Arbeiten zur Errichtung einer neuen Dachkonstruktion.</p>
        <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
        <ul class="list-disc pl-5">
          <li>Moderne Gestaltungsmöglichkeiten.</li>
          <li>Hohe Energieeffizienz durch neue Materialien.</li>
        </ul>
      `,
      images: ["/images/Neubau.jpg"],
    },
  },
  {
    title: "Sanierung",

    imageUrl: "/images/Sanierung.jpg",
    description:
      "Die Sanierung verlängert die Lebensdauer und stellt die Funktionalität sowie Ästhetik des Daches wieder her.",
    optionDetails: {
      description: `
        
        <p>Die Sanierung umfasst die Wiederherstellung und Verbesserung der bestehenden Dachkonstruktion.</p>
        <h4 class="text-lg font-semibold mt-4 mb-2">Ursachen für Sanierung:</h4>
        <ul class="list-disc pl-5">
          <li>Undichtigkeiten, Rissbildungen und Blasenbildung.</li>
          <li>Erhöhte Energiekosten durch schlechte Isolation.</li>
        </ul>
      `,
      images: ["/images/Sanierung.jpg"],
    },
  },
  {
    title: "Wartung",

    imageUrl: "/images/wartung.jpg",
    description:
      "Die regelmäßige Wartung sichert die Langlebigkeit Ihres Daches und beugt Schäden vor.",
    optionDetails: {
      description: `
        
        <p>Die Wartung umfasst die regelmäßige Inspektion und Pflege Ihres Daches, um langfristige Schäden zu vermeiden.</p>
        <h4 class="text-lg font-semibold mt-4 mb-2">Ziele der Wartung:</h4>
        <ul class="list-disc pl-5">
          <li>Früherkennung von Schäden.</li>
          <li>Verlängerung der Lebensdauer und Senkung von Reparaturkosten.</li>
        </ul>
      `,
      images: ["/images/wartung.jpg"],
    },
  },
  {
    title: "Reparatur",

    imageUrl: "/images/Reparatur.jpg",
    description:
      "Die Dachreparatur ist essenziell für die Wiederherstellung der Dichtheit und Funktionalität.",
    optionDetails: {
      description: `
        
        <p>Die Reparatur umfasst die Behebung von Schäden an der Dachkonstruktion.</p>
        <h4 class="text-lg font-semibold mt-4 mb-2">Häufige Ursachen für Undichtigkeiten:</h4>
        <ul class="list-disc pl-5">
          <li>Risse und Blasen in der Abdichtung.</li>
          <li>Verstopfte Entwässerung oder schadhafte Anschlüsse.</li>
        </ul>
      `,
      images: ["/images/Reparatur.jpg"],
    },
  },
];

const Services = () => {
  const [tooltip, setTooltip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  const scrollToCostCalculator = () => {
    const costCalculatorSection = document.getElementById("cost-calculator");
    if (costCalculatorSection) {
      const rect = costCalculatorSection.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetY =
        rect.top + scrollTop - window.innerHeight / 2 + rect.height / 2;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentSectionRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-16 bg-gray-400 inset-0  bg-opacity-100"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-bold uppercase text-gray-800 tracking-wider mb-12 border-b-2 border-yellow-400 inline-block pb-1">
            Unsere Dienstleistungen
          </h2>
          <div className="flex justify-center items-center relative group">
            <h3 className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-heading font-bold text-gray-900 uppercase ">
              Flachdachabdichtung
            </h3>
          </div>
        </div>
        <div className="space-y-24 mt-8 md:mt-16">
          {services.map((service, index) => (
            <div
              key={service.description}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center transition-all duration-1000 ${
                isVisible
                  ? index % 2 === 0
                    ? "translate-x-0 opacity-100"
                    : "translate-x-0 opacity-100"
                  : index % 2 === 0
                  ? "-translate-x-20 opacity-0"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="min-w-full snap-start md:min-w-[50%] p-2">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-80 object-cover rounded-lg shadow-2xl  shadow-teal-900 transform transition-transform duration-200 hover:scale-105"
                />
              </div>

              <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  {service.title}

                  <div
                    className="ml-2 text-teal-800 cursor-pointer relative"
                    onMouseEnter={() => setTooltip(service.title)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <FaInfoCircle className="hidden md:block  text-teal-700 mr-5 " />

                    {tooltip === service.title && (
                      <div className="absolute w-[500px] z-50 p-2 text-xl italic text-white bg-teal-800 rounded-lg ">
                        {service.description}
                      </div>
                    )}
                  </div>
                </h3>

                <ul className="mb-4 space-y-2">
                  <li className="text-lg">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: service.optionDetails.description,
                      }}
                    />
                  </li>
                </ul>
                <button
                  onClick={scrollToCostCalculator}
                  className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
                >
                  Kostenberechnung
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
