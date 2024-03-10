import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getUserById, updateProfile } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Modal } from "../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [editingProfileData, setEditingProfileData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", message: "" });
  const [isEditing, setIsEditing] = useState(false);
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.id;

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      getUserById(token, myId).then((res) => setProfileData(res.user));
    }
  }, []);

  const handleInputChange = (event) => {
    setEditingProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditButton = () => {
    setEditingProfileData(profileData);
    setIsEditing(!isEditing);
  };

  const handleSaveButton = () => {
    updateProfile(token, editingProfileData)
      .then(() => {
        getUserById(token, myId).then((res) => setProfileData(res.user));
        setIsEditing(!isEditing);
        setModalData({
          title: "User profile updated",
          message: "User profile has been updated correctly.",
        });
        setShowModal(true);
      })
      .catch((err) => {
        setModalData({
          title: err.response.status,
          message: err.response.data.message,
        });
        setShowModal(true);
      });
  };

  return (
    <div className="profiler-wrapper">
      <div className="profile-content">
        {profileData.email ? (
          <>
            {isEditing ? (
              <h3 className="profile-title">Editing profile</h3>
            ) : (
              <div className="profile-title">
                <h3>User profile</h3>
                <button onClick={handleEditButton}>Edit</button>
              </div>
            )}
            <CustomInput
              label="Username"
              name="username"
              type="text"
              value={
                isEditing ? editingProfileData.username : profileData.username
              }
              handler={handleInputChange}
              readOnly={!isEditing}
            />
            <CustomInput
              label="Email"
              name="email"
              type="text"
              value={isEditing ? editingProfileData.email : profileData.email}
              handler={handleInputChange}
              readOnly={!isEditing}
            />
            {isEditing && (
              <>
                <button onClick={handleEditButton}>Cancel</button>
                <button onClick={handleSaveButton}>Save</button>
              </>
            )}
          </>
        ) : (
          <p>Loading profile details...</p>
        )}
      </div>
      <Modal
        title={modalData.title}
        message={modalData.message}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};
