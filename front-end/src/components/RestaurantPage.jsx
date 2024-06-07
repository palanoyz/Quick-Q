import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { axioslib } from '../lib/axioslib';

const RestaurantPage = () => {
    const { user } = useContext(UserContext);
    const { restaurantID } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [userQueue, setUserQueue] = useState(null);
    const [queues, setQueues] = useState([]);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axioslib.get(`/api/user/getshopbyid/${restaurantID}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
            }
        };

        const fetchUserQueue = async () => {
            try {
                if (user && user._id) {
                    const response = await axioslib.get(`/api/user/getuserq/${user._id}/${restaurantID}`);
                    setUserQueue(response.data);
                }
            } catch (error) {
                console.error('Error fetching user queue:', error);
            }
        };

        const fetchQueues = async () => {
            try {
                const response = await axioslib.get(`/api/user/getqueue/${restaurantID}`);
                setQueues(response.data);
            } catch (error) {
                console.error('Error fetching queues:', error);
            }
        };

        fetchRestaurantDetails();
        fetchUserQueue();
        fetchQueues();
    }, [restaurantID, user]);

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    const getRemainingQueues = (seatType) => {
        return queues.filter(queue => queue.seat_type === seatType).length;
    };

    return (
        <div className="text-center mt-12 text-text">
            <h1 className="text-3xl md:text-5xl font-bold">{restaurant.rest_name}</h1>
            {userQueue && (
                <div className="mt-12 mb-16">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Q (Type: {userQueue.seat_type})</h1>
                    <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">{userQueue.queue_number}</h1>
                    <p className="text-xl md:text-2xl font-bold">Remaining: {getRemainingQueues(userQueue.seat_type)} Q</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
                {restaurant.seat_type.map((seatType, index) => (
                    <div className="mt-12" key={index}>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Type: {seatType}</h1>
                        <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">
                            {queues.find(queue => queue.seat_type === seatType)?.queue_number || 'N/A'}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: {getRemainingQueues(seatType)} Q</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantPage;
