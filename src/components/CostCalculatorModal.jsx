import PropTypes from "prop-types";
import CostCalculator from "./CostCalculator";

const CostCalculatorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Не отображать, если модальное окно закрыто

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
        >
          ✕
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

