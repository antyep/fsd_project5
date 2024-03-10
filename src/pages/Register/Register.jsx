import { useState } from "react";
import "./Register.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { registerUser } from "../../services/apiCalls";
import { Modal } from "../../components/Modal/Modal";
import { inputValidator, keyValidator } from "../../services/validator";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [validationError, setValidationError] = useState(""); // Nuevo estado para el mensaje de error de validación
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    const validatedCredentials = keyValidator(credentials, [
      "username",
      "email",
      "password",
    ]);
    if (
      inputValidator("text", validatedCredentials.username) &&
      inputValidator("email", validatedCredentials.email) &&
      inputValidator("password", validatedCredentials.password)
    ) {
      registerUser(credentials)
        .then(() => {
          setModalData({
            title: "Registered succesfully",
            message: "You can now login into your account.",
          });
          setRegisterSuccessful(true);
          setShowModal(true);
        })
        .catch((err) => {
          console.log("err", err);
          setModalData((prevState) => ({
            ...prevState,
            title: err.response.status,
            message: err.response.data.message,
          }));
          setShowModal(true);
        });
    } else {
      setValidationError(
        "Por favor, verifica que todos los campos esten correctos."
      );
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
    if (registerSuccessful) {
      navigate("/login");
    }
  };

  console.log("formvalue", credentials);

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="form-title">Register</div>
        {validationError && (
          <div className="error-message">{validationError}</div>
        )}
        <CustomInput
          placeholder="Set an username"
          type="text"
          name="username"
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Fill your email"
          type="email"
          name="email"
          handler={inputHandler}
        />
        <CustomInput
          placeholder="Set your password"
          type="password"
          name="password"
          handler={inputHandler}
        />
        <div className="submit-button" onClick={handleSubmit}>
          Register
        </div>
        <div>
          <Modal
            title={modalData.title}
            message={modalData.message}
            show={showModal}
            handleClose={closeModalHandler}
          />
        </div>
      </div>
    </div>
  );
};
