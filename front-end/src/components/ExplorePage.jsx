import { useState, useEffect } from 'react';
import { axioslib } from '../lib/axioslib';
import Card from '../components/Card';
import { inputprovinces } from '../data/inputprovinces';
import { restTypes } from '../data/resttype';

const ExplorePage = () => {
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        verified: 'all',
        province: 'all',
        type: 'all',
    });
    const [data, setData] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [types, setTypes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);
    const [newRestaurant, setNewRestaurant] = useState({
        rest_name: '',
        province: '',
        seatType: [],
        rest_type: '',
        rest_logo: null,
        rest_banner: null,
    });
    const [seatTypeInput, setSeatTypeInput] = useState('');
    const [imagePreviews, setImagePreviews] = useState({
        rest_logo: null,
        rest_banner: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axioslib.get('/api/user/getshop');
                setData(response.data);

                const uniqueProvinces = [...new Set(response.data.map(item => item.province))];
                setProvinces(uniqueProvinces);

                const uniqueTypes = [...new Set(response.data.map(item => item.rest_type))];
                setTypes(uniqueTypes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter(item => {
        const verifyFilter = filters.verified === 'all' || item.isVerified;
        const provinceFilter = filters.province === 'all' || item.province === filters.province;
        const typeFilter = filters.type === 'all' || item.rest_type === filters.type;
        return verifyFilter && provinceFilter && typeFilter;
    });

    const indexOfLastCard = currentPage * pageSize;
    const indexOfFirstCard = indexOfLastCard - pageSize;
    const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
        setCurrentPage(1);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewRestaurant(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        setNewRestaurant(prevState => ({
            ...prevState,
            [name]: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews(prevState => ({
                ...prevState,
                [name]: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSeatTypeChange = (e) => {
        setSeatTypeInput(e.target.value);
    };

    const addSeatType = () => {
        if (seatTypeInput.trim()) {
            setNewRestaurant(prevState => ({
                ...prevState,
                seatType: [...prevState.seatType, seatTypeInput.trim()],
            }));
            setSeatTypeInput('');
        }
    };

    const resetForm = () => {
        setNewRestaurant({
            rest_name: '',
            province: '',
            seatType: [],
            rest_type: '',
            rest_logo: null,
            rest_banner: null,
        });
        setSeatTypeInput('');
        setImagePreviews({
            rest_logo: null,
            rest_banner: null,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rest_name', newRestaurant.rest_name);
        formData.append('rest_type', newRestaurant.rest_type);
        formData.append('province', newRestaurant.province);

        newRestaurant.seatType.forEach(type => {
            formData.append('seat_type[]', type);
        });

        formData.append('rest_logo', newRestaurant.rest_logo);
        formData.append('rest_banner', newRestaurant.rest_banner);

        if (newRestaurant.seatType.length === 0) {
            alert('Please create at least one seat type.');
            return;
        }

        try {
            await axioslib.post('/api/user/createshop', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(() => {
                setIsPopupOpen(false);
                resetForm();
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error creating new restaurant:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rest_name', newRestaurant.rest_name);
        formData.append('rest_type', newRestaurant.rest_type);
        formData.append('province', newRestaurant.province);

        newRestaurant.seatType.forEach(type => {
            formData.append('seat_type[]', type);
        });

        if (newRestaurant.rest_logo) formData.append('rest_logo', newRestaurant.rest_logo);
        if (newRestaurant.rest_banner) formData.append('rest_banner', newRestaurant.rest_banner);

        try {
            await axioslib.put(`/api/user/editshop/${currentEditItem._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(() => {
                setIsPopupOpen(false);
                setIsEditMode(false);
                resetForm();
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error editing restaurant:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axioslib.delete(`/api/user/deleteshop/${id}`);
            console.log('Deleted Restaurant:', response.data);
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setIsEditMode(false);
        setCurrentEditItem(null);
        resetForm();
    };

    const openEditPopup = (item) => {
        setIsPopupOpen(true);
        setIsEditMode(true);
        setCurrentEditItem(item);
        setNewRestaurant({
            rest_name: item.rest_name,
            province: item.province,
            seatType: item.seatType || [],
            rest_type: item.rest_type,
            rest_logo: null,
            rest_banner: null,
        });
        setImagePreviews({
            rest_logo: item.rest_logo,
            rest_banner: item.rest_banner,
        });
    };

    return (
        <>
            <div className="mx-5 lg:mx-28 mt-12">
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className="text-2xl font-montserrat font-bold mb-3 md:mb-0">Explore Q</h1>

                    <div className="flex flex-wrap items-center mb-3 md:mb-0">
                        <select name="verified" value={filters.verified} onChange={handleFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Companies</option>
                            <option value="verified">Verified Companies</option>
                        </select>

                        <select name="province" value={filters.province} onChange={handleFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Provinces</option>
                            {provinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>

                        <select name="type" value={filters.type} onChange={handleFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Types</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button onClick={() => { setIsPopupOpen(true); resetForm(); }} className="border-primary border-2 text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded-full">
                            New Restaurant
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-8">
                    {currentCards.map((item) => (
                        <Card key={item._id} item={item} onEdit={openEditPopup} onDelete={handleDelete} />
                    ))}
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(filteredData.length / pageSize) }).map((_, pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === pageNumber + 1 ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">{isEditMode ? 'Edit Restaurant' : 'Create New Restaurant'}</h2>
                        <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>

                        <form onSubmit={isEditMode ? handleEditSubmit : handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="rest_name" className="block font-medium">Name</label>
                                <input type="text" id="rest_name" name="rest_name" value={newRestaurant.rest_name} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" required />
                            </div>

                            <div>
                                <label htmlFor="province" className="block font-medium">Province</label>
                                <select id="province" name="province" value={newRestaurant.province} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" required>
                                    <option value="">Select Province</option>
                                    {inputprovinces.map(province => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="rest_type" className="block font-medium">Type</label>
                                <select id="rest_type" name="rest_type" value={newRestaurant.rest_type} onChange={handleFormChange} className="w-full border rounded-md px-3 py-2" required>
                                    <option value="">Select Type</option>
                                    {restTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {!isEditMode && (
                                <div>
                                    <label className="block font-medium">Seat Types</label>
                                    <div className="flex items-center space-x-2">
                                        <input type="text" value={seatTypeInput} onChange={handleSeatTypeChange} className="flex-grow border rounded-md px-3 py-2" />
                                        <button type="button" onClick={addSeatType} className="border border-primary text-primary hover:bg-primary hover:text-white rounded-md px-3 py-2">Add</button>
                                    </div>
                                    <div className="flex flex-wrap mt-2 space-x-2">
                                        {newRestaurant.seatType.map((type, index) => (
                                            <span key={index} className="bg-primary text-white rounded-full px-3 py-1 text-sm">{type}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="rest_logo" className="block font-medium">Logo</label>
                                <input type="file" id="rest_logo" name="rest_logo" accept="image/*" onChange={handleImageChange} className="w-full" />
                                {imagePreviews.rest_logo && <img src={imagePreviews.rest_logo} alt="Logo Preview" className="mt-2 w-20 h-20 object-cover" />}
                            </div>

                            <div>
                                <label htmlFor="rest_banner" className="block font-medium">Banner</label>
                                <input type="file" id="rest_banner" name="rest_banner" accept="image/*" onChange={handleImageChange} className="w-full" />
                                {imagePreviews.rest_banner && <img src={imagePreviews.rest_banner} alt="Banner Preview" className="mt-2 w-full h-32 object-cover" />}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={closePopup} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">{isEditMode ? 'Save Changes' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExplorePage;
