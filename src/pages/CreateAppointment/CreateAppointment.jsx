import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { getArtistById } from "../../services/apiCalls";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateAppointment.css";

export const CreateAppointment = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState();

  const [appointmentDate, setAppointmentDate] = useState(null);
  const onChange = (date) => {
    setAppointmentDate(date);
  };

  useEffect(() => {
    if (artistId)
      getArtistById(artistId).then((res) => {
        setArtist(res);
      });
  }, []);

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
        <button className="submit-button" disabled={!appointmentDate}>
          Create appointment
        </button>
      </div>
    </div>
  );
};
