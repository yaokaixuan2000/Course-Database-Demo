/* eslint-disable no-unused-vars */
import React from 'react';

const App = () => {
    return (
        <div className="bg-gray-200  h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl mb-4">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 p-2 w-full rounded-md border" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full rounded-md border" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default App;
