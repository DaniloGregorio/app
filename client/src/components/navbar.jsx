import {Link} from "react-router-dom"

function Navbar(){


    return(
        <div className="navbar">
            <div className="navbarcontent">
                <h1 className="title">App</h1>
                <div className="navbarlinks">
                <Link to="/">Home</Link>
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )

}

export default Navbar;