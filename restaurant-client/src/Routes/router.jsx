import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from '../Main/Main';
import Rice from '../Pages/Rice/Rice';
import Grocery from '../Pages/Grocery/Grocery';
import Cookies from '../Pages/Cookies/Cookies';
import Drinks from '../Pages/Drinks/Drinks';
import FastFood from '../Pages/Fast-Food/fastFood';
import Home from '../Pages/Home/Home';
import CartOption from '../Pages/Cart/Cart';
import AdminLogin from '../Firebase/AdminLogin';
import AdminPanel from '../Firebase/AdminPanel';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/check",
                element: <div className='bg-gray-200'>Hello!</div>,
            },
            {
                path: "/rice",
                element: <Rice></Rice>
            },
            {
                path: "/grocery",
                element: <Grocery></Grocery>
            },
            {
                path: "/cookies",
                element: <Cookies></Cookies>
            },
            {
                path: "/drinks",
                element: <Drinks></Drinks>
            },
            {
                path: "/fast-food",
                element: <FastFood></FastFood>
            },
            {
                path: "/cart",
                element: <CartOption></CartOption>
            },
            {
                path: "/admin-login",
                element: <AdminLogin></AdminLogin>
            },
            {
                path: "/admin-panel",
                element: <AdminPanel></AdminPanel>
            }
        ]
    },
]);

export default router;