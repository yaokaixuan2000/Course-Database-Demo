import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter, Route,
    RouterProvider, Routes,
    Navigate,
} from "react-router-dom";
import Root from './routes/root';
import TransList from './routes/TranList.jsx';
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './routes/AuthContext.jsx';
import Layout from "./routes/layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/root"/>}/>
                    <Route path="/root" element={<Root/>}/>
                    <Route path="/TranList" element={<Layout><TransList /></Layout>} />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);