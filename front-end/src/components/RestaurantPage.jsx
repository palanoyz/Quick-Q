import { useEffect, useState, useContext, useCallback } from 'react';
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
    const [showPopup, setShowPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [notified, setNotified] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState('');

    const fetchRestaurantDetails = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getshopbyid/${restaurantID}`);
            setRestaurant(response.data);
            setIsOwner(response.data.OwnerID._id === user?._id);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    }, [restaurantID, user]);

    const fetchUserQueue = useCallback(async () => {
        try {
            if (user && user._id) {
                const response = await axioslib.get(`/api/user/getuserq/${user._id}/${restaurantID}`);
                const userQueueData = response.data.find(queue => queue.status === true) || null;
                setUserQueue(userQueueData);
            }
        } catch (error) {
            console.error('Error fetching user queue:', error);
        }
    }, [restaurantID, user]);

    const fetchQueues = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/user/getqueue/${restaurantID}`);
            setQueues(response.data);
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    }, [restaurantID]);

    const checkQueueStatus = useCallback(() => {
        if (userQueue) {
            const remainingQueues = queues.filter(queue =>
                queue.seat_type === userQueue.seat_type &&
                queue.status === true &&
                queue.queue_number < userQueue.queue_number
            ).length;

            if (remainingQueues === 0 && !notified && userQueue.status === true) {
                setShowPopup(true);
                setNotified(true);
            }
        }
    }, [queues, userQueue, notified]);

    useEffect(() => {
        fetchRestaurantDetails();
        fetchQueues();

        if (user) {
            fetchUserQueue();
        }

        const interval = setInterval(async () => {
            await fetchQueues();
            if (user) {
                await fetchUserQueue();
            }
            checkQueueStatus();
        }, 10000);

        return () => clearInterval(interval);
    }, [fetchRestaurantDetails, fetchQueues, fetchUserQueue, checkQueueStatus, user]);

    useEffect(() => {
        checkQueueStatus();
    }, [userQueue, queues, checkQueueStatus]);

    const getRemainingQueues = (seatType) => {
        if (!userQueue) return 0;

        return queues.filter(queue =>
            queue.seat_type === seatType &&
            queue.status === true &&
            queue.queue_number < userQueue.queue_number
        ).length;
    };

    const handleNextQueue = async (queueID) => {
        try {
            const response = await axioslib.put(`/api/user/updateq/${queueID}`, { status: false });
            console.log('Update response:', response);

            const updatedQueues = queues.map(queue => queue._id === queueID ? { ...queue, status: false } : queue);
            setQueues(updatedQueues);
        } catch (error) {
            console.error('Error updating queue status:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);

        const interval = setInterval(async () => {
            await fetchQueues();
            if (user) {
                await fetchUserQueue();
            }
            checkQueueStatus();
        }, 10000);

        return () => clearInterval(interval);
    };

    const handleAddQueue = async (e) => {
        e.preventDefault();
        try {
            const response = await axioslib.post(`/api/user/generatequeue/${restaurantID}`, {
                username: newUsername,
                seat_type: selectedSeat,
            });
            console.log('Generate queue response:', response);

            setQueues([...queues, response.data]);
            setShowAddPopup(false);
            setNewUsername('');
        } catch (error) {
            console.error('Error generating new queue:', error);
        }
    };

    const handleEditQueue = async (queueID, updatedData) => {
        try {
            const response = await axioslib.put(`/api/user/updateq/${queueID}`, updatedData);
            console.log('Update response:', response);

            const updatedQueues = queues.map(queue => queue._id === queueID ? { ...queue, ...updatedData } : queue);
            setQueues(updatedQueues);
        } catch (error) {
            console.error('Error updating queue:', error);
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
                    {user ? (
                        userQueue ? (
                            userQueue.status === true ? (
                                <div className="mt-12 mb-16">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Q (Type: {userQueue.seat_type})</h1>
                                    <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">{userQueue.queue_number}</h1>
                                    <p className="text-xl md:text-2xl font-bold">Remaining: {getRemainingQueues(userQueue.seat_type)} Q</p>
                                </div>
                            ) : (
                                <div className="mt-12 mb-16">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">You don&apos;t have a current queue</h1>
                                    <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">-</h1>
                                </div>
                            )
                        ) : (
                            <div className="mt-12 mb-16">
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">You don&apos;t have a queue</h1>
                                <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">-</h1>
                            </div>
                        )
                    ) : (
                        <div className="mt-12 mb-16">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">You are not logged in</h1>
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
                            {queues.find(queue => queue.seat_type === seatType && queue.status)?.queue_number || '-'}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: {queues.filter(queue => queue.seat_type === seatType && queue.status).length} Q</p>
                        {isOwner && (
                            <>
                                <button
                                    className="mt-4 px-4 py-2 bg-primary text-white rounded"
                                    onClick={() => handleNextQueue(queues.find(queue => queue.seat_type === seatType && queue.status)?._id)}
                                >
                                    Next Queue
                                </button>
                                <button
                                    className="mt-4 px-4 py-2 bg-secondary text-primary border-primary border-2 rounded ml-4"
                                    onClick={() => { setShowAddPopup(true); setSelectedSeat(seatType); }}
                                >
                                    Add Queue
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">It&apos;s your turn!</h2>
                        <button
                            className="mt-4 px-4 py-2 bg-primary text-white rounded"
                            onClick={handleClosePopup}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            {showAddPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">Add New Queue</h2>
                        <form onSubmit={handleAddQueue}>
                            <div className="mb-4">
                                <label className="block text-left text-xl font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                                    onClick={() => setShowAddPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isOwner && (
                <div className="mt-16 flex justify-center pb-12">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4  border-r border-white border-2 bg-primary text-white">Q</th>
                                <th className="py-2 px-4  border-r border-white border-2 bg-primary text-white">Seat Type</th>
                                <th className="py-2 px-4  border-r border-white border-2 bg-primary text-white">Username</th>
                                <th className="py-2 px-4  bg-primary text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queues.map((queue) => (
                                <tr key={queue._id} className="text-center">
                                    <td className="py-2 px-4 border-b">{queue.queue_number}</td>
                                    <td className="py-2 px-4 border-b">{queue.seat_type}</td>
                                    <td className="py-2 px-4 border-b">{queue.UserID.username}</td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            className="px-2 py-1 border rounded"
                                            value={queue.status}
                                            onChange={(e) => handleEditQueue(queue._id, { status: e.target.value === 'true' })}
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RestaurantPage;
