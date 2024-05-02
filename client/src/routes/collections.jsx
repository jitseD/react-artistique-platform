import { useEffect } from "react"
import { useLoaderData, Form, useRouteLoaderData, useNavigation, useSubmit } from "react-router-dom"
import { getCollections } from "../services/collections";
import CollectionCard from "../components/CollectionCard";

const loader = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")
    const collections = await getCollections(q);

    return { collections, q };
}

const Collections = () => {
    const { collections, q } = useLoaderData();
    const { user } = useRouteLoaderData("root");

    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <main className="main--collections">
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
            <div className="collections">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} showArtworks={true} collection={collection} creator={user} showCreator={true} titleShort={true} />
                ))}
            </div>
        </main>
    )
}

Collections.loader = loader;

export default Collections;