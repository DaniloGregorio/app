import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { useProfileData } from "../hooks/profileAuth";
import "../assets/styles/profile.css";

function Profile() {
  const { userData, error } = useProfileData();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

 
  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      setBooks(res.data.docs.slice(0, 6));
    } catch (err) {
      console.error("Error to search book:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBook(book) {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/books/save",
        {
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
          openlibrary_id: book.key,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSavedBooks();
    } catch (err) {
      console.error("Error to save book:", err);
    }
  }

 
  async function fetchSavedBooks() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/books/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedBooks(res.data);
    } catch (err) {
      console.error("Error to load books:", err);
    }
  }
  async function handleDeleteBook(bookId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setSavedBooks((prev) => prev.filter((book) => book.id !== bookId));


    } catch (err) {
      console.error("Error removing book:", err);

    }
  }

  return (
    <>
      <Navbar />
      <div className="profile">
        <h1 className="profile-title">Profile</h1>

        {error && <p className="profile-error">ERROR {error.message}</p>}

        {userData ? (
            <p className="profile-welcome">Wellcome, {userData.username}!</p>
        ) : (
          <p>Loading...</p>
        )}

        <form onSubmit={handleSearch} className="profile-search">
          <input
            type="text"
            placeholder="Search book..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="profile-input"
          />
          <button type="submit" className="profile-button">
            Search
          </button>
        </form>

        {loading && <p>Searching books...</p>}


        <div className="profile-results">
          {books.map((book, index) => (
            <div key={index} className="profile-card">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="profile-card-img"
                />
              ) : (
                <div className="profile-card-placeholder">Sem capa</div>
              )}
              <div className="profile-card-info">
                <h3 className="profile-card-title">{book.title}</h3>
                <p className="profile-card-text">
                  Author: {book.author_name ? book.author_name[0] : "?"}
                </p>
                <p className="profile-card-text">
                  Year: {book.first_publish_year || "N/A"}
                </p>
                <button
                  onClick={() => handleSaveBook(book)}
                  className="profile-save-button"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>


        <div className="saved-books">
          <h2>Books saved</h2>
          <button onClick={fetchSavedBooks} className="refresh-btn">
            Update
          </button>
          <div className="saved-books-grid">
            {savedBooks.map((book) => (
              <div key={book.id} className="saved-book-card">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="profile-card-img"
                  />
                ) : (
                  <div className="profile-card-placeholder">No book cover</div>
                )}
                <div className="saved-book-info">
                  <h3>{book.title}</h3>
                  <p>Autor: {book.author}</p>
                   <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="delete-btn"
                  >remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
