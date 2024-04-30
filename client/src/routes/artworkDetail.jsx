import { useLoaderData, Link } from "react-router-dom"
import { getArtworkById } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async ({ params }) => {
    const artwork = await getArtworkById(params.id);
    return { artwork };
}

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();

    return (
        <main className="main--detail">
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
            <div className="details">
                {artwork.description && <p>{artwork.description}</p>}
                {artwork.creater.data && (
                    <div>
                        <p>Created by</p>
                        <Link to={`/user/${artwork.creater.data.id}`}>
                            {artwork.creater.data.attributes.username}
                        </Link>
                    </div>
                )}
                <Link to={`/artwork/edit/${artwork.id}`}>edit</Link>
            </div>
        </main>
    )
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;