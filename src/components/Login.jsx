import React from 'react';
import img1 from '../assets/proj.jpg';

const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-black text-white">
            <div className="container mx-auto flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8">
                    <h1 className="text-4xl mb-6">Crypto Quest</h1>
                    <h2 className="text-xl text-center mb-8">Welcome!<br />Please login to your account</h2>
                    <form className="flex flex-col">
                        <input type="email" className="p-2 mb-4 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-black" placeholder="Email" />
                        <input type="password" className="p-2 mb-4 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-black" placeholder="Password" />
                        <div className="flex items-center mb-4 justify-between">
                            <div>
                                <input type="checkbox" id="remember-me" className="mr-2" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">Login</button>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/2 p-8 bg-green-500 flex justify-center items-center">
                    <img src={img1} alt="Crypto Quest Image" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
}

export default Login;
