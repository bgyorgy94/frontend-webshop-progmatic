import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return(
        <div>
            <Link to="/admin/termekek">Termékek</Link>
            <Link to="/admin/termek-felvitel">Új termék</Link>
        </div>
    )
}