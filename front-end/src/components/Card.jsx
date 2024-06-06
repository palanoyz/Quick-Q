import PropTypes from 'prop-types';
import { FaCheckCircle, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={`/${item._id}`}>
                <img src={item.rest_banner} className="w-full h-64 object-cover" alt={`Banner ${item._id}`} />
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={item.rest_logo} className="h-12 w-12 rounded-full mr-3 object-cover" alt="Logo" />
                        <div>
                            <p className="text-lg font-semibold">{item.rest_name}</p>
                            <p className="text-sm text-gray-500">{item.province} - {item.rest_type}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {item.isVerified && <FaCheckCircle className="text-green-500 h-6" />}
                        <FaEllipsisH className="text-gray-500 h-6" />
                    </div>
                </div>
            </Link>
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rest_banner: PropTypes.string.isRequired,
        rest_logo: PropTypes.string.isRequired,
        rest_name: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired,
        rest_type: PropTypes.string.isRequired,
        isVerified: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Card;
