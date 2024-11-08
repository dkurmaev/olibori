
import PropTypes from 'prop-types';

const ServiceItem = ({ title, description }) => {
    return (
        <div className="service-item">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

ServiceItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ServiceItem;