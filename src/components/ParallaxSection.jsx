import { useEffect } from "react";

const ParallaxSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.getElementById("parallax");
      if (parallaxElement) {
        const offset = window.pageYOffset;

        parallaxElement.style.backgroundPositionY = `${offset * 0.5}px`;
      }
    };

    if (window.innerWidth > 768) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (window.innerWidth > 768) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToComponent = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      id="parallax"
      className="relative bg-center bg-cover h-fit flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/parallax.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Наложение темного фона */}
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative text-center text-white my-16">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-7xl font-heading font-bold text-gray-200 uppercase animate__animated animate__fadeIn animate__delay-1s">
          Wir führen einzelne Arten von Dacharbeiten durch:
        </h1>
        <div className="grid grid-cols-1 gap-14 my-14 mx-auto lg:px-16 items-center justify-center text-gray-300 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-screen-2xl">
          {/* Первый блок с 3 элементами */}
          <div className="flex flex-col">
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Montage des Entwässerungssystems
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Errichtung der Dachkonstruktion
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Abdichtungs- und Dampfsperrschichten
            </p>
          </div>

          {/* Второй блок с 3 элементами */}
          <div className="flex flex-col text-gray-300">
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Verlegung von Dämmmaterial
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Installation von Belüftungselementen
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Verlegung von Bahnenabdichtungen
            </p>
          </div>

          {/* Третий блок с 3 элементами */}
          <div className="flex flex-col text-gray-300">
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Balkonabdichtung
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Garagen- und Terassenabdichtung
            </p>
            <p className="text-md font-sans text-left mt-4 custom-checkmark">
              Demontage des Dachs
            </p>
          </div>
        </div>
      </div>

      {/* Стрелка вниз */}
      <div className="flex justify-items-stretch gap-32  space-x-24 mb-12 md:space-x-32 lg:space-x-48 text-gray-200 cursor-pointer">
        <svg
          onClick={scrollToComponent}
          className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z"
          />
          <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
        </svg>
        <svg
          onClick={scrollToComponent}
          className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 animate-bounce text-teal-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z"
          />
          <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
        </svg>
        <svg
          onClick={scrollToComponent}
          className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z"
          />
          <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ParallaxSection;
