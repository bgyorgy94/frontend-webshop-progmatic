import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { ToastContext } from "./services/toastContext";

export default function Layout() {
    const [showToast,setShowToast] = useState({
        show: false,
        message:"elso",
        type:"elso"
    });

    return(
        <div>
            <nav><Navbar /></nav>
            <main>
                <ToastContext.Provider value={{showToast: showToast, setShowToast: setShowToast}}>
                    <Outlet />
                </ToastContext.Provider>
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
}