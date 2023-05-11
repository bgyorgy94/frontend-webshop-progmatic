import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { ToastContext } from "./services/toastContext";
import Toast from "./components/Toast/Toast";

export default function Layout() {
    const [showToast,setShowToast] = useState({
        show: false,
        message:"elso",
        type:"elso"
    });

    return(
        <div>
            <ToastContext.Provider value={{showToast: showToast, setShowToast: setShowToast}}>
                <nav><Navbar /></nav>
                <main>
                        <Outlet />
                        <Toast />
                </main>
            </ToastContext.Provider>
            <footer>
                footer
            </footer>
        </div>
    )
}