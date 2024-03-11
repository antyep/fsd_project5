import { useEffect, useState } from "react";
import "./Login.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { Modal } from "../../components/Modal/Modal";
import { inputValidator, keyValidator } from "../../services/validator";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errorStatus: "",
    errorMessage: "",
  });
  const [smShow, setSmShow] = useState(false);
  const [validationError, setValidationError] = useState(""); // Nuevo estado para el mensaje de error de validación
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    const validatedCredentials = keyValidator(credentials, [
      "email",
      "password",
    ]);
    if (
      inputValidator("email", validatedCredentials.email) &&
      inputValidator("password", validatedCredentials.password)
    ) {
      userLogin(credentials)
        .then((response) => {
          const token = response.token;
          const decodedToken = jwtDecode(token);

          console.log("decodedToken", { response, decodedToken });

          const data = {
            token: token,
            userData: decodedToken,
          };
          dispatch(login({ credentials: data }));
          navigate("/profile");
        })
        .catch((err) => {
          console.log("error", err);
          setError((prevState) => ({
            ...prevState,
            errorStatus: err.response.status,
            errorMessage: err.response.data.message,
          }));
          setSmShow(true);
        });
    } else {
      setValidationError("Please, verify your credentials.");
    }
  };

  const closeModalHandler = () => {
    setSmShow(false);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="form-title">Login</div>
        {validationError && (
          <div className="error-message">{validationError}</div>
        )}
        <CustomInput
          placeholder={"Email"}
          type={"email"}
          name={"email"}
          handler={inputHandler}
        />
        <CustomInput
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          handler={inputHandler}
        />
        <div className="submit-button" onClick={buttonHandler}>
          Login
        </div>
        <div>
          <Modal
            title={error.errorStatus}
            message={error.errorMessage}
            show={smShow}
            handleClose={closeModalHandler}
          />
        </div>
      </div>
    </div>
  );
};
