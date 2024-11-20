import { useState } from "react";
import { FaClock } from "react-icons/fa";
import ContactFormModal from "./ContactFormModal";

const CostCalculator = () => {
  const [step, setStep] = useState(0);
  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState(null); // Для типа работы
  const [selectedSubstructure, setSelectedSubstructure] = useState(null);
  const [selectedInsulation, setSelectedInsulation] = useState(null);
  const [selectedSealant, setSelectedSealant] = useState(null);
  const [size, setSize] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Опции для Neubau
  const substructureOptionsNeubau = [
    { name: "Beton", pricePerM2: 20 },
    { name: "Trapezblech", pricePerM2: 15 },
  ];

  const insulationOptionsNeubau = [
    { name: "EPS", pricePerM2: 10 },
    { name: "PIR", pricePerM2: 15 },
    { name: "A1", pricePerM2: 12 },
  ];

  const sealantOptionsNeubau = [
    { name: "PVC", pricePerM2: 8 },
    { name: "FPO", pricePerM2: 10 },
    { name: "Bitumenbahn", pricePerM2: 12 },
  ];

  // Опции для Sanierung
  const substructureOptionsSanierung = [
    { name: "Sanierung Beton", pricePerM2: 25 },
    { name: "Sanierung Trapezblech", pricePerM2: 20 },
  ];

  const insulationOptionsSanierung = [
    { name: "EPS", pricePerM2: 12 },
    { name: "PIR", pricePerM2: 18 },
    { name: "A1", pricePerM2: 14 },
  ];

  const sealantOptionsSanierung = [
    { name: "PVC", pricePerM2: 10 },
    { name: "FPO", pricePerM2: 12 },
    { name: "Bitumenbahn", pricePerM2: 15 },
  ];

  const handleStart = () => setStep(1);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleContactModalToggle = () =>
    setIsContactModalOpen(!isContactModalOpen);

  const calculatePrice = () => {
    if (!selectedSubstructure || !selectedInsulation || !selectedSealant) return;
    const substructurePrice = selectedSubstructure.pricePerM2;
    const insulationPrice = selectedInsulation.pricePerM2;
    const sealantPrice = selectedSealant.pricePerM2;
    const totalPrice = (substructurePrice + insulationPrice + sealantPrice) * size;
    setCalculatedPrice(totalPrice);
    setStep(8);
  };

  return (
    <div
      id="cost-calculator"
      className="mx-auto p-6 rounded-md shadow-lg bg-teal-900 flex flex-col h-full justify-between lg:flex-row gap-8"
    >
      {/* Left Section */}
      <div className="flex-1 p-4 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4">
          Kostenberechnung für Dacharbeiten
        </h2>
        {step === 0 && (
          <button
            onClick={handleStart}
            className=" text-white py-2 px-4 mt-4 rounded-xl w-full text-lg shimmer-button"
          >
            Kostenberechnung starten
          </button>
        )}

        {step > 0 && (
          <>
            {step === 1 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Wählen Sie die Art der Arbeit:
                </h3>
                <button
                  onClick={() => {
                    setSelectedTypeOfWork("Neubau");
                    setStep(2);
                  }}
                  className="btn"
                >
                  Neubau
                </button>
                <button
                  onClick={() => {
                    setSelectedTypeOfWork("Sanierung");
                    setStep(2);
                  }}
                  className="btn"
                >
                  Sanierung
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedTypeOfWork === "Neubau"
                    ? "Wählen Sie die Art der Neubau-Unterkonstruktion:"
                    : "Wählen Sie die Art der Sanierungs-Unterkonstruktion:"}
                </h3>
                {(selectedTypeOfWork === "Neubau"
                  ? substructureOptionsNeubau
                  : substructureOptionsSanierung
                ).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSubstructure(option);
                      setStep(3);
                    }}
                    className="btn"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedTypeOfWork === "Neubau"
                    ? "Wählen Sie die Dämmung für Neubau:"
                    : "Wählen Sie die Dämmung für Sanierung:"}
                </h3>
                {(selectedTypeOfWork === "Neubau"
                  ? insulationOptionsNeubau
                  : insulationOptionsSanierung
                ).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedInsulation(option);
                      setStep(4);
                    }}
                    className="btn"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedTypeOfWork === "Neubau"
                    ? "Wählen Sie die Abdichtung für Neubau:"
                    : "Wählen Sie die Abdichtung für Sanierung:"}
                </h3>
                {(selectedTypeOfWork === "Neubau"
                  ? sealantOptionsNeubau
                  : sealantOptionsSanierung
                ).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSealant(option);
                      setStep(5);
                    }}
                    className="btn"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Größe in m²:</h3>
                <input
                  type="number"
                  min="1"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full mb-4 p-2 border rounded"
                />
                <button
                  onClick={calculatePrice}
                  className="bg-blue-600 text-white py-2 w-full px-4 rounded"
                >
                  Kosten berechnen
                </button>
              </div>
            )}

            {step === 8 && calculatedPrice !== null && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Geschätzte Kosten:
                </h3>
                <p className="text-center mb-4 font-bold text-2xl">
                  €{calculatedPrice.toFixed(2)}
                </p>
                <button
                  onClick={handleContactModalToggle}
                  className="bg-green-600 text-white py-2 w-full px-4 rounded"
                >
                  Kontaktieren Sie uns
                </button>
              </div>
            )}

            <button
              onClick={handleBack}
              className="bg-gray-400 text-white py-2 w-full px-4 rounded mt-4"
            >
              Zurück
            </button>
          </>
        )}
        <p className="flex justify-center items-center mt-8 text-xs text-gray-200">
          <FaClock className="mr-2" />
          Dauer: ca. 2 Minuten
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1  p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Informationen zu Ihrer Auswahl
        </h3>
        {selectedSubstructure && selectedInsulation && selectedSealant ? (
          <>
            <h4 className="text-md font-bold mb-2">Ausgewählte Materialien:</h4>
            <p><strong>Unterkonstruktion:</strong> {selectedSubstructure.name}</p>
            <p><strong>Dämmung:</strong> {selectedInsulation.name}</p>
            <p><strong>Abdichtung:</strong> {selectedSealant.name}</p>
            <p><strong>Größe:</strong> {size} m²</p>
          </>
        ) : (
          <p className="text-gray-600">
            Bitte wählen Sie eine Option auf der linken Seite, um mehr
            Informationen zu sehen.
          </p>
        )}
      </div>

      {/* Contact Form Modal */}
      {isContactModalOpen && (
        <ContactFormModal closeModal={handleContactModalToggle} />
      )}
    </div>
  );
};

export default CostCalculator;
