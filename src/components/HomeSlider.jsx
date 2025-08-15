import { useState } from "react";
import "animate.css";
import ContactFormModal from "./ContactFormModal";

const certificates = [
  {
    src: "/images/meisterbrief.webp",
    alt: "Meisterbrief",
  },
  {
    src: "/images/zertifikat.webp",
    alt: "Zertifikat",
  },
];

const HomeSlider = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);

  const toggleContactModal = () => {
    setContactModalOpen(!isContactModalOpen);
  };

  const toggleCertificateModal = () => {
    setCertificateModalOpen(!isCertificateModalOpen);
  };

  const scrollToCostCalculator = () => {
    const costCalculatorSection = document.getElementById("cost-calculator");
    if (costCalculatorSection) {
      const offset = -200;
      const elementPosition =
        costCalculatorSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    setCurrentCertificateIndex(
      (prevIndex) => (prevIndex + 1) % certificates.length
    );
  };

  const handlePrev = () => {
    setCurrentCertificateIndex(
      (prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length
    );
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/main_page.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-90"></div>

      <div className="relative z-10 text-center md:my-24 lg:my-28 sm:my-20 py-2">
        <h1 className="text-xl sm:text-xl md:text-6xl lg:text-7xl mt-16 font-heading font-bold text-gray-300 uppercase tracking-widest animate__animated animate__fadeIn animate__delay-1s">
          <span className="bg-gradient-to-r from-teal-500 to-yellow-500 bg-clip-text text-transparent">
            Dach
          </span>
          deckerarbeiten jeder Komplexität schlüsselfertig.
        </h1>
        <p className="text-sm sm:text-md md:text-xl lg:text-2xl font-sans text-yellow-400 italic mt-4 sm:mt-2 animate__animated animate__fadeIn animate__delay-3s">
          Wir bieten die besten Lösungen für Ihr Dach!
        </p>

        <div className="flex justify-center items-center gap-4 text-gray-400 animate__animated animate__fadeIn animate__delay-3s mt-6">
          <span
            className="text-md sm:text-lg md:text-xl lg:text-2xl font-sans text-gray-400 cursor-pointer underline hover:text-gray-200 transition"
            onClick={toggleCertificateModal}
          >
            Zertifizierte Meisterbetrieb
          </span>

          <img
            src="/images/certification.gif"
            alt="close"
            className="h-12 w-12 text-teal-800 ml-2 cursor-pointer vibrateCertificate glowEffect"
            onClick={toggleCertificateModal}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-8">
          <button
            onClick={toggleContactModal}
            className="px-6 py-3 bg-teal-900 text-white text-xl font-bold uppercase rounded-xl hover:bg-teal-700 transition"
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

      {isCertificateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
            onClick={toggleCertificateModal}
          ></div>
          <div className="relative rounded-lg w-full max-w-lg h-auto z-50 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center ">
              <img
                src={certificates[currentCertificateIndex].src}
                alt={certificates[currentCertificateIndex].alt}
                className="w-full h-full object-contain "
              />
              <button
                className="absolute top-2 right-2 bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition duration-200"
                onClick={toggleCertificateModal}
              >
                <img
                  src="/images/close-icon.gif"
                  alt="close"
                  className="w-8 h-8" // Уменьшаем размер для лучшего отображения
                />
              </button>
              <button
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-teal-900 hover:bg-teal-600 text-white p-3 rounded-full transition duration-200"
                onClick={handlePrev}
              >
                &lt;
              </button>
              <button
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-teal-900 hover:bg-teal-600 text-white p-3 rounded-full transition duration-200"
                onClick={handleNext}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <ContactFormModal closeModal={toggleContactModal} />
      )}
    </section>
  );
};

export default HomeSlider;
