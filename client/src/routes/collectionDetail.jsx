import { useLoaderData, Link } from "react-router-dom"
import { getCollectionById } from "../services/collections";
import { getAuthData } from "../services/auth";
import { unwrapAtributes } from "../services/strapi";
import ArtworkCard from "../components/ArtworkCard";
import { RxPerson, RxCalendar, RxPencil2 } from "react-icons/rx";

const loader = async ({ params }) => {
    const loggedInUser = getAuthData().user;
    const collection = await getCollectionById(params.id);
    if (loggedInUser && loggedInUser.id == collection.creator.data.id) {
        return { collection, creator: loggedInUser };
    }
    return { collection, creator: false };

}

const Artworks = () => {
    const { collection, creator } = useLoaderData();

    const date = new Date(collection.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <main className="main--collections">
            <div className="collection__details">
                <div className="details__info">
                    <h2>{collection.title}</h2>
                    <div className="details__detail">
                        {creator ? (
                            <div className="collection__creator">
                                <RxPerson className="icon" />
                                <p>by you</p>
                            </div>
                        ) : (
                            collection.creator.data && (
                                <Link to={`/user/${collection.creator.data.id}`} className="collection__creator">
                                    <RxPerson className="icon" />
                                    <p>{collection.creator.data.attributes.username}</p>
                                </Link>
                            )
                        )}
                        <div className="collection__date">
                            <RxCalendar className="icon" />
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    {collection.description && <p>{collection.description}</p>}
                </div>
                {creator &&
                    <Link className="button button--detail" to={`/collection/edit/${collection.id}`}>
                        <RxPencil2 className="icon" />
                        edit
                    </Link>
                }
            </div>
            <div className="artworks artworks--collection">
                {collection.artworks && collection.artworks.data.length > 0 ? (
                    collection.artworks.data.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={unwrapAtributes(artwork)} showCreator={false} titleShort={true} add={false} />
                    ))
                ) : (
                    <p className="collection__artworks--empty">this collection has no artworks</p>
                )}
            </div>
        </main>
    )
}

Artworks.loader = loader;

export default Artworks;