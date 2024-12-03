import { useState } from "react";
import ContactFormModal from "./ContactFormModal";
import { neubauOptions, sanierungOptions } from "../service/optionsData";

const CostCalculator = () => {
  const [selectedType, setSelectedType] = useState("");
  const [neubauSelections, setNeubauSelections] = useState({});
  const [sanierungSelections, setSanierungSelections] = useState({});
  const [area, setArea] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);

  const handleContactModalToggle = () => setIsContactModalOpen(!isContactModalOpen);

  const handleOptionSelect = (category, option) => {
    if (selectedType === "neubau") {
      setNeubauSelections((prev) => ({ ...prev, [category]: option }));
      setSelectedOptionsList((prev) => {
        const newSelections = prev.filter((item) => item.category !== category);
        return [...newSelections, { category, option: option.name, description: option.description }];
      });
    } else if (selectedType === "sanierung") {
      setSanierungSelections((prev) => ({ ...prev, [category]: option }));
      setSelectedOptionsList((prev) => {
        const newSelections = prev.filter((item) => item.category !== category);
        return [...newSelections, { category, option: option.name, description: option.description }];
      });
    }
  };

  const calculateCost = () => {
    let cost = 0;
    if (selectedType === "neubau") {
      Object.values(neubauSelections).forEach((option) => (cost += option.cost));
    } else if (selectedType === "sanierung") {
      Object.values(sanierungSelections).forEach((option) => (cost += option.cost));
    }
    setTotalCost(cost * area);
  };

  const handleBackClick = () => {
    setSelectedType("");
    setNeubauSelections({});
    setSanierungSelections({});
    setSelectedOptionsList([]);
    setTotalCost(0);
    setArea(1);
  };
 

  return (
    <div id="cost-calculator" 
    className="relative z-10 text-center text-white mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-gray-500 uppercase text-center">
        Kostenberechnung für Dacharbeiten
      </h1>
      <div className="container mx-auto mb-8 py-16 rounded-xl bg-gray-200 shadow-xl">
        <div className="flex justify-center gap-12 mb-6">
          <button
            onClick={() => setSelectedType("neubau")}
            className={`px-6 py-2 rounded-lg text-lg text-teal-800 font-semibold hover:bg-teal-800 hover:text-white ${
              selectedType === "neubau" ? "bg-gray-400 text-white" : "bg-white text-teal-800 border border-teal-800"
            }`}
          >
            Neubau
          </button>
          <button
            onClick={() => setSelectedType("sanierung")}
            className={`px-6 py-2 rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white ${
              selectedType === "sanierung" ? "bg-teal-600 text-white" : "bg-white text-teal-800 border border-teal-800"
            }`}
          >
            Sanierung
          </button>
          <button
            onClick={handleContactModalToggle}
            className="px-6 py-2 rounded-lg text-lg font-semibold bg-white text-teal-800 border border-teal-800 hover:bg-teal-800 hover:text-white"
          >
            Frage stellen
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">
              Information:
            </h2>
            <p className="text-teal-600 text-base mb-4 text-left">
              {selectedType === "neubau" ? "Wählen Sie die Optionen für den Neubau:" : "Wählen Sie die Optionen für die Sanierung:"}
            </p>
            {/* Display the selected options list with descriptions */}
            {selectedOptionsList.length > 0 && (
              <ul className="list-disc list-inside text-teal-700 text-left mx-5 my-5 px-5 py-5">
                {selectedOptionsList.map((item, index) => (
                  <li key={index}>
                    {item.category}: {item.option} - {item.description}
                  </li>
                ))}
              </ul>
            )}

            {/* Display estimated cost directly below information */}
            {totalCost > 0 && (
              <div className="mt-4">
                <p className="text-2xl  text-teal-700 text-left italic mx-5 my-5 px-5 py-5">
                  Ihre geschätzten Kosten für die ausgewählten Optionen betragen: <span className="text-yellow-600 ">{totalCost.toFixed(2)} €</span>
                </p>
                <p className="text-teal-600 mx-5 my-5 px-5  text-left">Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten!</p>
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">
              {selectedType === "neubau" ? "Wählen Sie die Optionen für den Neubau:" : "Wählen Sie die Optionen für die Sanierung:"}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {(selectedType === "neubau" ? neubauOptions : sanierungOptions).map((category) => (
                <div key={category.name}>
                  <label className="block text-teal-700 mb-2 font-medium text-left">
                    {category.name}
                  </label>
                  <select
                    onChange={(e) =>
                      handleOptionSelect(
                        category.name,
                        category.options.find((opt) => opt.name === e.target.value)
                      )
                    }
                    className="w-full border border-teal-400 rounded-lg p-2 text-gray-400 focus:outline-none"
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
            <div>
              <label className="block text-teal-700 mb-2 font-medium">Größe in m²:</label>
              <input
                type="number"
                min="1"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full border border-teal-400 rounded-lg p-2 text-teal-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-evenly gap-48 mt-6 mx-6">
          <button
            onClick={handleBackClick}
            className="bg-gray-400 text-white px-10 py-2 rounded-lg hover:bg-gray-500"
          >
            Zurück
          </button>

          <button onClick={calculateCost} className="bg-teal-600 text-white px-10 py-2 ml-48 rounded-lg hover:bg-teal-700">
            Berechnen
          </button>
        </div>

        {/* Conditionally render contact button */}
        {totalCost > 0 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleContactModalToggle}
              className="bg-teal-600 text-white px-10 py-2 rounded-lg hover:bg-teal-700 shimmer-button"
            >
              Kontakt aufnehmen
            </button>
          </div>
        )}

        {isContactModalOpen && <ContactFormModal closeModal={handleContactModalToggle} />}
      </div>
    </div>
  );
};

export default CostCalculator;
