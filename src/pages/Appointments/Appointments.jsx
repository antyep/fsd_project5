import "./Appointments.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserAppointments,
  getArtistAppointments,
  deleteAppointment,
} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { Modal } from "../../components/Modal/Modal";
import { userData } from "../userSlice";

export const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    handleConfirm: () => {},
  });
  const [showModal, setShowModal] = useState(false);

  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const roles = userRdxData.credentials?.userData?.userRoles;

  const isArtist = roles.includes("artist");

  useEffect(() => {
    if (isArtist) {
      getArtistAppointments(token).then((res) => {
        const { results } = res;
        setAppointments(results);
      });
    }
    if (!isArtist) {
      getUserAppointments(token).then((res) => {
        const { results } = res;
        setAppointments(results);
      });
    }
  }, []);

  const handleDeleteAppointment = (thisAppoint) => {
    const dateObj = new Date(thisAppoint.date);

    setModalData({
      title: "Confirm deletion",
      message: `${dateObj.toLocaleString()} - ${thisAppoint.user.username} - ${
        thisAppoint.artist.name
      }`,
      handleConfirm: () => {
        deleteAppointment(token, thisAppoint.id)
          .then(() => {
            navigate(0);
          })
          .catch(() => {
            setModalData({
              title: "Error while deleting appointment",
              message: "",
            });
          });
      },
    });
    setShowModal(true);
  };

  return (
    <div className="appointments-wrapper">
      <h3 className="appointments-title">
        Appointments {isArtist && "(as artist)"}
      </h3>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointments-list-item">
            <div>
              <div className="item-date">
                <span className="item-username">
                  {appointment?.user?.username}
                </span>
                {"  -  "}
                <span className="item-date">
                  {new Date(appointment?.date).toLocaleDateString()}
                </span>{" "}
                -{" "}
                <span className="item-time">
                  {new Date(appointment?.date).toLocaleTimeString()}
                </span>
              </div>
              <div className="item-email">{appointment?.user?.email}</div>
              {!isArtist && (
                <div className="item-artist-name">
                  {appointment?.artist?.name}
                </div>
              )}
            </div>
            <div>
              {token && (
                <button
                  className="delete-appointment-button"
                  onClick={() => handleDeleteAppointment(appointment)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={showModal}
        title={modalData.title}
        message={modalData.message}
        handleConfirm={modalData.handleConfirm}
        handleClose={() => setShowModal(false)}
        handleCancel={() => setShowModal(false)}
        confirmText={"Delete appointment"}
      />
    </div>
  );
};
