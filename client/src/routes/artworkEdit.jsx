import { Form, redirect, useLoaderData } from "react-router-dom";
import { getArtworkById, editArtwork } from "../services/artworks";

const loader = async ({ params }) => {
    const artwork = await getArtworkById(params.id);
    return { artwork };
}

const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await editArtwork(params.id, data);
    return redirect(`/`);
};

const ArtworkEdit = () => {
    const { artwork } = useLoaderData();
    console.log(artwork);

    return (
        <section>
            <h1>Save</h1>
            {/* <Form method="post" id="artwork-form">
                <label>
                    Title
                    <input placeholder="title" type="text" name="title" defaultValue={artwork.title} />
                </label>
                <label>
                    Description
                    <textarea placeholder="description" name="description" rows={6} defaultValue={artwork.description} />
                </label>
                <label>
                    Darkmode
                    <input placeholder="darkMode" type="text" name="darkMode" defaultValue={artwork.darkMode} />
                </label>
                <label>
                    Dropshadow
                    <input placeholder="dropShadow" type="text" name="dropShadow" defaultValue={artwork.dropShadow} />
                </label>
                <label>
                    Gradient
                    <input placeholder="gradient" type="text" name="gradient" defaultValue={artwork.gradient} />
                </label>
                <label>
                    Grain
                    <input placeholder="grain" type="text" name="grain" defaultValue={artwork.grain} />
                </label>
                <label>
                    Shapes
                    <input placeholder="shapes" type="text" name="shapes" defaultValue={artwork.shapes} />
                </label>
                <label>
                    Total Lines
                    <input placeholder="linesTotal" type="number" name="linesTotal" defaultValue={artwork.linesTotal} />
                </label>
                <label>
                    Rotation Lines
                    <input placeholder="linesRotation" type="number" name="linesRotation" defaultValue={artwork.linesRotation} />
                </label>
                <label>
                    Pattern Lines
                    <input placeholder="linesPattern" type="text" name="linesPattern" defaultValue={artwork.linesPattern} />
                </label>
                <label>
                    Margin Frame
                    <input placeholder="frameMargin" type="number" name="frameMargin" defaultValue={artwork.frameMargin} />
                </label>
                <label>
                    Dashes Frame
                    <input placeholder="frameDashes" type="number" name="frameDashes" defaultValue={artwork.frameDashes} />
                </label>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
            </Form> */}
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
                <input type="text" name="data" defaultValue={artwork.data} />
                <button className="button" type="submit">Save</button>
            </Form>
        </section>
    )
}

ArtworkEdit.loader = loader;
ArtworkEdit.action = action;

export default ArtworkEdit;