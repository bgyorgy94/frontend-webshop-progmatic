import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

export default function Layout() {
    return(
        <div>
            <nav><Navbar /></nav>
            <main>
                <Outlet />
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
}