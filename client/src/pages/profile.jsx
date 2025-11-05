import Navbar from "../components/navbar";
import { useProfileData } from "../hooks/profileAuth";
import "../assets/styles/profile.css";

function Profile() {
  const { userData, error } = useProfileData();

  return (
    <>
      <Navbar />
      <div className="profile">
        <h1>Profile</h1>

        {error && <p className="profile-error">ERROR: {error.message}</p>}
        {userData ? (
          <div className="profile-card">
            <p>
              <strong>Usuário:</strong> {userData.username}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Profile;
