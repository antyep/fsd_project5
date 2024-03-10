import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Modal } from "../../components/Modal/Modal";
import { createAppointment, getArtistById } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateAppointment.css";

export const CreateAppointment = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState();
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("12:00");
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;

  const onChange = (date) => {
    setAppointmentDate(date);
  };

  const handleSubmit = () => {
    createAppointment(token, {
      artist_id: artistId,
      datetime: new Date(
        `${appointmentDate.toDateString()} ${appointmentTime}`
      ),
    })
      .then(() => {
        setModalData({
          title: "Created appointment",
          message: "Your apppointment has been created succesfully",
        });
        setShowModal(true);
        setCreatedSuccess(true);
      })
      .catch((err) => {
        setModalData({
          title: err.response.status,
          message: err.response.data.message,
        });
        setShowModal(true);
      });
  };

  const closeModalHandler = () => {
    setShowModal(false);
    if (createdSuccess) {
      navigate("/appointments");
    }
  };

  useEffect(() => {
    if (artistId)
      getArtistById(artistId).then((res) => {
        setArtist(res);
      });
  }, [artistId]);

  const handleTimeChange = (event) => {
    setAppointmentTime(event?.target?.value);
  };

  if (!artist) return <div>Artist not found</div>;

  return (
    <div className="appointment-wrapper">
      <div className="appointment-content">
        <h3 className="appointment-title">
          Create appointment with {artist.name}
        </h3>
        <div className="appointment-datepicker">
          <ReactDatePicker
            selected={appointmentDate}
            onChange={onChange}
            inline
            minDate={new Date()}
          />
        </div>
        <div>
          <input
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            required
            onChange={handleTimeChange}
            value={appointmentTime}
          />
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!appointmentDate}
        >
          Create appointment
        </button>
      </div>
      <Modal
        title={modalData.title}
        message={modalData.message}
        show={showModal}
        handleClose={closeModalHandler}
      />
    </div>
  );
};
