import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getUserById } from "../../services/apiCalls";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [newProfileData, setNewProfileData] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const myId = userRdxData.credentials.userData.id

  useEffect(() => {
    if (!token) {
      navigate("/register");
    } else {
      setTimeout(() => {     // setTimeout para hacer más amable el acceso a los datos de perfil
        getUserById(token, myId)
        .then((res) => {
          console.log("Response", res)
          setProfileData(res.user);
      })
      }, 2000);
    }
  }, []);

  const handleInputChange = (event) => {
    setNewProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditButton = () => {
    setNewProfileData(profileData);
    setIsEditing(!isEditing);
  };

  const handleSaveButton = () => {
    console.log('data to be saved', newProfileData)
    alert('Saved!')
    setIsEditing(false)
  }

  if (isEditing) {
    return (    
    <div className="profileDesign">
      <CustomInput
          label="Username"
          name="username"  
          type="text"
          value={newProfileData.username}
          handler={handleInputChange}
        />
      <CustomInput
        label="Email"
        name="email"  
        type="text"
        value={newProfileData.email}
        handler={handleInputChange}
      />
      <button onClick={handleEditButton}>Cancel</button>
      <button onClick={handleSaveButton}>Save</button>
    </div>)
  }

  return (
    <div className="profileDesign">
      { !!profileData.email ? (
          <>
            <h5>Username: {profileData.username}</h5>
            <h5>Email: {profileData.email}</h5>
          </>
        ) 
        : <p>Cargando datos de perfil...</p>
      }
      <button onClick={handleEditButton}></button>
    </div>
  );
};