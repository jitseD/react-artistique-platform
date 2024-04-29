import { useLoaderData } from "react-router-dom"
import { getArtworkById } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async ({ params }) => {
    const artwork = await getArtworkById(params.id);
    return { artwork };
}

const Artwork = () => {
    const { artwork } = useLoaderData();
    console.log(artwork);
    return (
        // <p>artwork</p>
        <Canvas
            frame={{ margin: artwork.frameMargin, dashes: artwork.frameDashes }}
            linesPattern={JSON.parse(artwork.linesPattern)}
            lines={{ total: artwork.linesTotal, rotation: artwork.linesRotation }}
            shapes={JSON.parse(artwork.shapes)}
            title={artwork.title}
            colorMode={{ darkMode: artwork.darkMode, foreground: artwork.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.darkMode ? "#0D0D0C" : "#F2F2E6" }}
            styling={{
                dropShadow: artwork.dropShadow,
                gradient: artwork.gradient,
                grain: artwork.grain
            }}
        />
    )
}

Artwork.loader = loader;

export default Artwork;