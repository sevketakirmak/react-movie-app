import React from 'react';
import MainPage from './MainPage';
import MovieDetail from './components/MovieDetail';
import Menu from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="movie-detail" element={<MovieDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;