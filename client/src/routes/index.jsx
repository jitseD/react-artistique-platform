import { useEffect } from "react"
import { useLoaderData, Form, useNavigation, useSubmit } from "react-router-dom"
import { getArtworks } from "../services/artworks";
import ArtworkCard from "../components/ArtworkCard";

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

    console.log(artworks);

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
            <div className="artworks">
                {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} creator={true} />
                ))}
            </div>
        </main>
    )
}

Index.loader = loader;

export default Index;