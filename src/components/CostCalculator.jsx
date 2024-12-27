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
  const [length, setLength] = useState(1);
  const [width, setWidth] = useState(1);
  const [area, setArea] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
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
    setSelectedOptions((prev) => {
      const updatedOptions = { ...prev, [sectionName]: option };

      const newTotalCost = Object.values(updatedOptions).reduce(
        (sum, opt) => sum + (opt?.cost || 0),
        0
      );
      setTotalCost(newTotalCost * area);
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

      setTotalCost(
        Object.values(selectedOptions).reduce(
          (sum, opt) => sum + (opt?.cost || 0),
          0
        ) * area
      );
    }
  };
  const handleBack = () => {
    setCategory("Neubau");
    setAbrissType("Ohne Abriss");
    setSelectedOptions({});
    setLength(1);
    setWidth(1);
    setArea(1);
    setTotalCost(0);
    setError("");
  };
  const optionsSectionRef = useRef(null);

  const handleSubmit = () => {
    const isValid = optionsData.every(
      (section) => selectedOptions[section.name]
    );
    if (!isValid) {
      setError("Bitte wählen Sie eine Option aus jeder Kategorie.");
      return;
    }

    alert(
      "Ihre Bestellung wurde erfolgreich berechnet! Kosten: " + totalCost + " €"
    );
  };

  return (
    <div
      id="cost-calculator"
      className="relative z-10 text-center my-6  text-white mx-auto"
    >
      <div className="container mx-auto mb-4 py-8 rounded-xl shadow-xl bg-gray-200 shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-5xl font-heading font-bold text-teal-900 uppercase border-b-2 border-teal-400 inline-block pb-1 text-center my-8">
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
            onClick={() => setCategory("Neubau")}
          >
            Neubau
          </button>
          <button
            className={`px-4 py-2 w-full sm:w-auto rounded-lg text-lg font-semibold hover:bg-teal-800 hover:text-white transition ${
              category === "Sanierung"
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-800 border border-teal-800"
            }`}
            onClick={() => setCategory("Sanierung")}
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
          <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-gray-400 pb-1">
                {category === "Neubau"
                  ? "Wählen Sie die Optionen für den Neubau:"
                  : "Wählen Sie die Optionen für die Sanierung:"}
              </h2>

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
                  onClick={() => setAbrissType("Mit Abriss")}
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
                  <div className=" md:grid-cols gap-4">
                    <select
                      className="w-full border rounded-lg p-2 focus:outline-none bg-gray-200 text-gray-800 border-gray-400"
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
                      <option value="" disabled>
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
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="mb-4">
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
            <div className="my-2 mx-6 text-right">
              <p className="text-lg text-teal-700 font-semibold">
                Berechnete Fläche:
              </p>
              <p className="text-2xl font-bold text-teal-900">
                {area.toFixed(2)} m²
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 mx-6">
              <button
                onClick={handleBack}
                className="bg-gray-400 text-white  py-2 rounded-lg hover:bg-gray-500"
              >
                Zurück
              </button>

              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
              >
                Berechnen
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>
          

          
          <div className="">
            <h2 className="text-xl font-semibold mb-4 text-teal-700 border-b-2 border-gray-400 pb-1">
              Information:
            </h2>
            <p className="text-teal-900 text-lg mx-auto text-left">
              Bitte überprüfen Sie die ausgewählten Optionen und die berechneten
              Kosten.
            </p>
            {totalCost > 0 && (
              <div className="mt-4">
                <p className="text-2xl text-teal-700 text-left italic">
                  Ihre geschätzten Kosten betragen:{" "}
                  <span className="text-yellow-600">
                    {totalCost.toFixed(2)} €
                  </span>
                </p>
                <p className="text-teal-600 mt-4">
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

export default Kostenberechnung;
