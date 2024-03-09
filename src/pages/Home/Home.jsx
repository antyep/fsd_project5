import { useEffect, useState } from "react";
import "./Home.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { userLogin } from "../../services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import { inputValidator, keyValidator } from "../../services/validator";
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errorStatus: "",
    errorMessage: "",
  });
  const [smShow, setSmShow] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const userRdxData = useSelector(userData);

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "password") {
      
      
        setValidPassword(inputValidator("password", event.target.value))
  }
  };

  const buttonHandler = () => {
    const validatedCredentials = keyValidator(credentials, ['email', 'password'])
    if (inputValidator("email", validatedCredentials.email) && inputValidator("password", validatedCredentials.password)){
    userLogin(credentials)
      .then((response) => {
        const token = response.token
        const decodedToken = jwtDecode(token);

        const data = {
          token: token,
          userData: decodedToken,
        };
        dispatch(login({ credentials: data }));
        navigate("/profile");
      })
      .catch((err) => {
        console.log('err', err)
        setError((prevState) => ({
          ...prevState,
          errorStatus: err.response.status,
          errorMessage: err.response.data.error,
        }))
        setSmShow(true)
        setTimeout(() => {
          setSmShow(false)
        }, 2000);
      });
    }
    else { console.log('Validator is not working') }
  };

  const closeModalHandler = () => {
    setSmShow(false)
  }

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {

  }, [])

  return (
    <div>
        <div class= "EmailInput">
      <CustomInput
        placeholder={"Email"}
        type={"email"}
        name={"email"}
        handler={inputHandler}
      ></CustomInput>
      </div>
      <div class= "PasswordInput">
      <CustomInput
        placeholder={"Password"}
        type={"password"}
        name={"password"}
        handler={inputHandler}
      ></CustomInput>
      </div>
      <h1>{credentials.name}</h1>
      <div className="apiCallButton" onClick={buttonHandler}>
        Login
      </div>
      <div className="characterContainer">
          <ErrorModal 
          status={error.errorStatus}
          message={error.errorMessage} 
          show={smShow}
          handler={closeModalHandler}/>
      </div>
    </div>
  );
};
