import { useState } from 'react';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import banner from '../assets/banner.svg';
import logo from '../assets/logo.svg';

const Explore = () => {
    const pageSize = 6; 
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVerified, setFilterVerified] = useState('all'); 
    const [filterProvince, setFilterProvince] = useState('all'); 

    const data = [
        { id: 1, banner: banner, logo: logo, companyName: 'Company Name 1', province: 'Bangkok', verified: true },
        { id: 2, banner: banner, logo: logo, companyName: 'Company Name 2', province: 'Phuket', verified: false },
        { id: 3, banner: banner, logo: logo, companyName: 'Company Name 3', province: 'Chiang Mai', verified: true },
        { id: 4, banner: banner, logo: logo, companyName: 'Company Name 4', province: 'Pattaya', verified: false },
        { id: 5, banner: banner, logo: logo, companyName: 'Company Name 5', province: 'Krabi', verified: true },
        { id: 6, banner: banner, logo: logo, companyName: 'Company Name 6', province: 'Phang Nga', verified: true },
        { id: 7, banner: banner, logo: logo, companyName: 'Company Name 7', province: 'Samui', verified: false },
        { id: 8, banner: banner, logo: logo, companyName: 'Company Name 8', province: 'Hua Hin', verified: true },
        { id: 9, banner: banner, logo: logo, companyName: 'Company Name 9', province: 'Ayutthaya', verified: false },
        { id: 10, banner: banner, logo: logo, companyName: 'Company Name 10', province: 'Nakhon Ratchasima', verified: true },
        { id: 11, banner: banner, logo: logo, companyName: 'Company Name 11', province: 'Chonburi', verified: false },
        { id: 12, banner: banner, logo: logo, companyName: 'Company Name 12', province: 'Surat Thani', verified: true },
    ];

    const filteredData = data.filter(item => {
        const verifyFilter = filterVerified === 'all' ? true : item.verified;
        const provinceFilter = filterProvince === 'all' ? true : item.province === filterProvince;
        return verifyFilter && provinceFilter;
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

    return (
        <>
            <Navbar />
            <div className="mx-5 lg:mx-28 mt-12">
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <h1 className="text-2xl font-montserrat font-bold mb-3 md:mb-0">Explore Q</h1>

                    <div className="flex flex-wrap items-center mb-3 md:mb-0">
                        <select value={filterVerified} onChange={handleVerifiedFilterChange} className="mr-2 mb-2 md:mb-0 border rounded-md py-1 px-2">
                            <option value="all">All Companies</option>
                            <option value="verified">Verified Companies</option>
                        </select>

                        <select value={filterProvince} onChange={handleProvinceFilterChange} className="border rounded-md py-1 px-2">
                            <option value="all">All Provinces</option>
                            <option value="Bangkok">Bangkok</option>
                            <option value="Phuket">Phuket</option>
                            <option value="Chiang Mai">Chiang Mai</option>
                            <option value="Pattaya">Pattaya</option>
                            <option value="Krabi">Krabi</option>
                            <option value="Phang Nga">Phang Nga</option>
                            <option value="Samui">Samui</option>
                            <option value="Hua Hin">Hua Hin</option>
                            <option value="Ayutthaya">Ayutthaya</option>
                            <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
                            <option value="Chonburi">Chonburi</option>
                            <option value="Surat Thani">Surat Thani</option>
                        </select>
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

export default Explore;
``
