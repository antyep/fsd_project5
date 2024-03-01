import { Navigate, Route, Routes } from "react-router-dom"
import { Register } from "../Register/Register"
import { Home } from "../Home/Home"
import { Profile } from "../Profile/Profile"
import { Admin } from "../Admin/Admin"

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                
            </Routes>
        </>
    )
}