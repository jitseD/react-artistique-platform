import { useLoaderData, redirect } from "react-router-dom";
import { getAuthData } from "../services/auth";
import { getUserById } from "../services/user";
import { RxPerson } from "react-icons/rx";
import ArtworkCard from "../components/ArtworkCard";
import CollectionCard from "../components/CollectionCard";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    if (loggedInUser && loggedInUser.id == params.id) {
        return redirect(`${import.meta.env.BASE_URL}/profile/` + params.id);
    }
    const user = await getUserById(params.id);
    return { user };
}


const Profile = () => {
    const { user } = useLoaderData();

    const date = new Date(user.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <main className="main--user">
            <div className="user__profile">
                <div className="profile__icon">
                    <RxPerson className="icon" />
                </div>
                <h2>{user.username}</h2>
                <p>Joined {formattedDate}</p>
            </div>
            <div className="artworks__wrapper">
                <h3>artworks</h3>
                {user.artworks.length > 0 ? (
                    <div className="artworks">
                        {user.artworks.map((artwork) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} showCreator={false} titleShort={false} add={false} />
                        ))}
                    </div>
                ) : (
                    <p>this user has no artworks yet</p>
                )}
            </div>
            <div className="collections__wrapper">
                <h3>collections</h3>
                {user.collections.length > 0 ? (
                    <div className="collections">
                        {user.collections.map((collection) => (
                            <CollectionCard key={collection.id} collection={collection} showArtworks={false} showCreator={false} titleShort={false} />
                        ))}
                    </div>
                ) : (
                    <p>this user has no collections yet</p>
                )}
            </div>
        </main>
    )
}

Profile.loader = loader;

export default Profile;