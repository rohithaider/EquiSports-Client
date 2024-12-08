import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./routes/Home";

import NotFound from "./routes/NotFound";
import Terms from "./routes/Terms";
import AllSports from "./routes/AllSports";
import AddEquipment from "./routes/AddEquipment";
import MyEquipment from "./routes/MyEquipment";
import ProductDetails from "./pages/ProductDetails.jsx";
import UpdateEquipment from "./routes/UpdateEquipment.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path:"/",
        element:<Home/>
      }
      ,{
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"profile",
        element:<ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      },
      {
        path:"forgot-password",
        element:<ForgetPassword/>
      },

      {
        path: "*", // Catch-all route for 404
        element: <NotFound />,
      },
      {
        path:"terms",
        element:<Terms/>
      },
      {
        path:"allSports",
        element:<AllSports/>
      },
      {
        path:"addEquipment",
        element:<ProtectedRoute><AddEquipment/></ProtectedRoute>
      },
      {
        path:"myEquipment",
        element:<ProtectedRoute><MyEquipment/></ProtectedRoute>
      },
      {
        path: "product-details/:serviceId", // Route with a parameter for the product ID
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path:"updateEquipment/:id",
        element:<UpdateEquipment/>
      }
    
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
