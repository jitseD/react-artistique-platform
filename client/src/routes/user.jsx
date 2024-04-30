import { useLoaderData, redirect } from "react-router-dom";
import { getAuthData } from "../services/auth";
import { getUserById } from "../services/user";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    console.log(loggedInUser);
    if (loggedInUser && loggedInUser.id == params.id) {
        return redirect("/profile/" + params.id);
    }
    const user = await getUserById(params.id);
    return { user };
}


const Profile = () => {
    const { user } = useLoaderData();

    return (
        <>
            <p>{user.username}</p>
            <p>
                {user.artworks.length > 0 ? "user has artworks" : "user has no artworks"}
            </p>
            {user.artworks.length > 0 &&
                <ul>
                    {user.artworks.map((artwork) => (
                        <li key={artwork.id}>{artwork.title}</li>
                    ))}
                </ul>
            }
        </>
    )
}

Profile.loader = loader;

export default Profile;