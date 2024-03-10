import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "./Register/Register";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Profile } from "./Profile/Profile";
import { Artists } from "./Artists/Artists";
import { Admin } from "./Admin/Admin";
import { Contact } from "./Contact/Contact";
import { CreateAppointment } from "./CreateAppointment/CreateAppointment";
import { Appointments } from "./Appointments/Appointments";

export const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route
          path="/createappointment/:artistId"
          element={<CreateAppointment />}
        />
      </Routes>
    </>
  );
};
