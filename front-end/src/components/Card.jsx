// CardComponent.js
import PropTypes from 'prop-types';
import { FaCheckCircle, FaEllipsisH } from 'react-icons/fa';

const Card = ({ item }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={item.banner} className="w-full h-64 object-cover" alt={`Banner ${item.id}`} />
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={item.logo} className="h-12 mr-3" alt="Logo" />
                    <div>
                        <p className="text-lg font-semibold">{item.companyName}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FaCheckCircle className="text-green-500 h-6" />
                    <FaEllipsisH className="text-gray-500 h-6" />
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        banner: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
