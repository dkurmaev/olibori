import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import CostCalculatorModal from './CostCalculatorModal';

const services = [
  {
    title: 'Flachdachabdichtung',
    options: [
      {
        name: 'Neubau',
        price: 30,
        description: `
          <h3 class="text-xl font-bold mb-2">Der Flachdach Neubau</h3>
          <p>Der Flachdach Neubau bietet eine moderne und funktionale Bauweise, die sich ideal für zeitgemäße Architektur eignet.</p>
          <h4 class="text-lg font-semibold mt-4 mb-2">Vorteile eines Flachdachs:</h4>
          <ul class="list-disc pl-5">
            <li><strong>Minimalistische Ästhetik:</strong> Klare Linien und eine schlichte Formgebung.</li>
            <li><strong>Optimale Raumnutzung:</strong> Ermöglicht die Nutzung des Dachs als Terrasse oder Garten.</li>
            <li><strong>Umweltfreundlich:</strong> Ideal für Dachbegrünungen, die zur Artenvielfalt und zum Umweltschutz beitragen.</li>
          </ul>
          <h4 class="text-lg font-semibold mt-4 mb-2">Materialien und Konstruktion:</h4>
          <p><em>Flachdächer werden in der Regel mit Bitumenbahnen oder EPDM-Folie abgedichtet, um eine lange Haltbarkeit zu gewährleisten.</em></p>
        `,
        imageUrl: '/images/Neubau.jpg',
      },
      { name: 'Sanierung', price: 50, description: 'Beschreibung Sanierung', imageUrl: '/images/Sanierung.jpg' },
      { name: 'Wartung', price: 20, description: 'Beschreibung Wartung', imageUrl: '/images/wartung.jpg' },
      { name: 'Reparatur', price: 40, description: 'Beschreibung Reparatur', imageUrl: '/images/Reparatur.jpg' },
    ],
    imageUrl: '/images/Slide13.jpg',
    description: 'Die Flachdachabdichtung bietet eine robuste Lösung zur Abdichtung Ihres Flachdachs und schützt es vor Umwelteinflüssen.',
  },
  {
    title: 'Unterkonstruktion',
    options: [
      { name: 'Beton', price: 30, description: 'Beschreibung Beton', imageUrl: '/images/Beton.jpg' },
      { name: 'Trapezblech', price: 50, description: 'Beschreibung Trapezblech', imageUrl: '/images/Trapezblech.jpg' },
    ],
    imageUrl: '/images/Trapezblech.jpg',
    description: 'Die Unterkonstruktion bildet die tragende Basis des Daches und sorgt für Stabilität.',
  },
  //TODO Добавьте другие услуги с подуслугами...
];

const Services = () => {
  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const openCalculator = (service) => {
    setSelectedService(service);
    setCalculatorOpen(true);
};

  const closeCalculator = () => {
    setCalculatorOpen(false);
    setSelectedService(null);
  };

  const openDescriptionModal = (option) => {
    setSelectedOption(option);
    setDescriptionModalOpen(true);
  };

  const closeDescriptionModal = () => {
    setDescriptionModalOpen(false);
    setSelectedOption(null);
  };

  return (
    <section
    id="services"
    className="py-8 bg-gray-100">
      <div className="container mx-auto space-y-12">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
          >
            <div className="md:w-1/2">
              <img src={service.imageUrl} alt={service.title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                {service.title}
                <FaInfoCircle className="ml-2 text-teal-800 cursor-pointer" title={service.description} />
              </h3>
              <ul className="mt-4 space-y-2">
                {service.options.map((option, idx) => (
                  <li key={idx}>
                    <button
                      className="text-teal-900 underline"
                      onClick={() => openDescriptionModal(option)}
                    >
                      {option.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-teal-900 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-all"
                onClick={() => openCalculator(service, service.options[0])}
              >
                Kosten berechnen
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно для описания опции */}
      {isDescriptionModalOpen && selectedOption && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full relative">
            <button
              onClick={closeDescriptionModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-8 h-8"
              />
            </button>
            <img src={selectedOption.imageUrl} alt={selectedOption.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">{selectedOption.name}</h3>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: selectedOption.description }}
            />
            <p className="text-lg font-semibold mb-4">Preis: €{selectedOption.price}</p>
            <button
              onClick={() => {
                closeDescriptionModal();
                openCalculator(selectedOption);
              }}
              className="w-full bg-teal-900 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Berechnung starten
            </button>
          </div>
        </div>
      )}

      {/* Модальное окно калькулятора */}
      {isCalculatorOpen && (
    <CostCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={closeCalculator}
        selectedService={selectedService}
    />
)}
    </section>
  );
};

export default Services;
