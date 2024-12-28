

const steps = [
  { number: "01", title: "Vorbereitung der Basis", description: "Dazu gehört die Überprüfung des Zustands der Dachkonstruktion und der Unterkonstruktion. Falls erforderlich, werden beschädigte Elemente ersetzt oder die Struktur verstärkt." },
  { number: "02", title: "Dampfsperre", description: "Eine Dampfsperre wird installiert, um das Eindringen von Feuchtigkeit und Wasserdampf aus dem Inneren des Gebäudes in die Dachkonstruktion zu verhindern. " },
  { number: "03", title: "Wärmedämmung", description: "In diesem Schritt wird die Wärmedämmung eingebracht, um den Energieverlust des Gebäudes zu minimieren. " },
  { number: "04", title: "Dachabdichtung", description: "Die Dachabdichtung sorgt dafür, dass das Dach wasserdicht ist und vor Regen, Schnee und anderen Umwelteinflüssen geschützt wird." },
  { number: "05", title: "Installation des Entwässerungssystems", description: "Zur Ableitung des Wassers vom Dach werden Rinnen, Rohre und Trichter installiert, um die Ansammlung von Feuchtigkeit und die Beschädigung der Fassade zu verhindern." },
  { number: "06", title: "Abschließende Mauerabdeckung", description: "Hier werden die abschließenden Arbeiten an den Mauerabdeckungen durchgeführt. Diese schützen die Dachkanten und Mauern vor Feuchtigkeit und Witterungseinflüssen. " },
  { number: "07", title: "Abnahme und Abschluss", description: "Im letzten Schritt erfolgt die Endkontrolle der gesamten Dacharbeiten. Alle ausgeführten Arbeiten werden auf Qualität, Funktionalität und Vollständigkeit geprüft. Mängel werden behoben, falls vorhanden." },
];

const UnsereEtappen = () => {
  return (
    <div className="bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-bold uppercase text-gray-800 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
          Die Hauptphasen der Dacharbeiten:
        </h2>
        <p className="text-lg font-sans text-gray-600">
          Der Prozess in 7 Schritten zu Ihrem perfekten Dach.
        </p>
      </div>

      {/* Список этапов */}
      <div className="grid gap-16">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:justify-start" : "md:justify-end"
            } md:items-start gap-6 text-center md:text-left`}
          >
            {/* Большое число */}
            <div
              className={`text-9xl font-extrabold text-teal-700 border-b-2 border-yellow-300 hover:text-yellow-500 border- pb-4 opacity-40  ${
                index % 2 === 0 ? "md:order-1" : "md:order-2" 
              }`}
            >
              {step.number}
            </div>

            {/* Описание этапа */}
            <div
              className={`md:w-1/2 ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 italic sm:text-m">{step.description}</p>
            </div>
          </div>
        ))}
      </div> 
    </div>
    </div>  
  );
};


export default UnsereEtappen;
