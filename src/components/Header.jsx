import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Обработчик прокрутки для изменения стиля при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const scrollToCostCalculator = () => {
    const costCalculatorSection = document.getElementById("cost-calculator");
    if (costCalculatorSection) {
      const rect = costCalculatorSection.getBoundingClientRect(); // Позиция элемента
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop; // Текущее значение прокрутки
      const targetY =
        rect.top + scrollTop - window.innerHeight / 2 + rect.height / 2; // Позиция на середине экрана
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 z-20 py-4 shadow-lg backdrop-blur-md transition-all duration-500 ${
        scrolled ? "bg-opacity-100" : "bg-opacity-10"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип */}
        <div className="flex  items-center">
          <img
            src="/images/Logo.png"
            alt="Olidort Bedachungen"
            className="w-16 h-10 mr-2 mt-1 sm:w-12 sm:h-8 sm:mr-4 md:w-24 md:h-16"
          />
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl text-teal-600 font-bold ">
              Olidort Bedachungen
            </h1>
            <p className="text-xs sm:text-sm italic text-yellow-400">
              &quot;Dicht ist unsere Pflicht&quot;
            </p>
          </div>
        </div>
        <div className="text-left hidden lg:block  ">
          <p className="text-sm flex justify-between items-center font-light space-x-6 text-right text-gray-400">
            <FaPhone className="my-auto mx-2" />
            Rufen Sie uns an:
            <span className="text-yellow-400 ">+49 157 300 505 70</span>
          </p>
          {/* <p className="text-sm font-light text-right text-gray-400">
            Mailen uns an:{" "}
            <span className="text-yellow-400 phone">olidort.b@gmail.com</span>
          </p> */}
        </div>

        {/* Меню для десктопа */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Home
          </a>
          <button
            onClick={scrollToCostCalculator}
            className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Kostenberechnung
          </button>
          <a
            href="#contact"
            className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Kontakt
          </a>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+49123456789"
              className="bg-yellow-400 text-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition hidden lg:flex shimmer-button"
            >
              Anruf
            </a>
          </div>
        </nav>

        {/* Бургер-меню для мобильной версии */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-yellow-500 hover:text-teal-600 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-teal-900 bg-opacity-90 p-6 flex flex-col space-y-4 md:hidden z-20">
            <a
              href="#home"
              className="text-white hover:text-secondary border-b border-gray-200 py-2"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="#cost-calculator"
              className="text-white hover:text-secondary border-b border-gray-200 py-2"
              onClick={scrollToCostCalculator}
            >
              Kostenberechnung
            </a>
            <a
              href="#contact"
              className="text-white hover:text-secondary py-2"
              onClick={toggleMenu}
            >
              Kontakt
            </a>
            <a
              href="tel:+49123456789"
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Anruf: +49 157 300 505 70
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
