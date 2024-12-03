
import PropTypes from 'prop-types';

const CostEstimateModal = ({ totalCost, selectedOptionsList, onClose, onContactRequest }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Geschätzte Kosten:</h2>
        <p className="text-2xl font-bold text-teal-700 mb-4">
          Ihre geschätzten Kosten für die ausgewählten Optionen betragen: <span className="text-teal-800">{totalCost.toFixed(2)} €</span>
        </p>
        <p className="text-teal-600 mb-4">Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten!</p>
        <ul className="list-disc list-inside text-teal-700 mb-4">
          {selectedOptionsList.map((item, index) => (
            <li key={index}>
              {item.category}: {item.option} - {item.description}
            </li>
          ))}
        </ul>
        <button 
          onClick={onContactRequest}
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Kontaktieren Sie uns
        </button>
        <button 
          onClick={onClose}
          className="mt-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Schließen
        </button>
      </div>
    </div>
  );
CostEstimateModal.propTypes = {
  totalCost: PropTypes.number.isRequired,
  selectedOptionsList: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      option: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onContactRequest: PropTypes.func.isRequired,
};



