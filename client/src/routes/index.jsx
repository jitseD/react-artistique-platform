import { useLoaderData, Link } from "react-router-dom"
import { getArtworks } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async () => {
    const artworks = await getArtworks();
    return { artworks };
}

const Index = () => {
    const { artworks } = useLoaderData();

    return (
        <section>
            <h1>Home</h1>
            <ul>
                {artworks.map((artwork) => (
                    <li key={artwork.id}>
                        <Link to={`/artwork/detail/${artwork.id}`}>
                            <p>{artwork.title}</p>
                            <p>size: {artwork.values.shapes[0].size}</p>
                            <p>pos.x: {artwork.values.shapes[0].pos.x}</p>
                            <p>pos.y: {artwork.values.shapes[0].pos.y}</p>
                            {artwork.description && <p>{artwork.description}</p>}
                            <Canvas
                                id={artwork.id}
                                frame={artwork.values.frame}
                                linesPattern={artwork.values.linesPattern}
                                lines={artwork.values.lines}
                                shapes={artwork.values.shapes}
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