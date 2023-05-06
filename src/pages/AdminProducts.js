import { Link } from "react-router-dom"
import AdminProductTable from "../components/AdminProductTable/AdminProductTable";
import { getAllProducts } from "../services/products-service";

export default function AdminProducts() {
    const productList = [
        {
            id: "termek-1",
            title: "Almáspite",
            price: 100
        },
        {
            id: "termek-2",
            title: "Körtés piskóta",
            price: 150
        },
        {
            id: "termek-3",
            title: "Morzsasüti",
            price: 200
        },
        {
            id: "termek-4",
            title: "Rántotthús",
            price: 1001
        },
        {
            id: "termek-5",
            title: "Meggyszörp",
            price: 150
        }
    ]
    return (
        <div>Admin Products

            <table>
                <thead>
                    <tr>
                        <th>Termék neve</th>
                        <th>Termék ára</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminProductTable />
                </tbody>
            </table>

        </div>
    )
}