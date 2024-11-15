import { useState } from "react";
import "animate.css";

const HomeSlider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const scrollToCostCalculator = () => {
    const costCalculatorSection = document.getElementById("cost-calculator");
    if (costCalculatorSection) {
      costCalculatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[60vh] md:h-[80vh] lg:h-[100vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/main_page.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      
  
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 ${
          isModalOpen ? "backdrop-blur-sm" : ""
        }`}
      ></div>

      <div
        className={`relative z-10 text-center transition-all my-24 md:my-52 lg:my-64 sm:my-64 duration-500 ${
          isModalOpen ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-2xl sm:text-3xl  md:text-4xl lg:text-6xl font-heading font-bold text-white uppercase tracking-widest animate__animated animate__fadeIn animate__delay-1s">
          Dachdeckerarbeiten jeder Komplexität schlüsselfertig.
        </h1>
        <p className="text-sm sm:text-md md:text-xl lg:text-2xl font-sans text-yellow-400 italic mt-6 animate__animated animate__fadeIn animate__delay-3s">
          Wir bieten die besten Lösungen für Ihr Dach!
        </p>

        <div className="flex flex-col md:flex-row lg:flex-grow items-center justify-center gap-4 w-full mt-8 md:mt-12 lg:mt-16">
          <button
            onClick={handleModalToggle}
            className="px-6 py-3 bg-teal-900 text-white text-xl font-bold uppercase rounded-xl hover:bg-teal-700 transition shimmer-button"
          >
            Anfrage senden
          </button>
          <span className="mx-4 text-white font-bold">oder</span>
          <button
            onClick={scrollToCostCalculator}
            className="px-6 py-3 bg-yellow-500 text-teal-900 text-xl font-bold uppercase rounded-xl hover:bg-yellow-400 transition"
          >
            Kostenberechnung
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>
          <div className="relative bg-white bg-opacity-90 p-6 rounded-lg w-11/12 max-w-lg z-50">
            <button
              className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
              onClick={handleModalToggle}
            >
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-16 h-16 relative"
              />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
              Kontaktformular
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">
                  Telefon (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-900 text-white font-bold py-2 rounded-md hover:bg-teal-700 transition"
              >
                Absenden
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSlider;
