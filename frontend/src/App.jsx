import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet, Navigate } from 'react-router-dom';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', 
    withCredentials: true,
});

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/auth/me')
            .then(response => {
                setUser(response.data.data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (username, password) => {
        const response = await apiClient.post('/auth/login', { username, password });
        setUser(response.data.user);
    };

    const register = async (username, password) => {
        await apiClient.post('/auth/register', { username, password });
    };

    const logout = async () => {
        await apiClient.post('/auth/logout');
        setUser(null);
    };

    const value = { user, isLoading, login, register, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);


const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            <nav className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">Caption.it</Link>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <span className="text-gray-700 hidden sm:block">Welcome, {user.username}!</span>
                                    <button onClick={handleLogout} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Log In</Link>
                                    <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

// --- Protected Route Component ---
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading session...</p></div>;
    }
    return user ? children : <Navigate to="/login" replace />;
};

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2></div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500" placeholder="Username" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500" placeholder="Password" />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Sign in</button>
                </form>
            </div>
        </div>
    );
};

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await register(username, password);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try another username.');
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2></div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                     <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300" placeholder="Username" />
                     <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300" placeholder="Password" />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Sign up</button>
                </form>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [caption, setCaption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setCaption('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await apiClient.post('/posts', formData);
            setCaption(response.data.post.caption);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate caption.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
             <div className="w-full text-center mb-8">
                 <h1 className="text-4xl font-bold text-gray-800">Generate a Caption</h1>
                 <p className="text-gray-500 mt-2">Upload your image and let our AI do the magic!</p>
             </div>
             <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-full h-64 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center" onClick={() => fileInputRef.current.click()}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {preview ? <img src={preview} alt="preview" className="h-full w-full object-cover rounded-md"/> : <p className="text-gray-400">Click to upload an image</p>}
                </div>
                <button onClick={handleUpload} disabled={isLoading || !selectedFile} className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition">
                    {isLoading ? 'Generating...' : 'Caption It! 🚀'}
                </button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {caption && <div className="mt-6 bg-green-50 p-4 rounded-lg text-center"><p className="text-lg text-gray-800 italic">"{caption}"</p></div>}
             </div>
        </div>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/caption-generator/">
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
