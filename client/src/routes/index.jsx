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
                            <p>size: {JSON.parse(artwork.data).shapes[0].size}</p>
                            <p>pos.x: {JSON.parse(artwork.data).shapes[0].pos.x}</p>
                            <p>pos.y: {JSON.parse(artwork.data).shapes[0].pos.y}</p>
                            {artwork.description && <p>{artwork.description}</p>}
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
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

Index.loader = loader;

export default Index;