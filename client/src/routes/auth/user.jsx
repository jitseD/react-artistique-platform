import { useLoaderData } from "react-router-dom";
import { getUserById } from "../../services/auth";

const loader = async ({ params }) => {
    const user = await getUserById(params.id);
    return { user };
}


const Profile = () => {
    const { user } = useLoaderData();
    console.log(user);

    return (
        <>
            <p>{user.username}</p>
            <p>
                {user.artworks.length > 0 ? "user has artworks" : "user has no artworks"}
            </p>
            {user.artworks.length > 0  &&
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