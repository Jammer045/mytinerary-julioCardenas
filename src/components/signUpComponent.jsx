import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSignUp, googleLogin } from '../Redux/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]); // Estado para los países
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
        country: ''
    });

    // Obtener países de la API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/countries');
                if (response.data.success) {
                    setCountries(response.data.response);
                } else {
                    setError('Failed to load countries');
                }
            } catch (error) {
                setError('Error loading countries: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await dispatch(userSignUp(formData));
        if (success) {
            navigate('/signin');
        }
    };

    const handleGoogleSignUp = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const googleData = {
            email: decoded.email,
            name: decoded.name,
            photo: decoded.picture
        };
        const success = await dispatch(googleLogin(googleData));
        if (success) {
            navigate('/');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="photo" className="sr-only">Photo URL</label>
                            <input
                                id="photo"
                                name="photo"
                                type="url"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Photo URL"
                                value={formData.photo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="sr-only">Country</label>
                            <select
                                id="country"
                                name="country"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="">Select a country</option>
                                {countries.map(country => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
    <GoogleLogin
        onSuccess={handleGoogleSignUp}
        onError={() => console.log('Sign up Failed')}
    />
</div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;