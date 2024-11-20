import { useEffect, useRef, useState } from "react";
import { FaHandshake, FaShieldAlt, FaTools } from "react-icons/fa";

const ReasonsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;

    const handleScroll = () => {
      if (!isVisible && currentSectionRef) {
        const rect = currentSectionRef.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className=" my-section relative bg-gray-100 py-16">
      <div className="relative grid grid-cols-1 gap-6 mx-auto lg:grid-cols-3 lg:px-80 text-gray-300 -mt-16">
        {/* Card 1 */}
        <div
          className={`relative ag-courses_item transition-all duration-1000 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="ag-courses-item_link shadow-lg rounded-lg bg-white">
            <div className="relative flex flex-col items-center justify-center ">
              {/* Background */}
              <div className="ag-courses-item_bg bg-teal-900"></div>
              {/* Icon */}
              <FaTools className="w-14 h-14 text-gray-700 z-10" />
            </div>
            {/* Title with underlined effect */}
            <h2 className="ag-courses-item_title text-center flex gap-3 text-4xl font-bold items-center justify-center mt-6 hover:text-teal-900 border-b-2 border-gray-300 pb-1">
              Erfahrung
            </h2>
            <p className="text-xl font-semibold justify-center items-center text-center text-yellow-500 z-10">
              über 10 Jahre
            </p>
            {/* Description */}
            <p className="ag-courses-item_date-box text-center mt-2 hover:text-white">
              Wir verfügen über ein Verständnis für moderne Dachtechnologien.
            </p>
            <ul className="ag-courses-item_date-box text-m space-y-2 text-gray-300 mt-4 ml-10 hover:text-black">
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Moderner Dachbau
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Hochwertige Materialien
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Fachkundiges Personal
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Individuelle Planung
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Umweltfreundliche Lösungen
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className={`relative ag-courses_item transition-all duration-1000 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="ag-courses-item_link_midlle shadow-2xl rounded-lg bg-white">
            <div className="relative flex flex-col items-center justify-center">
              {/* Background */}
              <div className="ag-courses-item_bg"></div>
              {/* Icon */}
              <FaHandshake className="w-14 h-14 text-gray-700 z-10" />
            </div>
            {/* Title with underlined effect */}
            <h3 className="ag-courses-item_title_middle text-center flex gap-3 text-4xl font-bold items-center justify-center mt-6 hover:text-teal-900 border-b-2 border-gray-300 pb-1 text-teal-900">
              Zuverlässigkeit
            </h3>
            <p className="text-xl font-semibold justify-center items-center text-center text-yellow-500 z-10">
              Ihr vertrauenswürdiger Partner
            </p>
            {/* Description */}
            <p className="ag-courses-item_date-box_middle text-center mt-2 hover:text-teal-900">
              Wir garantieren termingerechte Fertigstellung jedes Projekts.
            </p>
            <ul className="ag-courses-item_date-box_middle text-m space-y-2 text-gray-900 mt-4 ml-10 hover:text-black">
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Pünktliche Lieferung
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Professionelle Ausführung
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Hohe Qualitätsstandards
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Zuverlässige Zusammenarbeit
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Problemlösungsorientiert
              </li>
            </ul>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className={`relative ag-courses_item transition-all duration-1000 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="ag-courses-item_link shadow-lg rounded-lg bg-white">
            <div className="relative flex flex-col items-center justify-center">
              {/* Background */}
              <div className="ag-courses-item_bg"></div>
              {/* Icon */}
              <FaShieldAlt className="w-14 h-14 text-gray-700 z-10" />
            </div>
            {/* Title with underlined effect */}
            <h3 className="ag-courses-item_title text-center flex gap-3 text-4xl font-bold items-center justify-center mt-6 hover:text-teal-800 border-b-2 border-gray-300 pb-1">
              Garantie
            </h3>
            <p className="text-xl font-semibold justify-center items-center text-center text-yellow-500 z-10">
              Sicher und zuverlässig
            </p>
            {/* Description */}
            <p className="ag-courses-item_date-box text-center mt-2 hover:text-teal-800">
              Wir bieten umfassende Garantien auf unsere Arbeiten.
            </p>
            <ul className="ag-courses-item_date-box text-m space-y-2 text-gray-300 mt-4 ml-10 hover:text-black">
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Langfristige Garantie
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Qualitative Materialien
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Zuverlässiger Service
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Professionelle Installation
              </li>
              <li className="flex items-center">
                <span className="mr-5">&#10004;</span> Kundenorientiert
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
