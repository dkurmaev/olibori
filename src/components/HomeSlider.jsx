import { useState } from "react";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ContactFormModal from "./ContactFormModal";

const HomeSlider = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isCertificateModalOpen, setCertificateModalOpen] = useState(false);

  const toggleContactModal = () => {
    setContactModalOpen(!isContactModalOpen);
  };

  const toggleCertificateModal = () => {
    setCertificateModalOpen(!isCertificateModalOpen);
  };

  const scrollToCostCalculator = () => {
    const costCalculatorSection = document.getElementById("cost-calculator");
    if (costCalculatorSection) {
      const offset = -200; // Установите отрицательный отступ (например, -100px)
      const elementPosition = costCalculatorSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
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
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Основной контент */}
      <div className="relative z-10 text-center md:my-24 lg:my-28 sm:my-20 py-5 ">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl mt-24 font-heading font-bold text-gray-300 uppercase tracking-widest animate__animated animate__fadeIn animate__delay-1s">
          Dachdeckerarbeiten jeder Komplexität schlüsselfertig.
        </h1>
        <p className="text-sm sm:text-md md:text-xl lg:text-2xl font-sans text-yellow-400 italic mt-2 sm:mt-2 animate__animated animate__fadeIn animate__delay-3s">
          Wir bieten die besten Lösungen für Ihr Dach!
        </p>
        <p
          className="text-md sm:text-lg md:text-xl lg:text-2xl font-sans text-gray-400 mt-6 cursor-pointer underline hover:text-gray-200 transition"
          onClick={toggleCertificateModal}
        >
          Zertifizierte Meisterbetrieb
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-8">
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

      {/* Модальное окно с сертификатами */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
            onClick={toggleCertificateModal}
          ></div>
          <div className="relative bg-white p-6 rounded-lg w-11/12 max-w-2xl z-50">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-400"
              onClick={toggleCertificateModal}
            >
              {/* Используем GIF как иконку закрытия */}
              <img
                src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                alt="close"
                className="w-8 h-8" // Размеры GIF, можно изменить
              />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              Unsere Zertifikate
            </h2>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              // modules={[Navigation, Pagination]} 
              className="w-full h-64"
            >
              <SwiperSlide>
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
                  In bearbeitung
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
                  Größe: 1024x768
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">
                  Bald!
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}

      {/* Модальное окно контактов */}
{isContactModalOpen && (
  <ContactFormModal closeModal={toggleContactModal} />
)}

      
    </section>
  );
};

export default HomeSlider;
