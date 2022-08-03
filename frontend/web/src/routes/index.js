import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from '../views/Home';
import Task from '../views/Task';

export default function RoutesSolver(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task"  element={<Task />} />
                <Route path="/task/:id"  element={<Task />} />
            </Routes>
        </BrowserRouter>
    )
}