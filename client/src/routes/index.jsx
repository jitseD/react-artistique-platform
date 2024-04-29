import { useLoaderData, Link } from "react-router-dom"
import { getArtworks } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async () => {
    const artworks = await getArtworks();
    return { artworks };
}

const Index = () => {

    const { artworks } = useLoaderData();
    console.log(artworks);
    return (
        <section>
            <h1>Home</h1>
            <ul>
                {artworks.map((artwork) => (
                    <li key={artwork.id}>
                        <Link to={`/artwork/${artwork.id}`}>
                            <p>{artwork.title}</p>
                            {artwork.description && <p>artwork.description</p>}
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
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

Index.loader = loader;

export default Index;