
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter, Route,
    RouterProvider, Routes,
} from "react-router-dom";
import Root from './routes/root';
import TransList from './routes/TranList.jsx';
import './index.css'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/root" element={<Root />} />
                <Route path="/TranList" element={<TransList />} /> {/* 新增這一行 */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);