import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { axioslib } from '../lib/axioslib';
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axioslib.post('/api/user/login', { email, password });
            console.log('Login response:', response.data);
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-primary font-bold text-3xl mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="mt-1 p-2 pr-10 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-1"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <HiEye className='mt-6' /> : <HiEyeOff className='mt-6' />}
                        </button>
                    </div>
                    <button type="submit" className="bg-primary transition-all duration-300 hover:bg-opacity-80 text-white text-sm font-bold rounded-lg px-4 py-2 w-full">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don&apos;t have an account? <Link to="/Signup" className="text-primary font-bold">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
