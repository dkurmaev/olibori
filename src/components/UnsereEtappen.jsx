

const steps = [
  { number: "01", title: "Vorbereitung der Basis", description: "Dazu gehört die Überprüfung des Zustands der Dachkonstruktion und der Unterkonstruktion. Falls erforderlich, werden beschädigte Elemente ersetzt oder die Struktur verstärkt." },
  { number: "02", title: "Verlegung der Abdichtung", description: "Eine Schicht, die das Dach vor Feuchtigkeit schützt. Abdichtungsmaterialien wie Membranen oder Folien werden unter dem Hauptdachmaterial angebracht." },
  { number: "03", title: "Installation der Dämmung", description: "Hilft, den Wärmeverlust zu verringern, was besonders für Wohnräume wichtig ist. Materialien wie Mineralwolle oder Polystyrol werden zwischen den Dachsparren oder über der Unterkonstruktion installiert." },
  { number: "04", title: "Verlegung der Dachdeckung", description: "Dieser Schritt hängt vom gewählten Material ab. Metallziegel, Profilbleche, Schiefer oder Ziegel werden unterschiedlich verlegt und erfordern entsprechende Werkzeuge und Fachkenntnisse." },
  { number: "05", title: "Installation des Entwässerungssystems", description: "Zur Ableitung des Wassers vom Dach werden Rinnen, Rohre und Trichter installiert, um die Ansammlung von Feuchtigkeit und die Beschädigung der Fassade zu verhindern." },
  { number: "06", title: "Abschließende Verkleidung", description: "Dazu gehört die Installation von Firstziegeln, Kehlen, Traufblechen und anderen Elementen, die dem Dach ein fertiges Aussehen verleihen und es vor Witterungseinflüssen schützen." },
  { number: "07", title: "Abnahme und Abschluss", description: "Nach Abschluss überprüfen wir gemeinsam das Ergebnis." },
];

const UnsereEtappen = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-teal-400 inline-block text-center pb-1">
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
  );
};


export default UnsereEtappen;
