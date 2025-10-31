import { useState } from "react";
import Navbar from "../../components/navbar";
function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");

     const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:5000/user/login",{
                username,
                password,

            },{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            setMessage("user logged-in");
            console.log(response.data);
        }catch (error){
            console.error("error to register",error);
            setMessage("error to login");
        }
    };
    
    return(
        <>
        <Navbar/>
        <div className="login">
            <h1 className="loginAccount">Login</h1>
            <form onSubmit={handleSubmit} className="loginform">

                <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="logininput"/>

                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="logininput"/>

                <button
                type="submit"
                className="inputbutton">Login</button>

            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
        </>
    )
}

export default Login;