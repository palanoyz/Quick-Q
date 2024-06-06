import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { axioslib } from '../lib/axioslib';

const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axioslib.post('/api/user/signup', user);
            // Ensure no tokens are saved here
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-primary font-bold text-3xl mb-6 text-center">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password" name="password"
                            className="mt-1 p-2 pr-10 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            onChange={handleChange}
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
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
