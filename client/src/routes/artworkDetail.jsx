import { useLoaderData, Link } from "react-router-dom"
import { getArtworkById } from "../services/artworks";
import { getAuthData } from "../services/auth";
import { RxPerson, RxCalendar, RxPencil2 } from "react-icons/rx";
import Canvas from "../components/Canvas";

const loader = async ({ params }) => {
    const {user} = getAuthData();
    const artwork = await getArtworkById(params.id);
    if (user && user.id == artwork.creator.data.id) {
        return { artwork, creator: true };
    }
    return { artwork, creator: false };
}

const ArtworkDetail = () => {
    const { artwork, creator } = useLoaderData();

    const date = new Date(artwork.createdAt);
    const formattedDate = date.toISOString().split('T')[0];

    return (
        <main className={`main--detail main--detail--${artwork.darkMode ? `dark` : `light`}`}>
            <div className="frame">
                <Canvas
                    id={artwork.id}
                    frame={artwork.values.frame}
                    linesPattern={artwork.values.linesPattern}
                    lines={artwork.values.lines}
                    shapes={artwork.values.shapes}
                    title={artwork.title}
                    colorMode={{ darkMode: artwork.darkMode, foreground: artwork.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.darkMode ? "#0D0D0C" : "#F2F2E6" }}
                    styling={{ dropShadow: artwork.dropShadow, gradient: artwork.gradient, grain: artwork.grain }}
                />
            </div>
            <div className="artwork__details--wrapper">
                <div className="artwork__details">
                    <div className="details__info">
                        <h2>{artwork.title}</h2>
                        <div className="details__detail">
                            {creator ? (
                                <div className="artwork__creator">
                                    <RxPerson className="icon" />
                                    <p>by you</p>
                                </div>
                            ) : (
                                artwork.creator.data && (
                                    <Link to={`/user/${artwork.creator.data.id}`} className="artwork__creator">
                                        <RxPerson className="icon" />
                                        <p>{artwork.creator.data.attributes.username}</p>
                                    </Link>
                                )
                            )}
                            <div className="artwork__date">
                                <RxCalendar className="icon" />
                                <p>{formattedDate}</p>
                            </div>
                        </div>
                        {artwork.description && <p>{artwork.description}</p>}
                    </div>
                    {creator &&
                        <Link className="button button--detail" to={`/artwork/edit/${artwork.id}`}>
                            <RxPencil2 className="icon" />
                            edit
                        </Link>
                    }
                </div>
            </div>
        </main>
    )
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;