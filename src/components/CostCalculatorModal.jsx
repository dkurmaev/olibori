import { useState } from 'react';
import PropTypes from 'prop-types';
import ContactFormModal from './ContactFormModal';

const CostCalculatorModal = ({ closeModal }) => {
  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState(null);
  const [selectedUnterkonstruktion, setSelectedUnterkonstruktion] = useState(null);
  const [selectedDaemmung, setSelectedDaemmung] = useState(null);
  const [selectedAbdichtung, setSelectedAbdichtung] = useState(null);
  const [size, setSize] = useState(1);
  const [calculationMessage, setCalculationMessage] = useState("");
  const [showContactButton, setShowContactButton] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [calculationDetails, setCalculationDetails] = useState({});

  const mainCategory = {
    subCategories: [
      {
        name: "Unterkonstruktion",
        options: [
          { name: "Beton", price: 100 },
          { name: "Trapezblech", price: 120 },
        ],
      },
      {
        name: "Dämmung",
        options: [
          { name: "EPS", price: 50 },
          { name: "PIR", price: 70 },
          { name: "A1", price: 90 },
        ],
      },
      {
        name: "Abdichtung",
        options: [
          { name: "PVC", price: 80 },
          { name: "FPO", price: 100 },
          { name: "Bitumenbahn", price: 110 },
        ],
      },
    ],
  };

  const handleTypeOfWorkChange = (event) => {
    setSelectedTypeOfWork(event.target.value);
  };

  const handleUnterkonstruktionChange = (event) => {
    const selectedOption = mainCategory.subCategories[0].options.find(option => option.name === event.target.value);
    setSelectedUnterkonstruktion(selectedOption);
  };

  const handleDaemmungChange = (event) => {
    const selectedOption = mainCategory.subCategories[1].options.find(option => option.name === event.target.value);
    setSelectedDaemmung(selectedOption);
  };

  const handleAbdichtungChange = (event) => {
    const selectedOption = mainCategory.subCategories[2].options.find(option => option.name === event.target.value);
    setSelectedAbdichtung(selectedOption);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const calculatePrice = () => {
    const unterkonstruktionPrice = selectedUnterkonstruktion ? selectedUnterkonstruktion.price : 0;
    const daemmungPrice = selectedDaemmung ? selectedDaemmung.price : 0;
    const abdichtungPrice = selectedAbdichtung ? selectedAbdichtung.price : 0;

    const totalPrice = (unterkonstruktionPrice + daemmungPrice + abdichtungPrice) * size;
    return totalPrice;
  };

  const handleCalculation = () => {
    if (!selectedTypeOfWork || !selectedUnterkonstruktion || !selectedDaemmung || !selectedAbdichtung) {
      setCalculationMessage("Bitte wählen Sie alle Optionen aus.");
      setShowContactButton(false);
    } else {
      const price = calculatePrice();
      const details = {
        typeOfWork: selectedTypeOfWork,
        unterkonstruktion: selectedUnterkonstruktion.name,
        daemmung: selectedDaemmung.name,
        abdichtung: selectedAbdichtung.name,
        size,
        price
      };
      setCalculationDetails(details); // Сохраняем детали для передачи в контактную форму
      setCalculationMessage(
        <>
          <div className='mb-4'>
            Geschätzte Kosten: <span className="font-bold ">€{price}</span>
          </div>
          <div>
            Für eine genauere Berechnung werden wir uns mit Ihnen in Verbindung setzen.
          </div>
        </>
      );
      setShowContactButton(true);
    }
  };

  const handleContactModalToggle = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 px-4 py-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg mx-auto relative overflow-y-auto max-h-screen">
        <h3 className="text-xl font-semibold mb-6 text-center">Kalkulation</h3>

        {/* Выбор типа работы */}
        <label>Wählen Sie die Art der Arbeit:</label>
        <select onChange={handleTypeOfWorkChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Bitte auswählen</option>
          <option value="Neubau">Neubau</option>
          <option value="Reparatur">Reparatur</option>
          <option value="Wartung">Wartung</option>
          <option value="Sanierung">Sanierung</option>
        </select>

        {/* Выбор Unterkonstruktion */}
        <label>Wählen Sie Unterkonstruktion:</label>
        <select onChange={handleUnterkonstruktionChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Bitte auswählen</option>
          {mainCategory.subCategories[0].options.map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>

        {/* Выбор Dämmung */}
        <label>Wählen Sie Dämmung:</label>
        <select onChange={handleDaemmungChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Bitte auswählen</option>
          {mainCategory.subCategories[1].options.map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>

        {/* Выбор Abdichtung */}
        <label>Wählen Sie Abdichtung:</label>
        <select onChange={handleAbdichtungChange} className="w-full mb-4 p-2 border rounded">
          <option value="">Bitte auswählen</option>
          {mainCategory.subCategories[2].options.map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>

        {/* Ввод площади */}
        <label>Geben Sie Ihre Fläche in Quadratmetern (m²) an:</label>
        <input type="number" value={size} onChange={handleSizeChange} className="w-full mb-4 p-2 border rounded" />

        <button onClick={handleCalculation} className="bg-teal-900 text-white py-2 px-4 w-full hover:bg-teal-800 rounded-md">
          Berechnen
        </button>

        {/* Показать сообщение о расчете */}
        {calculationMessage && <div className="mt-4 text-lg">{calculationMessage}</div>}

        {/* Кнопка "Связаться с нами" */}
        {showContactButton && (
          <button
            onClick={handleContactModalToggle}
            className="bg-green-600 text-white py-2 w-full px-6 rounded-lg hover:bg-green-500 transition mt-4"
          >
            Kontaktieren Sie uns
          </button>
        )}

        {/* Кнопка закрытия модалки калькулятора */}
        <button
          className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
          onClick={closeModal}
        >
          <img
            src='/images/close-icon.gif'
            alt="close"
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* Модалка с контактной формой */}
      {isContactModalOpen && (
        <ContactFormModal
          closeModal={handleContactModalToggle}
          calculationDetails={calculationDetails}
        />
      )}
    </div>
  );
};

CostCalculatorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CostCalculatorModal;
