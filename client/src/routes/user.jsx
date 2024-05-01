import { useLoaderData, redirect } from "react-router-dom";
import { getAuthData } from "../services/auth";
import { getUserById } from "../services/user";
import ArtworkCard from "../components/ArtworkCard";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    if (loggedInUser && loggedInUser.id == params.id) {
        return redirect("/profile/" + params.id);
    }
    const user = await getUserById(params.id);
    return { user };
}


const Profile = () => {
    const { user } = useLoaderData();


    return (
        <main className="main--user">
            <p>{user.username}</p>
            <p>
                {user.artworks.length > 0 ? "user has artworks" : "user has no artworks"}
            </p>
            {user.artworks.length > 0 &&
                <div className="artworks">
                    {user.artworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} creator={false} />
                    ))}
                </div>
            }
        </main>
    )
}

Profile.loader = loader;

export default Profile;