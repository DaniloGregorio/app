import {Link} from "react-router-dom"

function Navbar(){


    return(
        <nav className="navbar">
            <div className="navbarcontent">
                <h1 className="title">GameListToPlay</h1>
                <div className="navbarlinks">
                    <Link to="/">Home</Link>
                    <Link to="/login">login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;