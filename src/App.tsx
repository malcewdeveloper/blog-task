import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog, Post } from "./pages";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import 'normalize.css';


export default function App() {
    return (
        <main>
            <Provider store={ store }>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={ <Blog /> } />
                        <Route path=":id" element={ <Post /> } />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </main>
    )
}