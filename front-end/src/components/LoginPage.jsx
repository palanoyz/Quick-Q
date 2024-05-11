import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-primary font-bold text-3xl mb-6 text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="mt-1 p-2 pr-10 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
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
}

export default LoginPage;
