import { useState, useRef } from "react";
import {
  neubauOptions,
  ohneAbrissOptions,
  mitAbrissOptions,
} from "../service/optionsData";
import ContactFormModal from "./ContactFormModal";

const Kostenberechnung = () => {
  const [category, setCategory] = useState("Neubau");
  const [abrissType, setAbrissType] = useState("Ohne Abriss");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionsList, setSelectedOptionsList] = useState([]);
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);
  const [area, setArea] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedArea, setSelectedArea] = useState(1);
  const [isCostCalculated, setIsCostCalculated] = useState(false);
  const [error, setError] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleContactModal = () => {
    setIsContactModalOpen((prev) => !prev);
  };

  const optionsData =
    category === "Neubau"
      ? neubauOptions
      : abrissType === "Ohne Abriss"
      ? ohneAbrissOptions
      : mitAbrissOptions;

  const handleOptionSelect = (sectionName, option) => {
    if (!option) return;

    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [sectionName]: option };

      // Обновляем общую стоимость
      const newTotalCost = Object.values(updatedOptions).reduce(
        (sum, opt) => sum + (opt?.cost || 0),
        0
      );
      setTotalCost(newTotalCost * area);

      // Обновляем список выбранных опций
      const updatedOptionsList = Object.entries(updatedOptions).map(
        ([name, opt]) => ({
          category: name,
          option: opt.name,
          description: opt.description || "Keine Beschreibung verfügbar",
        })
      );
      setSelectedOptionsList(updatedOptionsList);

      return updatedOptions;
    });

    setError("");
  };

  const handleDimensionChange = (type, value) => {
    if (value === "" || Number(value) > 0) {
      if (type === "length") {
        setLength(Number(value) || 0);
        setArea((Number(value) || 0) * width);
      } else if (type === "width") {
        setWidth(Number(value) || 0);
        setArea(length * (Number(value) || 0));
      }
      const newArea =
        type === "length"
          ? (Number(value) || 0) * width
          : length * (Number(value) || 0);
      setArea(newArea);
      setSelectedArea(newArea);

      setTotalCost(
        Object.values(selectedOptions).reduce(
          (sum, opt) => sum + (opt?.cost || 0),
          0
        ) * newArea
      );
    }
  };
  const handleBack = () => {
    setCategory("Neubau");
    setAbrissType("Ohne Abriss");
    setSelectedOptions({});
    setSelectedOptionsList([]);
    setSelectedArea(1);
    setLength(1);
    setWidth(1);
    setArea(1);
    setTotalCost(0);
    setError("");
    setIsCostCalculated(false); // Сбрасываем флаг расчёта стоимости
  };

  const optionsSectionRef = useRef(null);

  const scrollToOptions = () => {
    optionsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSetCategory = (category) => {
    setCategory(category);
    scrollToOptions();
  };

  const infoSectionRef = useRef(null);
  const scrollToInfoSection = () => {
    infoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    const isValid = optionsData.every(
      (section) => selectedOptions[section.name]
    );
    if (!isValid) {
      setError("Bitte wählen Sie eine Option aus jeder Kategorie.");
      return;
    }

    setIsCostCalculated(true);
    scrollToInfoSection();
    setError("");
  };

  return (
    <div
      id="cost-calculator"
      className="relative z-10 text-center my-6  text-white mx-auto"
    >
      <div className="container mx-auto mb-4 py-8 rounded-xl  bg-gray-200 shadow-xl">
        <h1 className="text-3xl sm:text-5xl font-bold uppercase text-gray-500 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
          Kostenberechnung für Dacharbeiten
        </h1>
        {/* Top buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 py-4">
          <button
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white transition ${
              category === "Neubau"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-800 border border-teal-800"
            }`}
            onClick={() => handleSetCategory("Neubau")}
          >
            Neubau
          </button>
          <button
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white transition ${
              category === "Sanierung"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-800 border border-teal-800"
            }`}
            onClick={() => handleSetCategory("Sanierung")}
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
          <div ref={optionsSectionRef}>
            <h2 className="text-xl font-semibold mb-4 text-teal-700 text-left mx-4 border-b-2 border-gray-400 pb-1">
              {category === "Neubau"
                ? "Wählen Sie die Optionen für den Neubau:"
                : "Wählen Sie die Optionen für die Sanierung:"}
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="p-6">
              {category === "Sanierung" && (
                <div className="flex gap-4 justify-center items-center text-xl font-semibold mb-4 text-teal-700">
                  <button
                    className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform ${
                      abrissType === "Ohne Abriss"
                        ? "bg-teal-600 text-white"
                        : "bg-white text-gray-400  hover:bg-teal-900"
                    } cursor-pointer`}
                    onClick={() => setAbrissType("Ohne Abriss")}
                  >
                    Ohne Abriss
                  </button>
                  <button
                    className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform ${
                      abrissType === "Mit Abriss"
                        ? "bg-teal-600 text-white"
                        : "bg-white text-gray-400  hover:bg-teal-900"
                    } cursor-pointer`}
                    onClick={() => {
                      setAbrissType("Mit Abriss");
                      setTotalCost((prevCost) => prevCost + area * 15);
                    }}
                  >
                    Mit Abriss
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 text-left">
                {optionsData.map((section) => (
                  <div key={section.name} className="grid grid-cols gap-1 mb-4">
                    <div className="flex   text-teal-700 mb-2 font-medium text-left">
                      {section.name}
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2  w-96 z-50 p-2 text-xl text-white bg-teal-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      {section.description}
                    </div>
                    <div className="md:grid-cols gap-4">
                      <select
                        className={`w-full border border-teal-800 rounded-lg p-2 hover:border-teal-400 focus:outline-none transition ${
                          selectedOptions[section.name]?.name
                            ? "bg-teal-600 text-white border-teal-600"
                            : "bg-gray-100 text-gray-800 border-gray-400"
                        }`}
                        value={selectedOptions[section.name]?.name || ""}
                        onChange={(e) =>
                          handleOptionSelect(
                            section.name,
                            section.options.find(
                              (option) => option.name === e.target.value
                            )
                          )
                        }
                      >
                        <option
                          className="bg-gray-400 text-gray-800 border-gray-400"
                          value=""
                          disabled
                        >
                          Bitte wählen
                        </option>
                        {section.options.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-left mt-2">
                <div className="mb-20 ">
                  <label
                    className="block text-teal-700 font-medium mb-2"
                    htmlFor="length"
                  >
                    Länge (in m):
                  </label>
                  <input
                    type="number"
                    id="length"
                    min="1"
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
                    min="1"
                    value={width}
                    onChange={(e) =>
                      handleDimensionChange("width", e.target.value)
                    }
                    className="px-4 py-2 border w-full text-teal-800 border-teal-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
            {/* Новая строка для отображения выбранной площади */}
            {selectedArea && (
                  <p className="text-md sm:text-md md:text-xl text-teal-700 text-right mx-4 my-10">
                    Ihre ausgewählte Fläche beträgt:
                    <span className="text-yellow-600 mx-2 text-bold">
                      {selectedArea} m²
                    </span>
                  </p>
                )}

            <div className="grid grid-cols-2 gap-4 mb-4 mx-6 ">
              <button
                onClick={handleBack}
                className="bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
              >
                Zurück
              </button>

              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                Kosten berechnen
              </button>
            </div>
          </div>

          <div ref={infoSectionRef} className="text-left">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 text-left mx-4 border-b-2 border-gray-400 pb-1">
              Information:
            </h2>
            <p className="text-teal-900 text-lg mx-4">
              Bitte wählen Sie Optionen, um Details anzuzeigen.
            </p>

            {selectedOptionsList.length > 0 ? (
              <ul className="list-disc list-inside text-teal-700 mx-4 my-5">
                {selectedOptionsList.map((item, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-bold">{item.category}:</span>{" "}
                    {item.option} -{" "}
                    <span className="italic">{item.description}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 my-4"></p>
            )}

            {isCostCalculated && (
              <div className="mt-4">
                <p className="text-md sm:text-md md:text-2xl text-teal-700 text-right mx-2 my-8">
                  Ihre geschätzten Kosten betragen:
                  <span className="text-yellow-600 mx-2 text-bold">
                    {totalCost.toFixed(2)} €
                  </span>
                </p>

                
                <p className="text-teal-600 mt-4 mx-4">
                  Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten!
                </p>
                <div className="text-sm sm:text-md md:text-xl text-left mt-4 mx-4">
                  <p className="text-red-600 italic">
                    *Hinweis: Die berechneten Kosten sind nur eine ungefähre
                    Schätzung. Für detaillierte Informationen kontaktieren Sie
                    uns bitte.
                  </p>
                </div>
                <div className="flex justify-center px-4 mt-4">
                  <button
                    onClick={() =>
                      toggleContactModal(
                        selectedOptionsList,
                        totalCost.toFixed(2), // Передаем данные в модалку
                        selectedArea // Передаем площадь в модалку
                      )
                    }
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 shimmer-button w-full sm:w-auto md:w-full"
                  >
                    Kontakt aufnehmen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal window */}
      {isContactModalOpen && (
        <ContactFormModal
          selectedOptionsList={selectedOptionsList}
          totalCost={totalCost}
          closeModal={toggleContactModal}
        />
      )}
    </div>
  );
};

export default Kostenberechnung;
