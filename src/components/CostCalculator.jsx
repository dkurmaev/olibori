import { useState, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import ContactFormModal from "./ContactFormModal";
import { neubauOptions, sanierungOptions } from "../service/optionsData";

const CostCalculator = () => {
  const [selectedType, setSelectedType] = useState("neubau");
  const [neubauSelections, setNeubauSelections] = useState({});
  const [sanierungSelections, setSanierungSelections] = useState({});
  const [abrissType, setAbrissType] = useState(""); // New state for Abriss selection  
  const [length, setLength] = useState(1); // Length
  const [width, setWidth] = useState(1); // Width
  const [area, setArea] = useState(1); // Area
  const [totalCost, setTotalCost] = useState(0);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // For inline error message
  const [selectedOptions, setSelectedOptions] = useState("neubau");

  const toggleContactModal = () => {
    setContactModalOpen(!isContactModalOpen);
  };

  const optionsSectionRef = useRef(null); // Ref for scrolling

  const scrollToOptions = () => {
    if (optionsSectionRef.current) {
      const offset = 400; // Offset in pixels
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
    setLength(1); // Reset length
    setWidth(1); // Reset width
    setAbrissType([]); // Reset Abriss type on type change    
    setArea(1); // Reset area
    scrollToOptions(); // Scroll to section
  };

  const handleDimensionChange = (type, value) => {
    if (value === "" || Number(value) > 0) {
      if (type === "length") {
        setLength(Number(value) || 0);
        setArea((Number(value) || 0) * width); // Considering the current width value
      } else if (type === "width") {
        setWidth(Number(value) || 0);
        setArea(length * (Number(value) || 0)); // Considering the current length value
      }
    }
  };

  const handleOptionSelect = (category, option) => {
    const categoryOptions =
      selectedType === "neubau" ? neubauOptions : sanierungOptions;

    const foundCategory = categoryOptions.find((cat) => cat.name === category);

    if (!foundCategory) {
      setErrorMessage(`Category "${category}" not found.`);
      return;
    }

    const selectedOption = foundCategory.options.find(
      (opt) => opt.name === option.name
    );

    if (!selectedOption) {
      setErrorMessage(
        `Option "${option.name}" not found in category "${category}".`
      );
      return;
    }

    // Обновляем состояние
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: selectedOption,
    }));

    if (selectedType === "neubau") {
      setNeubauSelections((prev) => ({
        ...prev,
        [category]: selectedOption,
      }));
    } else if (selectedType === "sanierung") {
      setSanierungSelections((prev) => ({
        ...prev,
        [category]: selectedOption,
      }));
    }

    setSelectedOptionsList((prev) => {
      const updatedList = prev.filter((item) => item.category !== category);
      return [
        ...updatedList,
        {
          category,
          option: selectedOption.name,
          description: selectedOption.description || "Keine Beschreibung",
        },
      ];
    });

    setErrorMessage("");
  };

  const handleAbrissSelection = (type) => {
    setAbrissType(type);
    setSanierungSelections({}); // Reset selections when changing Abriss type
    setSelectedOptionsList([]); // Reset selected options list
    
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
    setNeubauSelections("");
    setSanierungSelections("");
    setSelectedOptionsList("");
    setTotalCost(0);
    setLength(1);
    setWidth(1);
    setArea(1);
    setAbrissType(""); // Reset Abriss type on back
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
      <div className="container mx-auto mb-4 py-8 rounded-xl bg-gray-200 shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-teal-900 uppercase border-b-2 border-teal-400 inline-block pb-1 text-center my-8">
          Kostenberechnung für Dacharbeiten
        </h1>
        {/* Top buttons */}
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

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Right side (теперь первая) */}
          <div ref={optionsSectionRef}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-teal-400 pb-1">
                {selectedType === "neubau"
                  ? "Wählen Sie die Optionen für den Neubau:"
                  : "Wählen Sie die Optionen für die Sanierung:"}
              </h2>

              {/* Render different options based on the selected type */}
              {selectedType === "sanierung" && (
                <div className="flex flex-col gap-4 mb-12">
                  <div className="flex flex-col md:flex-row gap-2">
                    <button
                      onClick={() => handleAbrissSelection("ohne")}
                      className={`flex-1 px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
                        abrissType === "ohne"
                          ? "bg-teal-600 text-white shadow-lg hover:shadow-xl hover:bg-teal-800"
                          : "bg-gray-200 text-teal-800 shadow-md hover:shadow-lg hover:bg-teal-600"
                      }`}
                    >
                      Ohne Abriss
                    </button>
                    <button
                      onClick={() => handleAbrissSelection("mit")}
                      className={`flex-1 px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
                        abrissType === "mit"
                          ? "bg-teal-600 text-white shadow-lg hover:shadow-xl hover:bg-teal-800"
                          : "bg-gray-200 text-teal-800 shadow-md hover:shadow-lg hover:bg-teal-600"
                      }`}
                    >
                      Mit Abriss
                    </button>
                  </div>
                </div>
              )}
              {abrissType === "mit" && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {neubauOptions.map((category) => (
                    <div key={category.name}>
                      <label className="flex flex-row justify-between text-teal-700 mb-2 font-medium text-left">
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
                        className={`w-full border rounded-lg p-2 focus:outline-none transition ${
                          selectedOptions[category.name]
                            ? "bg-teal-600 text-white border-teal-800"
                            : "bg-gray-200 text-gray-800 border-gray-400"
                        } hover:bg-gray-400 hover:text-white`}
                      >
                        <option value="" disabled selected>
                          Bitte wählen
                        </option>
                        {category.options?.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {(selectedType === "neubau"
                  ? neubauOptions
                  : sanierungOptions
                ).map((category) => (
                  <div key={category.name}>
                    <label className="flex flex-row justify-between text-teal-700 mb-2 font-medium text-left">
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
                      className={`w-full border rounded-lg p-2 focus:outline-none transition ${
                        selectedOptions[category.name]
                          ? "bg-teal-600 text-white border-teal-800"
                          : "bg-gray-200 text-gray-800 border-gray-400"
                      } hover:bg-gray-400 hover:text-white`}
                    >
                      <option value="" disabled selected>
                        Bitte wählen
                      </option>
                      {category.options?.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Length and Width Fields */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="mb-4 ">
                  <label
                    className="block text-teal-700 font-medium mb-2"
                    htmlFor="length"
                  >
                    Länge (in m):
                  </label>
                  <input
                    type="number"
                    id="length"
                    min="0"
                    value={length}
                    onChange={(e) =>
                      handleDimensionChange("length", e.target.value)
                    }
                    className="px-4 py-2 border w-full text-teal-800 border-teal-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-teal-700 font-medium mb-2"
                    htmlFor="width"
                  >
                    Breite (in m):
                  </label>
                  <input
                    type="number"
                    id="width"
                    min="0"
                    value={width}
                    onChange={(e) =>
                      handleDimensionChange("width", e.target.value)
                    }
                    className="px-4 py-2 border w-full text-teal-800 border-teal-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
            <div className="my-2 mx-6 text-right">
              <p className="text-lg text-teal-700 font-semibold">
                Berechnete Fläche:
              </p>
              <p className="text-2xl font-bold text-teal-900">
                {area.toFixed(2)} m²
              </p>
            </div>
            {/* Bottom buttons */}
            <div className="grid grid-cols-2 gap-4 mb-4 mx-6">
              <button
                onClick={handleBackClick}
                className="bg-gray-400 text-white  py-2 rounded-lg hover:bg-gray-500"
              >
                Zurück
              </button>
              <button
                onClick={calculateCost}
                className="bg-teal-600 text-white  py-2 rounded-lg hover:bg-teal-700"
              >
                Berechnen
              </button>
            </div>
            {/* Errors */}
            {errorMessage && (
              <p className="text-red-600 font-medium mt-6 text-center">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Left side (теперь вторая) */}
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
                <button
                  onClick={toggleContactModal}
                  className="bg-teal-600 text-white py-2 w-full rounded-lg hover:bg-teal-700 shimmer-button"
                >
                  Kontakt aufnehmen
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal window */}
        {isContactModalOpen && (
          <ContactFormModal closeModal={toggleContactModal} />
        )}
      </div>
    </div>
  );
};

export default CostCalculator;
