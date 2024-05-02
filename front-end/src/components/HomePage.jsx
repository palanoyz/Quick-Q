import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from '../assets/banner.svg';
import logo from '../assets/logo.svg';
import Card from './Card';

const HomePage = () => {
    const data = [
        { id: 1, banner: banner, logo: logo, companyName: 'Company Name 1', description: 'Description 1' },
        { id: 2, banner: banner, logo: logo, companyName: 'Company Name 2', description: 'Description 2' },
        { id: 3, banner: banner, logo: logo, companyName: 'Company Name 3', description: 'Description 3' },
        { id: 4, banner: banner, logo: logo, companyName: 'Company Name 4', description: 'Description 4' },
    ];

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
        <div className="mx-5 lg:mx-28 mt-12">
            <h1 className="text-2xl font-montserrat font-bold">Popular Q</h1>
            <Slider {...settings} className="mt-10">
                {data.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </Slider>
        </div>
        <div className="mx-5 lg:mx-28 mt-12">
            <h1 className="text-2xl font-montserrat font-bold">Popular Q Today!</h1>
            <Slider {...settings} className="mt-10">
                {data.map((item) => (
                     <Card key={item.id} item={item} />
                ))}
            </Slider>
        </div>
        </>
    );
};

export default HomePage;
