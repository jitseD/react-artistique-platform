import { useEffect } from "react"
import { useLoaderData, Link, Form, useNavigation, useSubmit } from "react-router-dom"
import { getArtworks } from "../services/artworks";
import Canvas from "../components/Canvas";

const loader = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")
    const artworks = await getArtworks(q);
    return { artworks, q };
}

const Index = () => {
    const { artworks, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <main className="main--index">
            <Form className="filters" id="search-form" role="search">
                <input
                    id="q" type="search" name="q"
                    placeholder="search" defaultValue={q}
                    className={searching ? "loading" : ""}
                    onChange={(event) => {
                        const isFirstSearch = q == null;
                        submit(event.currentTarget.form, {
                            replace: !isFirstSearch,
                        });
                    }}
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <ul className="artworks">
                {artworks.map((artwork) => (
                    <li key={artwork.id}>
                        <Link to={`/artwork/detail/${artwork.id}`}>
                            <p>{artwork.title}</p>
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
        </main>
    )
}

Index.loader = loader;

export default Index;