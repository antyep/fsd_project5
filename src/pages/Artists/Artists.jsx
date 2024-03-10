import "./Artists.css";
import { useEffect, useState } from "react";
import { getArtists } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userData } from "../userSlice";

export const Artists = () => {
  const [artists, setArtists] = useState([]);

  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;

  useEffect(() => {
    getArtists().then((res) => {
      const { results } = res;
      setArtists(results);
    });
  }, []);

  return (
    <div className="artists-wrapper">
      <h3 className="artists-title">Artists</h3>
      <div className="artists-list">
        {artists.map((artist) => (
          <div key={artist.id} className="artists-list-item">
            <div className="artist-item-name">{artist.name}</div>
            {token && (
              <Link to={`/createappointment/${artist.id}`}>
                <div className="artist-item-button">Create appointment</div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
