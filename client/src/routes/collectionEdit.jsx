import { useState } from "react";
import { redirect, Form, Link, useRouteLoaderData, useLoaderData } from "react-router-dom"
import { editCollection, getCollectionById } from "../services/collections";
import { getArtworks } from "../services/artworks";
import { getAuthData } from "../services/auth";
import ArtworkCard from "../components/ArtworkCard";

const loader = async ({ params }) => {
    const artworks = await getArtworks();
    const {user} = getAuthData();
    const collection = await getCollectionById(params.id);
    if (!user) {
        return redirect(`${import.meta.env.BASE_URL}/collection/detail/?${params.id}`)
    }
    if (user.id != collection.creator.data.id) {
        return redirect(`${import.meta.env.BASE_URL}/collection/detail/${params.id}`)
    }
    return { artworks, collection };
}

const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.artworks = JSON.parse(data.artworks);
    await editCollection(params.id, data);
    return redirect(`${import.meta.env.BASE_URL}/collection/detail/${params.id}`);
};

const CollectionCreate = () => {
    const { artworks, collection } = useLoaderData();
    const { user } = useRouteLoaderData("root");

    const [addedArtworks, setAddedArtworks] = useState([...collection.artworks.data.map(item => item.id)]);

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
        console.log(newAddedArtworks);
    }

    return (
        <main className="main--collection--from">
            <div className="collection__form">
                <h2>Create a new collection</h2>
                <Form className="collection__form--create" method="post" id="artwork-form">
                    <label>
                        Title
                        <input type="text" name="title" defaultValue={collection.title} />
                    </label>
                    <label>
                        Description
                        <textarea name="description" rows={3} defaultValue={collection.description} />
                    </label>
                    <input type="hidden" name="artworks" defaultValue={JSON.stringify(addedArtworks)} />
                    <div className="button__wrapper">
                        <Link className="button" to={`${import.meta.env.BASE_URL}/`}>cancel</Link>
                        <button className="button button--primary" type="submit">save</button>
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