import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import { axioslib } from '../lib/axioslib';

const HomePage = () => {
    const [popularBuffet, setPopularBuffet] = useState([]);
    const [popularCafe, setPopularCafe] = useState([]);
    const [popularSuki, setPopularSuki] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axioslib.get('/api/user/getshop');
                const shopData = response.data;

                const buffetData = shopData.filter(item => item.rest_type === 'Buffet');
                const cafeData = shopData.filter(item => item.rest_type === 'Cafe');
                const sukiData = shopData.filter(item => item.rest_type === 'Suki');

                setPopularBuffet(buffetData);
                setPopularCafe(cafeData);
                setPopularSuki(sukiData);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };

        fetchData();
    }, []);

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
                                <Card key={item.id} item={item} />
                            ))}
                        </Slider>
                    </div>
                )}
                {popularCafe.length > 0 && (
                    <div className="mx-5 lg:mx-28 mt-12">
                        <h1 className="text-2xl font-montserrat font-bold">Cafe</h1>
                        <Slider {...settings} className="mt-10">
                            {popularCafe.map((item) => (
                                <Card key={item.id} item={item} />
                            ))}
                        </Slider>
                    </div>
                )}
                {popularSuki.length > 0 && (
                    <div className="mx-5 lg:mx-28 mt-12">
                        <h1 className="text-2xl font-montserrat font-bold">Suki</h1>
                        <Slider {...settings} className="mt-10">
                            {popularSuki.map((item) => (
                                <Card key={item.id} item={item} />
                            ))}
                        </Slider>
                    </div>
                )}
            </div>
        </>
    );
};

export default HomePage;
