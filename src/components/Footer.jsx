import { useState } from "react";
import ImpressumModal from "./ImpressumModal";
import DatenschutzModal from "./DatenschutzModal";

const Footer = () => {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);

  return (
    <footer className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row  items-center py-4 space-y-2 md:space-y-0">
        <p className="text-gray-800 text-center md:text-left">
          &copy; 2024 Olidort Bedachungen
        </p>
        <div className="mx-auto  md:px-6 flex justify-center items-center ">
          <p className="text-gray-600 text-center text-sm">
            Powered by
            <a
              href="https://www.linkedin.com/in/danil-kurmayev-141b44272"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline px-2"
            >
              Danil Kurmayev
            </a>{" "}
            in collaboration with QA Engineer
            <a
              href="https://www.linkedin.com/in/oleksandra-baranovska-95298a343/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline px-2"
            >
              Baranovska Oleksandra
            </a>
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-4">
          <button
            onClick={() => setIsImpressumOpen(true)}
            className="hover:text-secondary"
          >
            Impressum
          </button>
          <button
            onClick={() => setIsDatenschutzOpen(true)}
            className="hover:text-secondary"
          >
            Datenschutz
          </button>
        </div>
      </div>

      {/* Модальные окна */}
      <ImpressumModal
        isOpen={isImpressumOpen}
        onClose={() => setIsImpressumOpen(false)}
      />
      <DatenschutzModal
        isOpen={isDatenschutzOpen}
        onClose={() => setIsDatenschutzOpen(false)}
        onAccept={() => setIsDatenschutzOpen(false)}
      />
    </footer>
  );
};

export default Footer;
