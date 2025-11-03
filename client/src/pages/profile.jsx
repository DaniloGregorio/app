import Navbar from "../components/navbar";
import { useProfileData } from "../hooks/profileAuth";

function Profile(){

    const {userData,error} = useProfileData();

    return(
         <>
      <Navbar />
      <div className="home">
        <h1>Profile</h1>

        {error && <p>ERROR {error.message}</p>}
        {userData ? (
          <div>
            <p><strong>Usuário:</strong> {userData.username}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
    )
}

export default Profile;