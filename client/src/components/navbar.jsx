import { Link } from "react-router-dom";
import "../assets/styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar flex justify-between items-center px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-beige">BookSaver</h1>
      <div className="space-x-6">
        <Link to="/" className="navlink">Home</Link>
        <Link to="/login" className="navlink">Login</Link>
        <Link to="/register" className="navlink">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
