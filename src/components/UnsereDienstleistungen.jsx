import { useState, useEffect, useRef } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import CostCalculatorModal from './CostCalculatorModal';

const services = [
  {
    title: 'Flachdachabdichtung',
    options: ['Neubau', 'Sanierung', 'Wartung', 'Reparatur'],
    imageUrl: '/images/Sanierung.JPG',
    description: 'Die Flachdachabdichtung bietet eine robuste Lösung zur Abdichtung Ihres Flachdachs und schützt es vor Umwelteinflüssen.',
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
        images: ['/images/example_neubau1.jpg', '/images/Neubau.jpg'],
      },
      // Добавьте остальные детали для опций, как было сделано для Neubau
    },
  },
  // Добавьте аналогично остальные услуги
];

const Services = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Для отслеживания выбранной опции
  const sectionRef = useRef(null);

  const openCalculator = () => {
    setModalOpen(true);
  };

  const closeCalculator = () => {
    setModalOpen(false);
  };

  const handleOptionClick = (service, option) => {
    const selectedDetails = service.optionDetails[option];
    if (selectedDetails) {
      setSelectedOption({
        title: option,
        description: selectedDetails.description,
        images: selectedDetails.images,
      });
    } else {
      console.error(`Детали для ${option} не найдены!`);
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
    <section ref={sectionRef} id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Unsere Dienstleistungen</h2>
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center transition-all duration-1000 ${isVisible ? (index % 2 === 0 ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100') : (index % 2 === 0 ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0')
                }`}
            >
              <div className="md:w-1/2">
                <img src={service.imageUrl} alt={service.title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
              </div>

              <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  {service.title}

                  <div
                    className="ml-2 text-teal-800 cursor-pointer relative"
                    onMouseEnter={() => setTooltip(service.title)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <FaInfoCircle />
                    {tooltip === service.title && (
                      <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded p-2 shadow-lg text-sm w-72 z-10">
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
                  className="bg-teal-900 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-all"
                  onClick={openCalculator}
                >
                  Kosten berechnen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для опций */}
      {selectedOption && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            {/* Крестик для закрытия */}
            <button
              onClick={() => setSelectedOption(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedOption.title}</h3>
            <div
              className="mb-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: selectedOption.description }} // Рендерим HTML
            />
            <div className="grid grid-cols-1 gap-4">
              {selectedOption.images.map((image, index) => (
                <img key={index} src={image} alt={selectedOption.title} className="w-full h-48 object-cover rounded-lg" />
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

      {/* Вызов модального окна для калькулятора */}
      <CostCalculatorModal isOpen={isModalOpen} onClose={closeCalculator} />
    </section>
  );
};

export default Services;
