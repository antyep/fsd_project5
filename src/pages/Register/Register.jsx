import { useEffect, useState } from "react"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const Register = () => {

    const [userData, setUserData] = useState({
        username: '',
        password:'',
        email: ''
    })

    const navigate = useNavigate()

    const inputHandler = (event) => {
        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post('/api/auth/register', userData);
            console.log(res.data);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect (() => {
        
        }, [])

    return (
        <div className="miDiv">
            <form onSubmit={handleSubmit}>
            <CustomInput type={"text"} name={"username"} handler={inputHandler} placeholder="Set an username"></CustomInput>
            <CustomInput type={"password"} name={"password"} handler={inputHandler} placeholder="Set your password"/>
            <CustomInput type={"email"} name={"email"} handler={inputHandler} placeholder="Fill your email" ></CustomInput>
            <button type="submit">Register</button>
            </form>
        </div>
    )
}
