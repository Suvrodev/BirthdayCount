import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/UserActivity/Login/Login";
import SignUp from "../Pages/UserActivity/SignUp/SignUp";
import AddFriend from "../Pages/Birthday/AddFriend/AddFriend";
import AllFriends from "../Pages/Birthday/AllFriend/AllFriend/AllFriends";
import Update from "../Pages/Birthday/Update/Update";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/Admin/About/About";
import Feedback from "../Pages/Admin/Feedback/Feedback";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";


const router = createBrowserRouter([
{
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorElement></ErrorElement>,
    children:[
        // {
        //     path:'/',
        //     element:<Home></Home>
        // },
        {
            path: '/',
            element: <Navigate to={'/home'}></Navigate>
        },
        {
            path: '/home',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/addfriend',
            element: <AddFriend></AddFriend>
        },
        {
            path: '/birthday',
            element: <PrivateRoute><AllFriends></AllFriends></PrivateRoute>
        },
        {
            path: '/birthday/:id',
            element: <Update></Update>
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/feedback',
            element: <Feedback></Feedback>
        }
    ]
},
]);

export default router;