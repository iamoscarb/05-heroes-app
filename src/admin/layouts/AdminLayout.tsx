import { Outlet } from "react-router"

export const AdminLayout = () => {
    return (
        <div className="bg-orange-500">
            <Outlet />
        </div>
    )
}
