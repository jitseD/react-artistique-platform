import { redirect, useLoaderData, Link } from "react-router-dom";
import { getAuthData } from "../../services/auth";
import { getUserById } from "../../services/user";
import { RxPlus, RxPerson } from "react-icons/rx";
import ArtworkCard from "../../components/ArtworkCard";
import CollectionCard from "../../components/CollectionCard";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    if (!loggedInUser || loggedInUser.id != params.id) {
        return redirect(`${import.meta.env.BASE_URL}/user/` + params.id);
    }
    const user = await getUserById(params.id);
    return { user };
}



const Profile = () => {
    const { user } = useLoaderData();

    const date = new Date(user.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <main className="main--profile">
            <div className="user__profile">
                <div className="profile__icon">
                    <RxPerson className="icon" />
                </div>
                <h2>{user.username}</h2>
                <p>Joined {formattedDate}</p>
            </div>
            <div className="artworks__wrapper">
                <div className="artworks__title">
                    <h3>Your artworks</h3>
                    <p>
                        {user.artworks.length > 0 ? user.artworks.length == 1 ? (
                            `you created 1 artwork`
                        ) : (
                            `you created ${user.artworks.length} artworks`
                        ) : (
                            `user has no artworks`
                        )}
                    </p>
                </div>
                {user.artworks.length > 0 &&
                    <div className="artworks">
                        {user.artworks.map((artwork) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} showCreator={false} titleShort={false} add={false} />
                        ))}
                    </div>
                }
                <Link className="button button--primary profile__button" to={`${import.meta.env.BASE_URL}/artwork/generate`}>
                    <div className="profile__button--wrapper">
                        <RxPlus />
                        add artwork
                    </div>
                </Link>
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
                <Link className="button button--primary profile__button" to={`${import.meta.env.BASE_URL}/collection/create`}>
                    <div className="profile__button--wrapper">
                        <RxPlus />
                        add collection
                    </div>
                </Link>
            </div>
        </main>
    )
}

Profile.loader = loader

export default Profile;