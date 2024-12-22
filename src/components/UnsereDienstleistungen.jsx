import { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";

const services = [
  {
    title: "Flachdachabdichtung",
    options: ["Neubau", "Sanierung", "Wartung", "Reparatur"],
    imageUrl: "/images/Sanierung.jpg",
    description:
      "Die Flachdachabdichtung bietet eine robuste Lösung zur Abdichtung Ihres Flachdachs und schützt es vor Umwelteinflüssen.",
    optionDetails: {
      Neubau: {
        description: `
          <h3 class="text-xl font-bold mb-2">Der Flachdach Neubau</h3>
          <p>Der Flachdach Neubau bietet eine moderne und funktionale Bauweise, die sich ideal für zeitgemäße Architektur eignet.</p>
          
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile eines Flachdachs:</h4>
          <ul class="list-disc pl-5">
            <li>Minimalistische Ästhetik: Klare Linien und eine schlichte Formgebung.</li>
            <li>Optimale Raumnutzung: Ermöglicht die Nutzung des Dachs als Terrasse oder Garten.</li>
            <li>Umweltfreundlich: Ideal für Dachbegrünungen, die zur Artenvielfalt und zum Umweltschutz beitragen.</li>
          </ul>
          
          <h4 class="text-lg font-semibold mt-4 mb-2">Materialien und Konstruktion:</h4>
          <p>Flachdächer werden in der Regel mit Bitumenbahnen oder EPDM-Folie abgedichtet, um eine lange Haltbarkeit zu gewährleisten.</p>
          <p>Die tragende Konstruktion besteht meist aus einer dicken Stahlbetonplatte, die für Stabilität sorgt.</p>
          
          <h4 class="text-lg font-semibold mt-4 mb-2">Ein modernes Flachdach:</h4>
          <p>Ein modernes Flachdach mit Dachgarten, das zusätzlichen Wohnraum schafft, und die verschiedenen Schichten eines Flachdachs anschaulich erklärt.</p>
        `,
        images: ["/images/Neubau.jpg"],
      },
      Sanierung: {
        description: `
          <h3 class="text-xl font-bold mb-2">Flachdach Sanierung</h3>
          <p>Die Flachdach Sanierung verlängert die Lebensdauer und stellt die Funktionalität sowie Ästhetik des Daches wieder her.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Ursachen für Sanierung:</h4>
          <ul class="list-disc pl-5">
            <li>Undichtigkeiten, Rissbildungen, Blasenbildung oder Wärmedämmungsschwäche.</li>
            <li>Erhöhte Energiekosten durch schlechte Isolation.</li>
          </ul>
        `,
        images: ["/images/Sanierung.jpg"],
      },
      Wartung: {
        description: `
          <h3 class="text-xl font-bold mb-2">Flachdach Wartung</h3>
          <p>Die regelmäßige Wartung sichert die Langlebigkeit Ihres Daches und beugt Schäden vor.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Ziele der Wartung:</h4>
          <ul class="list-disc pl-5">
            <li>Früherkennung von Schäden.</li>
            <li>Verlängerung der Lebensdauer und Senkung von Reparaturkosten.</li>
          </ul>
        `,
        images: ["/images/wartung.jpg"],
      },
      Reparatur: {
        description: `
          <h3 class="text-xl font-bold mb-2">Flachdach Reparatur</h3>
          <p>Die Flachdach Reparatur ist essenziell für die Wiederherstellung der Dichtheit und Funktionalität.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Häufige Ursachen für Undichtigkeiten:</h4>
          <ul class="list-disc pl-5">
            <li>Risse und Blasen in der Abdichtung.</li>
            <li>Verstopfte Entwässerung oder schadhafte Anschlüsse.</li>
          </ul>
        `,
        images: ["/images/Reparatur.jpg"],
      },
    },
  },
  {
    title: "Unterkonstruktion",
    options: ["Beton", "Trapezblech"],
    imageUrl: "/images/Slide14.jpg",
    description:
      "Dient als Basis für alle nachfolgenden Schichten des Daches. Gewährleistet Stabilität und gleichmäßige Lastverteilung.",
    optionDetails: {
      Beton: {
        description: `
          <h3 class="text-xl font-bold mb-2">Flachdach Unterkonstruktion – Beton</h3>
          <p>Eine stabile und langlebige Basis, die häufig in industriellen Gebäuden verwendet wird.</p>   
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Sehr robust, langlebig und geeignet für schwere Dachkonstruktionen.</li>            
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Nachteile:</h4>
          <ul class="list-disc pl-5">
            <li>Höheres Gewicht erfordert eine solide Tragstruktur, kostspieliger als Alternativen.</li>            
          </ul>
        `,
        images: ["/images/Neubau.jpg"],
      },
      Trapezblech: {
        description: `
          <h3 class="text-xl font-bold mb-2">Flachdach Unterkonstruktion – Trapezblech</h3>
          <p>Trapezblech ist eine leichtere Alternative zu Beton, bietet aber dennoch hohe Stabilität und Flexibilität.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Leichte Handhabung und schnelle Installation.</li>
            <li>Ideal für gewerbliche Gebäude.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Nachteile:</h4>
          <ul class="list-disc pl-5">
            <li>Geringere Stabilität bei starker Belastung, kann korrosionsanfällig sein, wenn nicht gut geschützt.</li>            
          </ul>
             
        `,
        images: ["/images/Trapezblech.jpg"],
      },
    },
  },
  {
    title: "Dampfsperre ",
    options: ["S4 + Alu", "RE-Folie"],
    imageUrl: "/images/Dampfsperre.jpg",
    description:
      "Schützt Dachflächen vor Dampf und Wasser, kann auch Dachschutz sein.",
    optionDetails: {
      "S4 + Alu": {
        description: `
          <h3 class="text-xl font-bold mb-2">Dampfsperre – S4 + Alu</h3>
          <p>Die Dampfsperre S4 + Alu ist eine Bitumen-Dampfsperrbahn, die eine Kombination aus Aluminium-Polyester-Kombination und Glasvlies als Trägereinlage aufweist. Sie dient als effektive Dampfsperre, um warme oder feuchte Luft von der Dämmung abzusperren und dadurch die Dämmfähigkeit zu erhalten und Schimmelbildung zu verhindern.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Eigenschaften:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Trägereinlage:</strong>Aluminium-Polyester-Kombination + Glasvlies.</li>
            <li><strong>Funktion:</strong>Dampfsperre.</li>
            <li><strong>Verwendung:</strong>als Dämmungsschicht auf mineralischen Unterlagen oder Stahltrapezblechen.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Hohe Diffusionsdichte und Wärmedämmung.</li>
            <li>Schutz gegen Schimmelbildung und Feuchtigkeit.</li>
            <li>Verwendung auf verschiedenen Unterlagen ermöglicht.</li>
          </ul>
        `,
        images: ["/images/Dampfsperre.jpg"],
      },
      "RE-Folie": {
        description: `
          <h3 class="text-xl font-bold mb-2">Dampfsperre – RE-Folie</h3>
          <p>Die Dampfsperre RE-Folie ist eine spezielle Folie, die zur Feuchtigkeitssperre und -regulierung in Gebäuden eingesetzt wird. Sie besteht aus Polyethylen (PE) und ist mit einer Stärke von 0,2 mm ausgestattet.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Anwendungsbereiche:</h4>
          <p>Die Dampfsperre PE-Folie wird in verschiedenen Anwendungsbereichen eingesetzt, wie zum Beispiel:</p>
          <ul class="list-disc pl-5">
            <li>Unter Laminatboden oder Parkett.</li>
            <li>Unter Estrichen und Spachtelmassen.</li>
            <li>Als Zwischenlage zwischen Dämmunterlage und Estrich.</li>
            <li>Als Feuchtigkeitsschutz bei Außenwänden und Dächern.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Hohe Diffusionsdichte und Wärmedämmung.</li>
            <li>Schutz gegen Schimmelbildung und Feuchtigkeit.</li>
            <li>Leicht zu verlegen und zu bearbeiten.</li>
            <li>Günstiger Preis im Vergleich zu anderen Dampfsperren.</li>
          </ul>
        `,
        images: ["/images/Pe Folie.jpg"],
      },
    },
  },
  {
    title: "Dämmung ",
    options: ["PUR/PIR", "EPS"],
    imageUrl: "/images/EPS.jpg",
    description: "Schützt Dachflächen vor Dämmung, kann auch Dämmschutz sein.",
    optionDetails: {
      "PUR/PIR": {
        description: `
          <h3 class="text-xl font-bold mb-2">Dämmung – PUR/PIR</h3>
          <p>PUR (Polyurethan) und PIR (Polyisocyanurat) sind zwei synthetische Hartschaumplatten, die als Dämmstoffe eingesetzt werden. Beide Materialien basieren auf demselben Rohstoff, dem MDI (Methylendiisocyanat), aber unterscheiden sich in ihrer chemischen Struktur und Eigenschaften.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Eigenschaften von PUR und PIR:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Wärmeleitfähigkeit: </strong>Beide Materialien haben eine sehr geringe Wärmeleitfähigkeit (λ: 0,02 bis 0,025 W/mK), was sie für die Wärmedämmung von Gebäuden geeignet macht.</li>            
            <li><strong>Temperaturbeständigkeit: </strong> Beide Materialien sind temperaturbeständig und bleiben zwischen -80°C und +130°C formstabil.</li>
            <li><strong>Wasserabweisend:</strong>PUR und PIR sind wasserabweisend und bieten somit Schutz gegen Feuchtigkeit.</li>  
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile und Nachteile:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Vorteile:</strong> Hohe Wärmedämmeigenschaften, druckbelastbar, temperaturbeständig, wasserabweisend, geringes Eigengewicht.</li>
            <li><strong>Nachteile:</strong> Basieren auf Erdöl, können toxische Gase bei Brandfall freisetzen, hoher Energieaufwand bei Produktion.</li>
           </ul>
          
        `,
        images: ["/images/PIR.jpg"],
      },
      EPS: {
        description: `
          <h3 class="text-xl font-bold mb-2">Dämmung – EPS</h3>
          <p>EPS (Expandiertes Polystyrol) ist ein kostengünstiger und vielseitiger Dämmstoff, der in vielen Bereichen eingesetzt wird. Hier sind einige wichtige Aspekte zu beachten.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Kostengünstig:</strong>EPS ist eines der billigsten Dämmstoffe auf dem Markt.</li>
            <li><strong>Leicht:</strong>EPS-Platten sind leicht zu verarbeiten und zu transportieren.</li>
            <li><strong>Vielseitig einsetzbar:</strong>EPS kann für nahezu jede Anwendung im Baubereich verwendet werden, wie z.B. in der Fassaden-, Wand- und Dachdämmung, als Trittschalldämmung oder in der Kerndämmung von zweischaligen Wänden.</li>
            <li><strong>Energieeinsparung:</strong>Durch die Verwendung von EPS kann in Häusern sehr viel Energie und damit auch Geld gespart werden.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Nachteile:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Feuchtigkeitsempfindlichkeit:</strong>EPS ist nicht wasserfest und sollte daher in feuchten Bereichen wie z.B. Keller oder Badezimmer nur bedingt verwendet werden.</li>
            <li><strong>Druckempfindlichkeit: </strong> EPS hat eine geringere Druckfestigkeit als andere Dämmstoffe wie XPS und sollte daher in Anwendungen mit hoher Belastung (z.B. Bodendämmung) nicht verwendet werden.</li>
            <li><strong>Verwitterung:</strong>EPS kann bei langem Einsatz und hoher Temperaturveränderung verwittern und seine Dämmwirkung verlieren.</li>
          <h4 class="text-lg font-semibold mt-4 mb-2">Einsatzorte:</h4>
          <ul class="list-disc pl-5">
            <li>Fassaden- und Wanddämmung</li>
            <li>Dachdämmung</li>
            <li>Kerndämmung von zweischaligen Wänden</li>
            <li>Bodendämmung (nur bei geringer Belastung)</li>
        `,
        images: ["/images/EPS.jpg"],
      },
    },
  },
  {
    title: "Kunststoffbahn",
    options: ["PVC", "TPO"],
    imageUrl: "/images/PVC.jpg",
    description: "Schützt Dachflächen vor Dämmung, kann auch Dämmschutz sein.",
    optionDetails: {
      PVC: {
        description: `          
          <h3 class="text-xl font-bold mb-2">Kunststoffbahn – PVC</h3>
          <p>Die Kunststoffbahn aus PVC (Polyvinylchlorid) ist eine beliebte Lösung für die Abdichtung von Flachdächern, insbesondere im Industrie- und Hallenbau. Sie zeichnet sich durch folgende Eigenschaften aus.</p>
          <br/>
          <ul class="list-disc pl-5">
            <li><strong>Hohe Zugfestigkeit:</strong>Kunststoffbahnen aus PVC sind sehr widerstandsfähig gegen Zugspannungen und können hohe Lasten tragen.</li>
            <li><strong>Flexibilität:</strong>Sie sind elastisch und können sich an die Oberfläche des Daches anpassen, ohne zu brechen oder zu reißen.</li>
            <li><strong>Hohes Deckvermögen:</strong>Kunststoffbahnen können sich bei Temperaturenänderungen und Feuchtigkeitsschwankungen dehnen, ohne zu brechen.</li>
            <li><strong>Widerstand gegen aggressive Medien:</strong>Sie sind widerstandsfähig gegen sauren Regen, Mineralöle, Fettsäuren und UV-Licht.</li>
            <li><strong>Temperaturbeständigkeit:</strong> Kunststoffbahnen aus PVC sind temperaturbeständig, sowohl bei Kälte als auch bei großer Hitze.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Hohe Diffusionsdichte und Wärmedämmung.</li>
            <li>Schutz gegen Schimmelbildung und Feuchtigkeit.</li>
            <li>Verwendung auf verschiedenen Unterlagen ermöglicht.</li>
          </ul>
        `,
        images: ["/images/PVC.jpg"],
      },
      TPO: {
        description: `
          <h3 class="text-xl font-bold mb-2">Kunststoffbahn – TPO</h3>
          <p>Die Kunststoffbahn aus TPO (Teflon Polypropylen) ist eine beliebte Lösung für die Abdichtung von Flachdächern, insbesondere im Industrie- und Hallenbau. Sie zeichnet sich durch folgende Eigenschaften aus.</p>
          <br/>
          <ul class="list-disc pl-5">
            <li><strong>Hohe Zugfestigkeit:</strong>Kunststoffbahnen aus PVC sind sehr widerstandsfähig gegen Zugspannungen und können hohe Lasten tragen.</li>
            <li><strong>Flexibilität:</strong>Sie sind elastisch und können sich an die Oberfläche des Daches anpassen, ohne zu brechen oder zu reißen.</li>
            <li><strong>Hohes Deckvermögen:</strong>Kunststoffbahnen können sich bei Temperaturenänderungen und Feuchtigkeitsschwankungen dehnen, ohne zu brechen.</li>
            <li><strong>Widerstand gegen aggressive Medien:</strong>Sie sind widerstandsfähig gegen sauren Regen, Mineralöle, Fettsäuren und UV-Licht.</li>
            <li><strong>Temperaturbeständigkeit:</strong> Kunststoffbahnen aus PVC sind temperaturbeständig, sowohl bei Kälte als auch bei großer Hitze.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Hohe Diffusionsdichte und Wärmedämmung.</li>
            <li>Schutz gegen Schimmelbildung und Feuchtigkeit.</li>
            <li>Verwendung auf verschiedenen Unterlagen ermöglicht.</li>
          </ul>
        `,
        images: ["/images/FPO.jpg"],
      },
    },
  },
  {
    title: "Abdichtung",
    options: ["Flüssigabdichtung"],
    imageUrl: "/images/Flussigkunstoff.jpg",
    description: "Schützt Dachflächen vor Dämmung, kann auch Dämmschutz sein.",
    optionDetails: {
      Flüssigabdichtung: {
        description: `
          <h3 class="text-xl font-bold mb-2">Abdichtung – Flüssigabdichtung</h3>
          <p>Flüssigabdichtung ist eine Lösung, die auf Flüssigkeiten basiert. Sie bietet eine hohe Flexibilität und eine hohe Wärmedämmung.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile:</h4>
          <ul class="list-disc pl-5">
            <li>Hohe Diffusionsdichte und Wärmedämmung.</li>
            <li>Schutz gegen Schimmelbildung und Feuchtigkeit.</li>
            <li>Verwendung auf verschiedenen Unterlagen ermöglicht.</li>
          </ul>
        `,
        images: ["/images/Flussigkunstoff.jpg"],
      },
    },
  },
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
  

  const handleOptionClick = (service, option) => {
    console.log(`Нажата опция: ${option} для сервиса:`, service);
    const selectedDetails = service.optionDetails[option];
    if (selectedDetails) {
      setSelectedOption({
        title: option,
        description: selectedDetails.description,
        images: selectedDetails.images,
      });
    } else {
      console.error(`Details für ${option} wurden nicht gefunden!`);
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
        threshold: 0.2,
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
        </div>
        <div className="space-y-12 mt-4">
          {services.map((service, index) => (
            <div
              key={service.title}
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
                  {service.options.map((option, idx) => (
                    <li key={idx} className="text-lg">
                      <button
                        onClick={() => handleOptionClick(service, option)}
                        className="text-teal-900 underline hover:text-teal-700 transition-colors duration-300"
                      >
                        {option}
                      </button>
                    </li>
                  ))}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg max-w-6xl relative ">
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-16 h-16 relative"
              />
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedOption.title}</h3>
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
