import { useLoaderData, Link } from "react-router-dom"
import { getArtworkById } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async ({ params }) => {
    const artwork = await getArtworkById(params.id);
    return { artwork };
}

const ArtworkDetail = () => {
    const { artwork } = useLoaderData();
    console.log(artwork);

    return (
        <>
            <Canvas
                id={artwork.id}
                frame={JSON.parse(artwork.data).frame}
                linesPattern={JSON.parse(artwork.data).linesPattern}
                lines={JSON.parse(artwork.data).lines}
                shapes={JSON.parse(artwork.data).shapes}
                title={artwork.title}
                colorMode={{ darkMode: artwork.darkMode, foreground: artwork.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.darkMode ? "#0D0D0C" : "#F2F2E6" }}
                styling={{
                    dropShadow: artwork.dropShadow,
                    gradient: artwork.gradient,
                    grain: artwork.grain
                }}
            />
            <Link to={`/artwork/edit/${artwork.id}`}>edit</Link>
        </>
    )
}

ArtworkDetail.loader = loader;

export default ArtworkDetail;