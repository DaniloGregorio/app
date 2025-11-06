import Navbar from "../../components/navbar";
import { useState } from "react";
import axios from "axios";
import "../../assets/styles/register.css"

function Register(){
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            
            const response = await axios.post("http://localhost:5000/user/register",{
                username,
                password,

            },{               headers:{
                    "Content-Type":"application/json"
                }
            });

            setMessage("user registered");
            console.log(response.data);

        }catch (error){

            console.error("error to register",error);
            setMessage("error");
        }
    };

    return(
        <>
        <Navbar/>
        <div className="register">
            <h1 className="registerAccount">Create Accont</h1>

            <form onSubmit={handleSubmit} className="registerform">

                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="registerinput"/>

                <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="registerinput"/>

                <button
                    type="submit"
                    className="inputbutton">Register
                    
                </button>

            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
        </>
    );
}

export default Register;