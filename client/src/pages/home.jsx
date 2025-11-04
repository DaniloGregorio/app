import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function Home(){


    return(
        <>
            <Navbar/>
            <div className="home">
                <h1>A website to save the games you want to play</h1>
                <p>save all games you want to play in the future in one way</p>
                <Link to="/login"><button className="inputbuttonhome">Login</button></Link>
            </div>
        </>
    )
}

export default Home;