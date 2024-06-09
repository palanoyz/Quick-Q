import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Card = ({ item, onEdit, onDelete }) => {
    const { user } = useContext(UserContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const isOwner = user?._id === item.OwnerID;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            <Link to={`/${item._id}`}>
                <img src={item.rest_banner} className="w-full h-64 object-cover" alt={`Banner ${item.rest_name}`} />
            </Link>
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
                    {isOwner && (
                        <div className="relative">
                            <FaEllipsisH
                                className="text-gray-500 h-6 cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div className="absolute right-10 bottom-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-2">
                                    <button
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            onEdit(item);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            setShowDeleteConfirm(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this restaurant?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(item._id);
                                    setShowDeleteConfirm(false);
                                }}
                                className="bg-primary text-white px-4 py-2 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
        OwnerID: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Card;
