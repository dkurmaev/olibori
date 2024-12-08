import { useState, useRef } from "react";
import ContactFormModal from "./ContactFormModal";
import { neubauOptions, sanierungOptions } from "../service/optionsData";
import { FaInfoCircle } from "react-icons/fa";

const CostCalculator = () => {
  const [selectedType, setSelectedType] = useState("neubau");
  const [neubauSelections, setNeubauSelections] = useState({});
  const [sanierungSelections, setSanierungSelections] = useState({});
  const [area, setArea] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // For inline error message

  const toggleContactModal = () => {
    setContactModalOpen(!isContactModalOpen);
  };

  const optionsSectionRef = useRef(null); // Реф для прокрутки

  const scrollToOptions = () => {
    if (optionsSectionRef.current) {
      const offset = 400; // Смещение в пикселях
      const elementPosition =
        optionsSectionRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setSanierungSelections({});
    setNeubauSelections({});
    setSelectedOptionsList([]);
    setArea(1); // Сброс площади
    scrollToOptions(); // Прокрутка к секции
  };

  const handleOptionSelect = (category, option) => {
    if (selectedType === "neubau") {
      setNeubauSelections((prev) => ({ ...prev, [category]: option }));
      setSelectedOptionsList((prev) => {
        const newSelections = prev.filter((item) => item.category !== category);
        return [
          ...newSelections,
          { category, option: option.name, description: option.description },
        ];
      });
    } else if (selectedType === "sanierung") {
      setSanierungSelections((prev) => ({ ...prev, [category]: option }));
      setSelectedOptionsList((prev) => {
        const newSelections = prev.filter((item) => item.category !== category);
        return [
          ...newSelections,
          { category, option: option.name, description: option.description },
        ];
      });
    }
    setErrorMessage(""); // Clear error when a valid selection is made
  };

  const calculateCost = () => {
    if (selectedType === "") {
      setErrorMessage("Bitte wählen Sie Neubau oder Sanierung.");
      return;
    }

    let selectedOptions =
      selectedType === "neubau" ? neubauSelections : sanierungSelections;
    const selectedCategories = Object.keys(selectedOptions);

    if (selectedCategories.length === 0) {
      setErrorMessage("Bitte wählen Sie mindestens eine Option aus.");
      return;
    }

    let missingOptions = [];
    const categories =
      selectedType === "neubau" ? neubauOptions : sanierungOptions;

    categories.forEach((category) => {
      if (!selectedOptions[category.name]) {
        missingOptions.push(category.name);
      }
    });

    if (missingOptions.length > 0) {
      setErrorMessage(
        `Bitte wählen Sie eine Option für die folgenden Kategorien aus: ${missingOptions.join(
          ", "
        )}`
      );
      return;
    }

    if (area <= 0) {
      setErrorMessage(
        "Bitte geben Sie eine gültige Fläche in Quadratmetern ein."
      );
      return;
    }

    let cost = 0;
    Object.values(selectedOptions).forEach((option) => (cost += option.cost));

    setTotalCost(cost * area);
    setErrorMessage("");
  };

  const handleBackClick = () => {
    setSelectedType("");
    setNeubauSelections({});
    setSanierungSelections({});
    setSelectedOptionsList([]);
    setTotalCost(0);
    setArea(1);
    setErrorMessage("");
  };

  const getDefaultInfo = () => {
    if (selectedType === "neubau") {
      return "Für Neubau empfehlen wir, die Energieeffizienz und Langlebigkeit der Materialien zu berücksichtigen. Eine gute Planung kann Ihnen langfristig Kosten sparen.";
    } else if (selectedType === "sanierung") {
      return "Bei der Sanierung ist es wichtig, den Zustand des Daches zu überprüfen und mögliche Schäden vor der Auswahl der Optionen zu bewerten.";
    }
    return "Bitte wählen Sie Neubau oder Sanierung, um Informationen zu erhalten.";
  };

  return (
    <div
      id="cost-calculator"
      className="relative z-10 text-center text-white mx-auto"
    >
      <div className="container mx-auto mb-4 py-8 rounded-xl bg-gray-200 shadow-xl ">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-teal-900 uppercase border-b-2 border-teal-400 inline-block pb-1 text-center my-8">
          Kostenberechnung für Dacharbeiten
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 py-4">
          <button
            onClick={() => handleTypeSelection("neubau")}
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white transition ${
              selectedType === "neubau"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-800 border border-teal-800"
            }`}
          >
            Neubau
          </button>
          <button
            onClick={() => handleTypeSelection("sanierung")}
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white transition ${
              selectedType === "sanierung"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-800 border border-teal-800"
            }`}
          >
            Sanierung
          </button>
          <button
            onClick={toggleContactModal}
            className="px-4 py-2 w-full sm:w-auto bg-white text-teal-800 border border-teal-800 text-lg font-semibold rounded-lg hover:bg-teal-700 hover:text-white transition"
          >
            Frage stellen
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">
              Information:
            </h2>
            <p className="text-teal-900 text-lg mx-auto text-left">
              {getDefaultInfo()}
            </p>
            {selectedOptionsList.length > 0 && (
              <ul className="list-disc list-inside text-teal-700 text-left mx-5 my-5 px-5 py-5">
                {selectedOptionsList.map((item, index) => (
                  <li key={index}>
                    {item.category} {item.option} - {item.description}
                  </li>
                ))}
              </ul>
            )}
            {totalCost > 0 && (
              <div className="mt-4">
                <p className="text-2xl text-teal-700 text-left italic mx-5 my-5 px-5 py-5">
                  Ihre geschätzten Kosten für die ausgewählten Optionen
                  betragen:{" "}
                  <span className="text-yellow-600">
                    {totalCost.toFixed(2)} €
                  </span>
                </p>
                <p className="text-teal-600 mx-5 my-5 px-5 text-left">
                  Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten!
                </p>
              </div>
            )}

            {totalCost > 0 && (
              <div className="grid grid-col-2 mt-4">
                <button
                  onClick={toggleContactModal}
                  className="bg-teal-600 text-white  py-2 rounded-lg hover:bg-teal-700 shimmer-button"
                >
                  Kontakt aufnehmen
                </button>
              </div>
            )}
          </div>
          <div ref={optionsSectionRef}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">
                {selectedType === "neubau"
                  ? "Wählen Sie die Optionen für den Neubau:"
                  : "Wählen Sie die Optionen für die Sanierung:"}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {(selectedType === "neubau"
                  ? neubauOptions
                  : sanierungOptions
                ).map((category) => (
                  <div key={category.name}>
                    <label className="flex flex-row justify-between text-teal-700 mb-2 font-medium text-left ">
                      {category.name}
                      <span className="ml-2 relative group cursor-pointer">
                        <FaInfoCircle className="hidden md:block h-5 w-5 text-teal-700 mr-5 shimmer-button" />
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 z-50 p-2 text-xl text-white bg-teal-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                          {category.description}
                        </div>
                      </span>
                    </label>
                    <select
                      onChange={(e) =>
                        handleOptionSelect(
                          category.name,
                          category.options.find(
                            (opt) => opt.name === e.target.value
                          )
                        )
                      }
                      className="w-full border border-teal-400 rounded-lg p-2 text-teal-800 focus:outline-none hover:bg-teal-600 hover:text-white"
                    >
                      <option>Bitte wählen</option>
                      {category.options?.map((option) => (
                        <option
                          key={option.name}
                          value={option.name}
                          className={`${
                            selectedOptionsList === option.name
                              ? "text-red-600"
                              : "text-teal-900"
                          }`}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label
                  className="block text-teal-700 font-medium mb-2"
                  htmlFor="area"
                >
                  Fläche (in m²):
                </label>
                <input
                  type="number"
                  id="area"
                  min="1"
                  value={area} // Убедитесь, что используете площадь как число
                  onChange={(e) => {
                    const value = e.target.value; // Получаем значение как строку
                    // Если поле ввода пустое, позволяйте его очистить; в противном случае парсим его как число
                    if (value === "" || Number(value) >= 1) {
                      setArea(value === "1" ? "" : Number(value)) ; // Устанавливаем состояние на число или пустую строку
                    }
                  }}
                  className="px-4 py-2 border w-full text-teal-800 border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {errorMessage && (
                <p className="text-red-600 font-medium text-left">
                  {errorMessage}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 items-baseline mt-4">
                <button
                  onClick={handleBackClick}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                >
                  Zurück
                </button>
                <button
                  onClick={calculateCost}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
                >
                  Berechnen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно контактов */}
        {isContactModalOpen && (
          <ContactFormModal closeModal={toggleContactModal} />
        )}
      </div>
    </div>
  );
};

export default CostCalculator;
