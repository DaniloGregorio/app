import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export function useProfileData() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      axios.get(`http://localhost:5000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch((err) => setError(err));
    } catch (err) {
      console.error("Error to decrypt the token:", err);
      setError(err);
    }
  }, []);

  return { userData, error };
}