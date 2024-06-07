import { useState, useEffect } from 'react';
import { axioslib } from '../lib/axioslib';
import Card from '../components/Card';
import { inputprovinces } from '../data/inputprovinces';

const ExplorePage = () => {
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVerified, setFilterVerified] = useState('all');
    const [filterProvince, setFilterProvince] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [data, setData] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [types, setTypes] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        province: '',
        seatType: [],
        logo: null,
        banner: null
    });
    const [seatTypeInput, setSeatTypeInput] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

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
        const verifyFilter = filterVerified === 'all' ? true : item.isVerified;
        const provinceFilter = filterProvince === 'all' ? true : item.province === filterProvince;
        const typeFilter = filterType === 'all' ? true : item.rest_type === filterType;
        return verifyFilter && provinceFilter && typeFilter;
    });

    const indexOfLastCard = currentPage * pageSize;
    const indexOfFirstCard = indexOfLastCard - pageSize;
    const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleVerifiedFilterChange = (event) => {
        setFilterVerified(event.target.value);
        setCurrentPage(1);
    };

    const handleProvinceFilterChange = (event) => {
        setFilterProvince(event.target.value);
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (event) => {
        setFilterType(event.target.value);
        setCurrentPage(1);
    };

    const handleNewRestaurant = () => {
        setIsPopupOpen(true);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setNewRestaurant({
            ...newRestaurant,
            [name]: value
        });
    };

    const handleImageChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];

        setNewRestaurant({
            ...newRestaurant,
            [name]: file
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            if (name === 'logo') {
                setLogoPreview(reader.result);
            } else if (name === 'banner') {
                setBannerPreview(reader.result);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSeatTypeChange = (event) => {
        setSeatTypeInput(event.target.value);
    };

    const addSeatType = () => {
        if (seatTypeInput.trim() !== '') {
            setNewRestaurant((prevState) => ({
                ...prevState,
                seatType: [...prevState.seatType, seatTypeInput.trim()]
            }));
            setSeatTypeInput('');
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('New Restaurant:', newRestaurant);
        setIsPopupOpen(false);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="mx-5 lg:mx-28 mt-12">
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className="text-2xl font-montserrat font-bold mb-3 md:mb-0">Explore Q</h1>

                    <div className="flex flex-wrap items-center mb-3 md:mb-0">
                        <select value={filterVerified} onChange={handleVerifiedFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Companies</option>
                            <option value="verified">Verified Companies</option>
                        </select>

                        <select value={filterProvince} onChange={handleProvinceFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Provinces</option>
                            {provinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>

                        <select value={filterType} onChange={handleTypeFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Types</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button onClick={handleNewRestaurant} className="border-primary border-2  text-primary hover:bg-primary hover:text-white  font-bold py-2 px-4 rounded-full">
                            New Queue
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-8">
                    {currentCards.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>

                <div className="flex justify-center mt-5">
                    {[...Array(Math.ceil(filteredData.length / pageSize)).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber + 1)}
                            className={`mx-1 px-3 py-1 border rounded-md ${currentPage === pageNumber + 1 ? 'bg-gray-200' : 'bg-white'}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-4 md:p-8">
                        <h2 className="text-2xl mb-4">New Restaurant</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newRestaurant.name}
                                    onChange={handleFormChange}
                                    className="w-full border rounded-md py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Province</label>
                                <select
                                    name="province"
                                    value={newRestaurant.province}
                                    onChange={handleFormChange}
                                    className="w-full border rounded-md py-2 px-3"
                                    required
                                >
                                    <option value="">Select Province</option>
                                    {inputprovinces.map(province => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Seat Type</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={seatTypeInput}
                                        onChange={handleSeatTypeChange}
                                        className="w-full border rounded-md py-2 px-3"
                                    />
                                    <button type="button" onClick={addSeatType} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md">
                                        Add
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {newRestaurant.seatType.map((type, index) => (
                                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    onChange={handleImageChange}
                                    className="w-full border rounded-md py-2 px-3"
                                    accept="image/*"
                                />
                                {logoPreview && (
                                    <div className="mt-2">
                                        <img src={logoPreview} alt="Logo Preview" className="h-20 w-20 rounded-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Banner</label>
                                <input
                                    type="file"
                                    name="banner"
                                    onChange={handleImageChange}
                                    className="w-full border rounded-md py-2 px-3"
                                    accept="image/*"
                                />
                                {bannerPreview && (
                                    <div className="mt-2">
                                        <img src={bannerPreview} alt="Banner Preview" className="w-96 h-52 object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={closePopup} className="mr-4 px-4 py-2 bg-gray-300 rounded-md">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
};

export default ExplorePage;
