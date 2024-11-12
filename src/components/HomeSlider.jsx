import { useState } from "react";
import "animate.css";

const HomeSlider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section
      id="home"
      className="relative w-full h-fit bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/main_page.jpg')",
        backgroundAttachment: "fixed", // Parallax effect
      }}
    >
      {/* Dark overlay for the banner */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 ${
          isModalOpen ? "backdrop-blur-sm" : ""
        }`}
      ></div>

      {/* Animated text */}
      <div
        className={`relative z-10 text-center transition-all my-52 md:my-64 sm:my-24 duration-500 ${
          isModalOpen ? "blur-sm" : ""
        }`}
      >
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-heading font-bold  text-white uppercase tracking-widest animate__animated animate__fadeIn animate__delay-1s">
          Qualität. Gewährleistung. Zuverlässigkeit.
        </h1>
        <p className="text-sm sm:text-sm md:text-2xl lg:text-4xl font-sans text-yellow-400 italic mt-6 animate__animated animate__fadeIn animate__delay-3s">
          Wir bieten die besten Lösungen für Ihr Dach!
        </p>

        {/* Inquiry button */}
        <button
          onClick={handleModalToggle}
          className="mt-8 px-6 py-3 bg-teal-900 text-white text-xl font-bold uppercase rounded-full hover:bg-teal-700 transition animate__animated animate__fadeIn animate__delay-5s shimmer-button"
        >
          Anfrage senden
        </button>
      </div>

      {/* Modal Contact Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>
          <div className="relative bg-white bg-opacity-90 p-6 rounded-lg w-11/12 max-w-lg z-50">
            <button
              className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
              onClick={handleModalToggle}
            >
              {/* Close icon */}
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
