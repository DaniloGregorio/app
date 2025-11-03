import { jwtDecode } from "jwt-decode";

function useAuth() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    const now = Date.now() / 1000;

    
    if (decoded.exp && decoded.exp < now) {

      localStorage.removeItem("token");
      
      return null;
    }

    return decoded;

  } catch {

    return null;
  }
}

export default useAuth;
