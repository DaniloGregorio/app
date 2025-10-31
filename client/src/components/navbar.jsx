import {Link} from "react-router-dom"

function Navbar(){


    return(
        <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        </div>
    )

}

export default Navbar;