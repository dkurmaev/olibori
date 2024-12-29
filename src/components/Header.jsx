import { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
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
      costCalculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 z-20 py-4 shadow-2xl bg-gray-400 backdrop-blur-xl transition-all duration-500  ${
        scrolled ? "bg-opacity-200" : "bg-opacity-10"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
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
        <div className="responsive-container hidden lg-custom:hidden md-custom:hidden lg:block xl:block sm:hidden flex-wrap">
          <p className="text-md lg:flex justify-between items-center font-light space-x-3 text-right text-yellow-400 animate-pulse">
            <FaPhoneAlt className="my-auto h-16 w-4 mx-2 vibrate" />
            <span
              href="tel:+4915730050570"
              className="text-teal-600 font-bold group relative glow"
            >
              +4915730050570
            </span>
          </p>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Home
          </a>
          <a
            href="#services"
            className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Dienstleistungen
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
              href="tel:+4915730050570"
              className="bg-yellow-400 text-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition hidden lg:flex shimmer-button"
            >
              Anruf
            </a>
          </div>
        </nav>

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
              href="#services"
              className="text-white hover:text-secondary border-b border-gray-200 py-2"
              onClick={toggleMenu}
            >
              Dienstleistungen
            </a>
            <a
              href="#cost-calculator"
              className="text-white hover:text-secondary border-b border-gray-200 py-2"
              onClick={() => {
                toggleMenu();
                scrollToCostCalculator();
              }}
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
              href="tel:+4915730050570"
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
              onClick={toggleMenu}
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
