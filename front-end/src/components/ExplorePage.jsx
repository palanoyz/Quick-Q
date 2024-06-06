import { useState, useEffect } from 'react';
import { axioslib } from '../lib/axioslib';
import Card from '../components/Card';

const ExplorePage = () => {
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVerified, setFilterVerified] = useState('all');
    const [filterProvince, setFilterProvince] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [data, setData] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [types, setTypes] = useState([]);

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
        // Implement logic to handle creation of a new restaurant
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
        </>
    );
};

export default ExplorePage;
