import { useState } from "react";
import { FaClock } from "react-icons/fa";
import ContactFormModal from "./ContactFormModal";
import { neubauOptions, sanierungOptions } from '../service/optionsData';

const CostCalculator = () => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [neubauSelections, setNeubauSelections] = useState({});
  const [sanierungSelections, setSanierungSelections] = useState({});
  const [area, setArea] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const handleContactModalToggle = () => setIsContactModalOpen(!isContactModalOpen);
  const handleStart = () => setStep(1);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleOptionSelect = (category, option) => {
    if (selectedType === "neubau") {
      setNeubauSelections((prev) => ({ ...prev, [category]: option }));
    } else if (selectedType === "sanierung") {
      setSanierungSelections((prev) => ({ ...prev, [category]: option }));
    }
    setCurrentDescription(option.description);
  };

  const calculateCost = () => {
    let cost = 0;
    if (selectedType === "neubau") {
      Object.values(neubauSelections).forEach((option) => (cost += option.cost));
      cost *= area;
    } else if (selectedType === "sanierung") {
      Object.values(sanierungSelections).forEach((option) => (cost += option.cost));
      cost *= area;
    }
    setTotalCost(cost);
    setStep(4);
  };

  const isAllOptionsSelected = () => {
    if (selectedType === "neubau") {
      return neubauOptions.every(
        (category) => category.options?.length > 0 && neubauSelections[category.name]
      );
    } else if (selectedType === "sanierung") {
      return sanierungOptions.every(
        (category) => category.options?.length > 0 && sanierungSelections[category.name]
      );
    }
    return false;
  };

  return (
    <div 
    id="cost-calculator"
    className="container mx-auto p-8 rounded-xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side */}
      <div className="bg-gradient-to-tl from-teal-200 to-teal-300 p-8 rounded-xl shadow-xl flex flex-col">
        <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">
          {step === 0
            ? "Kostenberechnung für Dacharbeiten"
            : selectedType === "neubau"
            ? "Kostenberechnung für Neubau"
            : selectedType === "sanierung"
            ? "Kostenberechnung für Sanierung"
            : "Kostenberechnung"}
        </h2>

        {step === 0 && (
          <button
            onClick={handleStart}
            className="bg-teal-600 text-white py-3 px-6 rounded-full hover:bg-teal-700 transition-colors w-full text-lg"
          >
            Kostenberechnung starten
          </button>
        )}

        {step === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-6 text-teal-700">
              Wählen Sie die Art der Arbeit:
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSelectedType("neubau");
                  setStep(2);
                }}
                className="bg-teal-500 text-white px-6 py-3 w-full rounded-lg hover:bg-teal-600 transition-colors"
              >
                Neubau
              </button>
              <button
                onClick={() => {
                  setSelectedType("sanierung");
                  setStep(2);
                }}
                className="bg-teal-500 text-white px-6 py-3 w-full rounded-lg hover:bg-teal-600 transition-colors"
              >
                Sanierung
              </button>
            </div>
          </>
        )}

        {selectedType && step === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-6 text-teal-700">
              Wählen Sie die Optionen
            </h3>
            <div className="space-y-4">
              {(selectedType === "neubau"
                ? neubauOptions
                : sanierungOptions
              ).map((category) => (
                <div key={category.name}>
                  <h4 className="font-medium text-lg mb-2">{category.name}</h4>
                  <select
                    onChange={(e) =>
                      handleOptionSelect(
                        category.name,
                        category.options.find(
                          (opt) => opt.name === e.target.value
                        )
                      )
                    }
                    className="w-full border-teal-500 border-2 rounded-lg p-3 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Bitte wählen</option>
                    {category.options?.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {isAllOptionsSelected() && (
              <button
                onClick={() => setStep(3)}
                className="bg-teal-600 text-white py-3 px-6 mt-6 rounded-full hover:bg-teal-700 transition-colors w-full"
              >
                Weiter
              </button>
            )}
          </>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Größe in m²:</h3>
            <input
              type="number"
              min="1"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full mb-6 border-2 rounded-lg p-3 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={calculateCost}
              className="bg-teal-600 text-white py-3 px-6 w-full rounded-full hover:bg-teal-700 transition-colors"
            >
              Berechnen
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-teal-700 mb-4">
              Geschätzte Kosten:
            </h3>
            <p className="text-3xl font-extrabold text-teal-700">
              {totalCost.toFixed(2)} €
            </p>
            <button
              onClick={handleContactModalToggle}
              className="bg-green-600 text-white py-3 px-6 w-full mt-6 rounded-full hover:bg-green-700 transition-colors"
            >
              Kontaktieren Sie uns
            </button>
          </div>
        )}

        {step > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-400 text-white py-3 px-6 w-full mt-4 rounded-full hover:bg-gray-500 transition-colors"
          >
            Zurück
          </button>
        )}
        <p className="text-xs text-gray-600 flex justify-center items-center mt-8">
          <FaClock className="mr-2" />
          Dauer: ca. 2 Minuten
        </p>
      </div>

      {/* Right Side */}
      <div className="bg-teal-50 p-8 rounded-xl shadow-xl flex flex-col">
        <h3 className="text-2xl font-semibold text-teal-700 mb-6 text-center">
          Information
        </h3>
        <div className="text-teal-600 text-center mb-6">
          {step === 0 && (
            <p className="text-lg">
              Willkommen bei unserem Kostenkalkulator! Beginnen Sie, indem Sie
              den Typ der Arbeit auswählen.
            </p>
          )}
          {step === 1 && (
            <p className="text-lg">
              Bitte wählen Sie die Art der Dacharbeiten: Neubau oder Sanierung.
            </p>
          )}
          {step === 2 && (
            <p className="text-lg">
              {currentDescription ||
                "Wählen Sie aus den verfügbaren Optionen aus, um mehr zu erfahren."}
            </p>
          )}
          {step === 3 && (
            <p className="text-lg">
              Geben Sie die Fläche in Quadratmetern ein, um die Gesamtkosten zu
              berechnen.
            </p>
          )}
          {step === 4 && (
            <div>
              <p className="text-lg">
                Auf Grundlage Ihrer Auswahl und Eingaben schätzen wir die
                Gesamtkosten wie folgt:
              </p>
              <p className="text-3xl font-bold text-teal-700">
                {totalCost.toFixed(2)} €
              </p>
            </div>
          )}
        </div>
        {isContactModalOpen && (
          <ContactFormModal closeModal={handleContactModalToggle} />
        )}
      </div>
    </div>
  );
};

export default CostCalculator;
