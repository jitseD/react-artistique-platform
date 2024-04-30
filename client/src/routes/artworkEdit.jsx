import { Form, redirect, useLoaderData } from "react-router-dom";
import { getArtworkById, editArtwork } from "../services/artworks";
import { getAuthData } from "../services/auth";

const loader = async ({ params }) => {
    const { user } = getAuthData();
    const artwork = await getArtworkById(params.id);
    if (!user) {
        return redirect(`/artwork/detail/${params.id}`);
    }
    if (user.id != artwork.creater.data.id) {
        return redirect(`/artwork/detail/${params.id}`);
    }
    return { artwork };
}

const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.values = JSON.parse(data.values);
    await editArtwork(params.id, data);
    return redirect(`/`);
};

const ArtworkEdit = () => {
    const { artwork } = useLoaderData();

    return (
        <section>
            <h1>Save</h1>
            <Form method="post" id="artwork-form">
                <input type="hidden" name="title" defaultValue={artwork.title} />
                <label>
                    Description
                    <textarea name="description" rows={6} defaultValue={artwork.description} />
                </label>
                <input type="text" name="darkMode" defaultValue={artwork.darkMode} />
                <input type="text" name="dropShadow" defaultValue={artwork.dropShadow} />
                <input type="text" name="gradient" defaultValue={artwork.gradient} />
                <input type="text" name="grain" defaultValue={artwork.grain} />
                <input type="text" name="values" defaultValue={JSON.stringify(artwork.values)} />
                <button className="button" type="submit">Save</button>
            </Form>
        </section>
    )
}

ArtworkEdit.loader = loader;
ArtworkEdit.action = action;

export default ArtworkEdit;