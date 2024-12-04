import { useState } from "react";
import ContactFormModal from "./ContactFormModal";
import { neubauOptions, sanierungOptions } from "../service/optionsData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (selectedType === "") {
      toast.error("Bitte wählen Sie Neubau oder Sanierung.", {
        position: "top-center",
        className: "bg-red-600 text-white",
      });
      return;
    }

    let selectedOptions = selectedType === "neubau" ? neubauSelections : sanierungSelections;
    const selectedCategories = Object.keys(selectedOptions);

    if (selectedCategories.length === 0) {
      toast.error("Bitte wählen Sie mindestens eine Option aus.", {
        position: "top-center",
        className: "bg-red-600 text-white",
      });
      return;
    }

    let missingOptions = [];
    const categories = selectedType === "neubau" ? neubauOptions : sanierungOptions;

    categories.forEach((category) => {
      if (!selectedOptions[category.name]) {
        missingOptions.push(category.name);
      }
    });

    if (missingOptions.length > 0) {
      toast.error(`Bitte wählen Sie eine Option für die folgenden Kategorien aus: ${missingOptions.join(", ")}`, {
        position: "top-center",
        className: "bg-red-600 text-white",
      });
      return;
    }

    let cost = 0;
    Object.values(selectedOptions).forEach((option) => (cost += option.cost));

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

  // Default information based on the selected type
  const getDefaultInfo = () => {
    if (selectedType === "neubau") {
      return "Für Neubau empfehlen wir, die Energieeffizienz und Langlebigkeit der Materialien zu berücksichtigen. Eine gute Planung kann Ihnen langfristig Kosten sparen.";
    } else if (selectedType === "sanierung") {
      return "Bei der Sanierung ist es wichtig, den Zustand des Daches zu überprüfen und mögliche Schäden vor der Auswahl der Optionen zu bewerten.";
    }
    return "Bitte wählen Sie Neubau oder Sanierung, um Informationen zu erhalten.";
  };

  return (
    <div id="cost-calculator" className="relative z-10 text-center text-white mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-gray-500 uppercase text-center">
        Kostenberechnung für Dacharbeiten
      </h1>
      <div className="container mx-auto mb-8 py-16 rounded-xl bg-gray-200 shadow-xl">
        <div className="flex justify-center gap-12 mb-6">
          <button
            onClick={() => {
              setSelectedType("neubau");
              setSanierungSelections({}); // Clear sanierung selections when switching
              setSelectedOptionsList([]); // Clear selected options
            }}
            className={`px-6 py-2 rounded-lg text-lg text-teal-800 font-semibold hover:bg-teal-800 hover:text-white ${
              selectedType === "neubau" ? "bg-gray-400 text-white" : "bg-white text-teal-800 border border-teal-800"
            }`}
          >
            Neubau
          </button>
          <button
            onClick={() => {
              setSelectedType("sanierung");
              setNeubauSelections({}); // Clear neubau selections when switching
              setSelectedOptionsList([]); // Clear selected options
            }}
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
            <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">Information:</h2>
            <p className="text-teal-900 text-lg text-bold mx-auto my-auto text-center shimmer-button">
              {getDefaultInfo()}
            </p>
            {selectedOptionsList.length > 0 && (
              <ul className="list-disc list-inside text-teal-700 text-left mx-5 my-5 px-5 py-5">
                {selectedOptionsList.map((item, index) => (
                  <li key={index}>
                    {item.category}: {item.option} - {item.description}
                  </li>
                ))}
              </ul>
            )}
            {totalCost > 0 && (
              <div className="mt-4">
                <p className="text-2xl text-teal-700 text-left italic mx-5 my-5 px-5 py-5">
                  Ihre geschätzten Kosten für die ausgewählten Optionen betragen: <span className="text-yellow-600">{totalCost.toFixed(2)} €</span>
                </p>
                <p className="text-teal-600 mx-5 my-5 px-5 text-left">Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten!</p>
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
                  <label className="block text-teal-700 mb-2 font-medium text-left">{category.name}</label>
                  <select
                    onChange={(e) =>
                      handleOptionSelect(
                        category.name,
                        category.options.find((opt) => opt.name === e.target.value)
                      )
                    }
                    className="w-full border border-teal-400 rounded-lg p-2 text-gray-400 focus:outline-none"
                    disabled={selectedType === (selectedType === "neubau" ? "sanierung" : "neubau")} // Disable dropdown for the other category
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
            <div className="flex justify-between mt-4">
              <button
                onClick={handleBackClick}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                Zurück
              </button>
              <button onClick={calculateCost} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
                Berechnen
              </button>
            </div>
          </div>
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

      {/* Toast messages container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container z-50"
      />
    </div>
  );
};

export default CostCalculator;
