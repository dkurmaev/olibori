import { FaInfoCircle } from "react-icons/fa";
import PropTypes from 'prop-types';

const OptionSelector = ({ categoryOptions, selectedOptions, handleOptionSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {categoryOptions.map((category) => (
        <div key={category.name}>
          <label className="flex flex-row justify-between text-teal-700 mb-2 font-medium text-left">
            {category.name}
            <span className="ml-2 relative group cursor-pointer">
              <FaInfoCircle className="hidden md:block h-5 w-5 text-teal-700 mr-5 shimmer-button" />
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 z-50 p-2 text-xl text-white bg-teal-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                {category.description}
              </div>
            </span>
          </label>
          <select
            onChange={(e) =>
              handleOptionSelect(
                category.name,
                category.options.find((opt) => opt.name === e.target.value)
              )
            }
            className={`w-full border rounded-lg p-2 focus:outline-none transition ${
              selectedOptions[category.name]
                ? "bg-teal-600 text-white border-teal-800"
                : "bg-gray-200 text-gray-800 border-gray-400"
            } hover:bg-gray-400 hover:text-white`}
          >
            <option value="" disabled selected>
              Bitte wählen
            </option>
            {category.options?.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};
OptionSelector.propTypes = {
  categoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  selectedOptions: PropTypes.object.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
};

export default OptionSelector;

