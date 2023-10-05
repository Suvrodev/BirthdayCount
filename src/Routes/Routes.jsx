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
import AllFrind from "../Pages/Birthday/AllFriend/AllFrind";


const router = createBrowserRouter([
{
    path: "/",
    element: <Main></Main>,
    children:[
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
            element: <AllFrind></AllFrind>
        }
    ]
},
]);

export default router;