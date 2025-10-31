import Navbar from "../../components/navbar";
function Login(){
    
    return(
        <div>
            <Navbar/>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
            </form>
        </div>
    )
}

export default Login;