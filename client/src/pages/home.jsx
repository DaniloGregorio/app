import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "../assets/styles/home.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4 text-wood-dark">
          A website to save the the books you want to read
        </h1>
        <p className="text-lg text-wood-light mb-6">
          Save all books you want to reed in one way
        </p>
        <Link to="/login">
          <button className="inputbutton">Login</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
