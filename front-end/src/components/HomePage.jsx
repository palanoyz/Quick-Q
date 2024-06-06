import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner from '../assets/banner.svg';
import logo from '../assets/logo.svg';
import Card from './Card';

const HomePage = () => {
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
