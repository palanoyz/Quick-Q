import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import { axioslib } from '../lib/axioslib';
import { inputprovinces } from '../data/inputprovinces';
import { restTypes } from '../data/resttype';

const HomePage = () => {
    const [popularBuffet, setPopularBuffet] = useState([]);
    const [popularCafe, setPopularCafe] = useState([]);
    const [popularSuki, setPopularSuki] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);
    const [newRestaurant, setNewRestaurant] = useState({
        rest_name: '',
        province: '',
        seatType: [],
        rest_type: '',
        rest_logo: null,
        rest_banner: null,
    });
    const [imagePreviews, setImagePreviews] = useState({
        rest_logo: null,
        rest_banner: null,
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axioslib.get('/api/user/getshop');
                const shopData = response.data;

                const buffetData = shopData.filter(item => item.rest_type === 'Buffet');
                const cafeData = shopData.filter(item => item.rest_type === 'Café/Bistro');
                const sukiData = shopData.filter(item => item.rest_type === 'Sukiyaki/Shabu');

                setPopularBuffet(buffetData);
                setPopularCafe(cafeData);
                setPopularSuki(sukiData);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };

        fetchData();
    }, []);

    const openEditPopup = (item) => {
        setIsPopupOpen(true);
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


    const handleDelete = async (id) => {
        try {
            await axioslib.delete(`/api/user/deleteshop/${id}`)
                .then(() => {
                    window.location.reload();
                });
        } catch (error) {
            console.error('Error deleting restaurant:', error);
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
            const response = await axioslib.put(`/api/user/editshop/${currentEditItem._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Edited Restaurant:', response.data);
            setIsPopupOpen(false);
            setCurrentEditItem(null);
            resetForm();
            const updatedData = await axioslib.get('/api/user/getshop');
            setPopularBuffet(updatedData.data.filter(item => item.rest_type === 'Buffet'));
            setPopularCafe(updatedData.data.filter(item => item.rest_type === 'Café/Bistro'));
            setPopularSuki(updatedData.data.filter(item => item.rest_type === 'Sukiyaki/Shabu'));
        } catch (error) {
            console.error('Error editing restaurant:', error);
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
        setImagePreviews({
            rest_logo: null,
            rest_banner: null,
        });
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className='pb-12'>
                {popularBuffet.length > 0 && (
                    <div className="mx-5 lg:mx-28 mt-12">
                        <h1 className="text-2xl font-montserrat font-bold">Buffet</h1>
                        <Slider {...settings} className="mt-10">
                            {popularBuffet.map((item) => (
                                <Card key={item.id} item={item} onEdit={openEditPopup} onDelete={handleDelete} />
                            ))}
                        </Slider>
                    </div>
                )}
                {popularCafe.length > 0 && (
                    <div className="mx-5 lg:mx-28 mt-12">
                        <h1 className="text-2xl font-montserrat font-bold">Café/Bistro</h1>
                        <Slider {...settings} className="mt-10">
                            {popularCafe.map((item) => (
                                <Card key={item.id} item={item} onEdit={openEditPopup} onDelete={handleDelete} />
                            ))}
                        </Slider>
                    </div>
                )}
                {popularSuki.length > 0 && (
                    <div className="mx-5 lg:mx-28 mt-12">
                        <h1 className="text-2xl font-montserrat font-bold">Sukiyaki/Shabu</h1>
                        <Slider {...settings} className="mt-10">
                            {popularSuki.map((item) => (
                                <Card key={item.id} item={item} onEdit={openEditPopup} onDelete={handleDelete} />
                            ))}
                        </Slider>
                    </div>
                )}
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Edit Restaurant</h2>
                        <button onClick={() => setIsPopupOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
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



                            <div>
                                <label htmlFor="rest_logo" className="block font-medium">Logo</label>
                                <input type="file" id="rest_logo" name="rest_logo" onChange={handleImageChange} className="w-full border rounded-md px-3 py-2" />
                                {imagePreviews.rest_logo && <img src={imagePreviews.rest_logo} alt="Logo Preview" className="mt-2 h-20" />}
                            </div>

                            <div>
                                <label htmlFor="rest_banner" className="block font-medium">Banner</label>
                                <input type="file" id="rest_banner" name="rest_banner" onChange={handleImageChange} className="w-full border rounded-md px-3 py-2" />
                                {imagePreviews.rest_banner && <img src={imagePreviews.rest_banner} alt="Banner Preview" className="mt-2 h-20" />}
                            </div>

                            <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md">Save Changes</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;
