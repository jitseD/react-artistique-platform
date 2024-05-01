import { redirect, useLoaderData } from "react-router-dom";
import { getAuthData } from "../../services/auth";
import { getUserById } from "../../services/user";
import ArtworkCard from "../../components/ArtworkCard";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    if (!loggedInUser || loggedInUser.id != params.id) {
        return redirect("/user/" + params.id);
    }
    const user = await getUserById(params.id);
    return { user };
}



const Profile = () => {
    const { user } = useLoaderData();


    return (
        <main className="main--profile">
            <p>my profile</p>
            <p>
                {user.artworks.length > 0 ? user.artworks.length == 1 ? (
                    `you created 1 artwork`
                ) : (
                    `you created ${user.artworks.length} artworks`
                ) : (
                    `user has no artworks`
                )}
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

Profile.loader = loader

export default Profile;