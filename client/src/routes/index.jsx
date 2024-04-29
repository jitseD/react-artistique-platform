import { useLoaderData } from "react-router-dom"
import getArtworks from "../services/artworks";

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
                        {artwork.title}
                    </li>
                ))}
            </ul>
        </section>
    )
}

Index.loader = loader;

export default Index;