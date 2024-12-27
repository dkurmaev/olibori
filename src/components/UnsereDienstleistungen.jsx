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
  // {
  //   title: "Montage des Entwässerungssystems",

  //   imageUrl: "/images/Entwaesserungssystem.jpg",
  //   description:
  //     "Die Montage des Entwässerungssystems ist entscheidend für die Ableitung von Regenwasser und die Vermeidung von Wasserschäden.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Ein effizientes Entwässerungssystem sorgt dafür, dass Regenwasser ordnungsgemäß abgeleitet wird.</p>
  //     `,
  //     images: ["/images/Entwaesserungssystem.jpg"],
  //   },
  // },
  // {
  //   title: "Errichtung der Dachkonstruktion",

  //   imageUrl: "/images/Dachkonstruktion.jpg",
  //   description:
  //     "Die Errichtung der Dachkonstruktion umfasst die grundlegenden Arbeiten zur Stabilität und Form des Daches.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Diese Phase ist entscheidend für die Stabilität und die langfristige Funktionsfähigkeit des Daches.</p>
  //     `,
  //     images: ["/images/Dachkonstruktion.jpg"],
  //   },
  // },
  // {
  //   title: "Abdichtungs- und Dampfsperrschichten",

  //   imageUrl: "/images/Abdichtung.jpg",
  //   description:
  //     "Die Abdichtungs- und Dampfsperrschichten schützen das Dach vor Feuchtigkeit und anderen Umwelteinflüssen.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Diese Schichten sind entscheidend, um das Dach vor Wasser- und Dampfschäden zu schützen.</p>
  //     `,
  //     images: ["/images/Abdichtung.jpg"],
  //   },
  // },
  // {
  //   title: "Verlegung von Dämmmaterial",

  //   imageUrl: "/images/Daemmung.jpg",
  //   description:
  //     "Die Verlegung von Dämmmaterial verbessert die Energieeffizienz und den Wohnkomfort.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Die richtige Dämmung ist wichtig für den Energieverbrauch und das Raumklima.</p>
  //     `,
  //     images: ["/images/Daemmung.jpg"],
  //   },
  // },
  // {
  //   title: "Installation von Belüftungselementen",

  //   imageUrl: "/images/Belueftung.jpg",
  //   description:
  //     "Die Installation von Belüftungselementen sorgt für eine optimale Luftzirkulation im Dachraum.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Belüftungselemente sind wichtig, um Feuchtigkeitsansammlungen und Schimmelbildung zu vermeiden.</p>
  //     `,
  //     images: ["/images/Belueftung.jpg"],
  //   },
  // },
  // {
  //   title: "Verlegung von Bahnenabdichtungen",

  //   imageUrl: "/images/Bahnenabdichtung.jpg",
  //   description:
  //     "Die Verlegung von Bahnenabdichtungen schützt das Dach vor Wasser und anderen Witterungseinflüssen.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Bahnenabdichtungen sind eine bewährte Methode, um Flachdächer effektiv abzudichten.</p>
  //     `,
  //     images: ["/images/Bahnenabdichtung.jpg"],
  //   },
  // },
  // {
  //   title: "Balkonabdichtung",

  //   imageUrl: "/images/Balkonabdichtung.jpg",
  //   description:
  //     "Die Balkonabdichtung schützt den Balkon vor Wasser und erhöht die Lebensdauer der Konstruktion.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Eine ordnungsgemäße Abdichtung ist entscheidend, um Wasserschäden auf Balkonen zu verhindern.</p>
  //     `,
  //     images: ["/images/Balkonabdichtung.jpg"],
  //   },
  // },
  // {
  //   title: "Garagen- und Terrassenabdichtung",

  //   imageUrl: "/images/Garagenabdichtung.jpg",
  //   description:
  //     "Die Abdichtung von Garagen und Terrassen ist wichtig, um Wasseransammlungen und Schäden zu vermeiden.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Die Abdichtung schützt vor Feuchtigkeit und verlängert die Lebensdauer der Konstruktion.</p>
  //     `,
  //     images: ["/images/Garagenabdichtung.jpg"],
  //   },
  // },
  // {
  //   title: "Demontage des Dachs",

  //   imageUrl: "/images/Demontage.jpg",
  //   description:
  //     "Die Demontage des Dachs ist notwendig, wenn umfassende Reparaturen oder Sanierungen erforderlich sind.",
  //   optionDetails: {
  //     description: `
        
  //       <p>Diese Arbeiten sind essenziell, um das Dach gründlich zu überprüfen und zu reparieren.</p>
  //     `,
  //     images: ["/images/Demontage.jpg"],
  //   },
  // },
];

const Services = () => {
  const [tooltip, setTooltip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  // const handleOptionClick = (service, option) => {
  //   console.log(`Нажата опция: ${option} для сервиса:`, service);
  //   const selectedDetails = service.optionDetails[option];
  //   if (selectedDetails) {
  //     setSelectedOption({
  //       title: option,
  //       description: selectedDetails.description,
  //       images: selectedDetails.images,
  //     });
  //   } else {
  //     console.error(`Details für ${option} wurden nicht gefunden!`);
  //   }
  // };

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
    >
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-teal-900 uppercase border-b-2 border-teal-900 inline-block pb-1 text-center my-8">
            Unsere Dienstleistungen
          </h2>
          <div className="flex justify-center items-center relative group">
            <h3 className="text-4xl font-bold text-gray-900">
              Flachdachabdichtung
            </h3>
            {/* <FaInfoCircle className="hidden md:block text-teal-700 ml-2 h-8 w-8 cursor-pointer" />
            <div className="absolute left-0 top-full mt-4 hidden w-max bg-teal-700 text-white text-sm rounded-lg shadow-md px-3 py-2 group-hover:block">
              Die Flachdachabdichtung bietet eine robuste Lösung zur Abdichtung
              Ihres Flachdachs und schützt es vor Umwelteinflüssen.
            </div> */}
          </div>
        </div>
        <div className="space-y-12 mt-4">
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
              <div className="md:w-1/2 shadow-custom w-{500px} z-10">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
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
                      dangerouslySetInnerHTML={{ __html: service.optionDetails.description }}
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

      {selectedOption && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-visible">
          <div className="bg-white p-6 rounded-lg max-w-6xl relative">
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-16 h-16 relative"
              />
            </button>

            <div
              className="mb-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: selectedOption.description }}
            />
            <div className="grid grid-cols-1 gap-4 ">
              {selectedOption.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={selectedOption.title}
                  className="w-full h-48 object-cover rounded-lg shadow-custom "
                />
              ))}
            </div>

            <button
              onClick={() => setSelectedOption(null)}
              className="mt-4 w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
