import { Link } from "react-router-dom"

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
                    {productList.map(product => {
                        return(
                            <tr key={product.id}>
                                <th>{product.title}</th>
                                <th>{product.price}</th>
                                <th><Link to={`/admin/termekek/${product.id}/modositas`}>Módosítás</Link></th>
                                <th><Link to={`/admin/termekek/${product.id}/torles`}>Törlés</Link></th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}