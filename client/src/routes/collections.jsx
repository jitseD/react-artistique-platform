import { useEffect } from "react"
import { useLoaderData, Form, useNavigation, useSubmit } from "react-router-dom"
import { getCollections } from "../services/collections";
import { getAuthData } from "../services/auth";
import CollectionCard from "../components/CollectionCard";

const loader = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")
    const collections = await getCollections(q);

    const creator = getAuthData().user;
    return { collections, creator , q};
}

const Collections = () => {
    const { collections,q, creator } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    console.log(collections);

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
                    <CollectionCard key={collection.id} collection={collection} creator={creator} showCreator={true} titleShort={true}/>
                ))}
            </div>
        </main>
    )
}

Collections.loader = loader;

export default Collections;