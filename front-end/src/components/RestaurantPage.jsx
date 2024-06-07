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
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axioslib.get(`/api/user/getshopbyid/${restaurantID}`);
                setRestaurant(response.data);
                setIsOwner(response.data.OwnerID._id === user?._id);
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
            }
        };

        const fetchUserQueue = async () => {
            try {
                if (user && user._id) {
                    const response = await axioslib.get(`/api/user/getuserq/${user._id}/${restaurantID}`);
                    setUserQueue(response.data.length > 0 ? response.data[0] : null);
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

        if (user) {
            fetchRestaurantDetails();
            fetchUserQueue();
            fetchQueues();
        }
    }, [restaurantID, user]);

    const getRemainingQueues = (seatType) => {
        return queues.filter(queue => queue.seat_type === seatType && !queue.status).length;
    };

    const handleNextQueue = async (queueID) => {
        try {
            const response = await axioslib.put(`/api/user/updateq/${queueID}`);
            console.log('Update response:', response);
            setQueues(queues.map(queue => queue._id === queueID ? { ...queue, status: true } : queue));
        } catch (error) {
            console.error('Error updating queue status:', error);
        }
    };

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <div className="text-center mt-12 text-text">
            <h1 className="text-3xl md:text-5xl font-bold">{restaurant.rest_name}</h1>
            {!isOwner && (
                <>
                    {userQueue ? (
                        <div className="mt-12 mb-16">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Q (Type: {userQueue.seat_type})</h1>
                            <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">{userQueue.queue_number}</h1>
                            <p className="text-xl md:text-2xl font-bold">Remaining: {getRemainingQueues(userQueue.seat_type)} Q</p>
                        </div>
                    ) : (
                        <div className="mt-12 mb-16">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">You don&apos;t have a queue</h1>
                            <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">-</h1>
                        </div>
                    )}
                </>
            )}
            <div className="flex flex-wrap justify-center mb-12 gap-12">
                {restaurant.seat_type.map((seatType, index) => (
                    <div className="mt-12" key={index}>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Type: {seatType}</h1>
                        <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">
                            {queues.find(queue => queue.seat_type === seatType && !queue.status)?.queue_number || 'N/A'}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: {getRemainingQueues(seatType)} Q</p>
                        {isOwner && (
                            <button
                                className="mt-4 px-4 py-2 bg-primary text-white rounded"
                                onClick={() => handleNextQueue(queues.find(queue => queue.seat_type === seatType && !queue.status)?._id)}
                            >
                                Next Queue
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantPage;
