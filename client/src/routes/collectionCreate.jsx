import { useState } from "react";
import { redirect, useRouteLoaderData, Form, Link, useLoaderData } from "react-router-dom"
import { createCollection } from "../services/collections";
import { getArtworks } from "../services/artworks";
import { getAuthData } from "../services/auth";
import ArtworkCard from "../components/ArtworkCard";

const loader = async ({ request }) => {
    const artworks = await getArtworks();
    const {user} = getAuthData();
    if (!user) {
        let params = new URLSearchParams();
        params.set("from", new URL(request.url).pathname);
        const searchParam = params.toString()
        return redirect(`/login?${searchParam}`)
    }
    return { artworks };
}

const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.artworks = JSON.parse(data.artworks);
    await createCollection(data);
    return redirect(`/`);
};

const CollectionCreate = () => {
    const { artworks } = useLoaderData();
    const { user } = useRouteLoaderData("root");

    const [addedArtworks, setAddedArtworks] = useState([]);

    const handleAddRemoveClick = (state, id) => {
        let newAddedArtworks = structuredClone(addedArtworks);
        if (state == "add") {
            if (!newAddedArtworks.includes(id)) {
                newAddedArtworks.push(id);
            }
        } else if (state == "remove") {
            if (newAddedArtworks.includes(id)) {
                newAddedArtworks = newAddedArtworks.filter(item => item !== id);
            }
        }
        setAddedArtworks(newAddedArtworks);
    }

    return (
        <main className="main--collection--from">
            <div className="collection__form">
                <h2>Create a new collection</h2>
                <Form className="collection__form--create" method="post" id="artwork-form">
                    <label>
                        Title
                        <input type="text" name="title" />
                    </label>
                    <label>
                        Description
                        <textarea name="description" rows={3} />
                    </label>
                    <input type="hidden" name="artworks" defaultValue={JSON.stringify(addedArtworks)} />
                    <div className="button__wrapper">
                        <Link className="button" to={`/`}>cancel</Link>
                        <button className="button button--primary" type="submit">create</button>
                    </div>
                </Form>
            </div>
            <div className="collection__artworks--create">
                {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} showCreator={true} creator={user} titleShort={true} add={true} buttonState={addedArtworks.includes(artwork.id)} onClickButton={(state, id) => handleAddRemoveClick(state, id)} />
                ))}
            </div>
        </main>
    )
}

CollectionCreate.loader = loader;
CollectionCreate.action = action;

export default CollectionCreate;