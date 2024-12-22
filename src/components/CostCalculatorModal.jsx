import PropTypes from "prop-types";
import CostCalculator from "./CostCalculator";

const CostCalculatorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" rounded-lg w-full max-w-5xl p-6 relative">
      <button
                    className="absolute top-12 right-4 text-gray-500 hover:text-gray-700 z-50"
                    onClick={onClose}
                >
                    {/* Используем GIF как иконку закрытия */}
                    <img
                        src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                        alt="close"
                        className="w-16 h-16 relative" // Размеры GIF, можно изменить
                    />
                </button>
        <CostCalculator />
      </div>
    </div>
  );
};
CostCalculatorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CostCalculatorModal;

