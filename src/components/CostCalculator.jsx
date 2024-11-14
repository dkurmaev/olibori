import { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import ContactFormModal from './ContactFormModal';

const CostCalculator = () => {
  const [step, setStep] = useState(0);
  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState(null);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [selectedRoofType, setSelectedRoofType] = useState(null);
  const [selectedUnterkonstruktion, setSelectedUnterkonstruktion] = useState(null);
  const [selectedDaemmung, setSelectedDaemmung] = useState(null);
  const [selectedAbdichtung, setSelectedAbdichtung] = useState(null);
  const [size, setSize] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const roofTypeCoefficient = { Flachdach: 1.1, Satteldach: 1.2, Walmdach: 1.3 };
  const projectTypeCoefficient = { Privat: 1.0, Gewerblich: 1.5 };

  const mainCategory = {
    subCategories: [
      { name: "Unterkonstruktion", options: [{ name: "Beton", price: 100 }, { name: "Trapezblech", price: 120 }] },
      { name: "Dämmung", options: [{ name: "EPS", price: 50 }, { name: "PIR", price: 70 }, { name: "A1", price: 90 }] },
      { name: "Abdichtung", options: [{ name: "PVC", price: 80 }, { name: "FPO", price: 100 }, { name: "Bitumenbahn", price: 110 }] },
    ],
  };

  const handleStart = () => setStep(1);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleContactModalToggle = () => setIsContactModalOpen(!isContactModalOpen);

  const calculatePrice = () => {
    const unterkonstruktionPrice = selectedUnterkonstruktion?.price || 0;
    const daemmungPrice = selectedDaemmung?.price || 0;
    const abdichtungPrice = selectedAbdichtung?.price || 0;
    const basePrice = (unterkonstruktionPrice + daemmungPrice + abdichtungPrice) * size;
    const roofCoefficient = roofTypeCoefficient[selectedRoofType] || 1;
    const projectCoefficient = projectTypeCoefficient[selectedProjectType] || 1;
    const totalPrice = basePrice * roofCoefficient * projectCoefficient;
    setCalculatedPrice(totalPrice);
    setStep(8);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-lg flex flex-col h-full justify-between lg:flex-row gap-8">
      {/* Левая секция — Калькулятор */}
      <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4">Kostenberechnung für Dacharbeiten</h2>

        {/* Картинка */}
        <div className="flex justify-center mt-10 mb-4 ">
          <img src="/images/roofing.jpeg" alt="Dacharbeiten" className="w-auto h-auto rounded shadow-teal-600" />
        </div>

        {step === 0 && (
          <button onClick={handleStart} className="bg-teal-600 text-white py-2 px-4 mt-10 rounded-xl w-full text-lg shimmer-button">Anfrage starten</button>
        )}

        {step > 0 && (
          <>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Wählen Sie die Art der Arbeit:</h3>
                <button onClick={() => { setSelectedTypeOfWork("Neubau"); setStep(2); }} className="btn">Neubau</button>
                <button onClick={() => { setSelectedTypeOfWork("Reparatur"); setStep(2); }} className="btn">Reparatur</button>
              </div>
            )}

            {step === 2 && selectedTypeOfWork === "Neubau" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Für welchen Zweck?</h3>
                <button onClick={() => { setSelectedProjectType("Privat"); setStep(3); }} className="btn">Privat</button>
                <button onClick={() => { setSelectedProjectType("Gewerblich"); setStep(3); }} className="btn">Gewerblich</button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Wählen Sie den Dachtyp:</h3>
                <select onChange={(e) => { setSelectedRoofType(e.target.value); setStep(4); }} className="w-full mb-4 p-2 border rounded">
                  <option value="">Bitte auswählen</option>
                  <option value="Flachdach">Flachdach</option>
                  <option value="Satteldach">Satteldach</option>
                  <option value="Walmdach">Walmdach</option>
                </select>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Wählen Sie Unterkonstruktion:</h3>
                {mainCategory.subCategories[0].options.map((option, index) => (
                  <button key={index} onClick={() => { setSelectedUnterkonstruktion(option); setStep(5); }} className="btn">{option.name}</button>
                ))}
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Wählen Sie Dämmung:</h3>
                {mainCategory.subCategories[1].options.map((option, index) => (
                  <button key={index} onClick={() => { setSelectedDaemmung(option); setStep(6); }} className="btn">{option.name}</button>
                ))}
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Wählen Sie Abdichtung:</h3>
                {mainCategory.subCategories[2].options.map((option, index) => (
                  <button key={index} onClick={() => { setSelectedAbdichtung(option); setStep(7); }} className="btn">{option.name}</button>
                ))}
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Geben Sie die Fläche in m² an:</h3>
                <input 
                  type="number" 
                  min="1" 
                  value={size} 
                  onChange={(e) => setSize(Number(e.target.value))} 
                  className="w-full mb-4 p-2 border rounded" 
                />
                <button onClick={calculatePrice} className="bg-blue-600 text-white py-2 w-full px-4 rounded">Kosten berechnen</button>
              </div>
            )}

            {step === 8 && calculatedPrice !== null && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Geschätzte Kosten:</h3>
                <p className="text-center mb-4 font-bold text-2xl">€{calculatedPrice.toFixed(2)}</p>
                <p className="text-center mb-4">Projektart: {selectedProjectType}</p>
                <p className="text-center mb-4">Dachtyp: {selectedRoofType}</p>
                <p className="text-center text-red-600 mb-4">Hinweis: Der Preis ist eine ungefähre Schätzung.</p>
                <button onClick={handleContactModalToggle} className="bg-green-600 text-white py-2 w-full px-4 rounded">Kontaktieren Sie uns</button>
              </div>
            )}

            {/* Кнопка "Zurück" */}
            <button onClick={handleBack} className="bg-gray-400 text-white py-2 w-full px-4 rounded mt-4">Zurück</button>
            
            {/* Кнопка "Brauchen Sie Rat?" */}
            <button onClick={handleContactModalToggle} className="bg-yellow-500 text-white py-2 w-full px-4 rounded mt-2">Brauchen Sie Rat?</button>
          </>
        )}

        <p className="flex justify-left items-center mt-auto text-center">
          <FaClock className="mr-2 text-gray-800 text-xs" /> Es dauert weniger als eine Minute.
        </p>
      </div>

      {/* Правая секция — Этапы производства */}
      <div className="flex-1 p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">Die Hauptphasen der Dacharbeiten:</h3>
        <ul className="space-y-4">
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">1. Vorbereitung der Basis:</h4>
            <p className="text-gray-600 mt-4 italic">Dazu gehört die Überprüfung des Zustands der Dachkonstruktion und der Unterkonstruktion. Falls erforderlich, werden beschädigte Elemente ersetzt oder die Struktur verstärkt.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">2. Verlegung der Abdichtung:</h4>
            <p className="text-gray-600 mt-4 italic">Eine Schicht, die das Dach vor Feuchtigkeit schützt. Abdichtungsmaterialien wie Membranen oder Folien werden unter dem Hauptdachmaterial angebracht.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">3. Installation der Dämmung: </h4>
            <p className="text-gray-600 mt-4 italic" >Hilft, den Wärmeverlust zu verringern, was besonders für Wohnräume wichtig ist. Materialien wie Mineralwolle oder Polystyrol werden zwischen den Dachsparren oder über der Unterkonstruktion installiert.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">4. Verlegung der Dachdeckung: </h4>
            <p className="text-gray-600 mt-4 italic">Dieser Schritt hängt vom gewählten Material ab. Metallziegel, Profilbleche, Schiefer oder Ziegel werden unterschiedlich verlegt und erfordern entsprechende Werkzeuge und Fachkenntnisse.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">5. Installation des Entwässerungssystems: </h4>
            <p className="text-gray-600 mt-4 italic">Zur Ableitung des Wassers vom Dach werden Rinnen, Rohre und Trichter installiert, um die Ansammlung von Feuchtigkeit und die Beschädigung der Fassade zu verhindern.</p>
          </li>
          <li className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">6. Abschließende Verkleidung: </h4>
            <p className="text-gray-600 mt-4 italic">Dazu gehört die Installation von Firstziegeln, Kehlen, Traufblechen und anderen Elementen, die dem Dach ein fertiges Aussehen verleihen und es vor Witterungseinflüssen schützen.</p>
          </li>
        </ul>
      </div>

      {/* Contact Form Modal */}
      {isContactModalOpen && <ContactFormModal closeModal={handleContactModalToggle} />}
    </div>
  );
};

export default CostCalculator;
