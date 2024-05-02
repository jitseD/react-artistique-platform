import { useEffect } from "react"
import { useLoaderData, Form, useNavigation, useSubmit } from "react-router-dom"
import { getArtworks } from "../services/artworks";
import { getAuthData } from "../services/auth";
import ArtworkCard from "../components/ArtworkCard";

const loader = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")
    const artworks = await getArtworks(q);
    const loggedInUser = getAuthData().user;
    return { artworks, q, loggedInUser };
}

const Artworks = () => {
    const { artworks, q, loggedInUser } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    console.log(loggedInUser);

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <main className="main--artworks">
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
                    <ArtworkCard key={artwork.id} artwork={artwork} creator={loggedInUser} showCreator={true} titleShort={true} />
                ))}
            </div>
        </main>
    )
}

Artworks.loader = loader;

export default Artworks;