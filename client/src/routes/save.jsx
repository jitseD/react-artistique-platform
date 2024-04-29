// import { Form, useNavigate } from "react-router-dom";
import { Form, useNavigate, redirect } from "react-router-dom";

import { createArtwork } from "../services/artworks";

// const action = async ({ request }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     await createArtwork(data);
//     return redirect(``);
// };

const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log("formdata", data);
    await createArtwork(data);
    return redirect(`/`);
};

const Save = () => {
    const navigate = useNavigate();

    const shapes = [
        {
            "id": "shape1",
            "size": 120,
            "color": "#3a7fe4",
            "pos": {
                "x": 250,
                "y": 180
            },
            "typeCircle": true
        },
        {
            "id": "shape2",
            "size": 80,
            "color": "#ff6347",
            "pos": {
                "x": 100,
                "y": 300
            },
            "typeCircle": false
        },
        {
            "id": "shape3",
            "size": 150,
            "color": "#008000",
            "pos": {
                "x": 400,
                "y": 50
            },
            "typeCircle": true
        },
        {
            "id": "shape4",
            "size": 100,
            "color": "#ffa500",
            "pos": {
                "x": 50,
                "y": 200
            },
            "typeCircle": false
        },
        {
            "id": "shape5",
            "size": 90,
            "color": "#800080",
            "pos": {
                "x": 300,
                "y": 400
            },
            "typeCircle": true
        },
        {
            "id": "shape6",
            "size": 130,
            "color": "#ff0000",
            "pos": {
                "x": 200,
                "y": 150
            },
            "typeCircle": false
        }
    ]

    const linesPattern = [
        {
            "id": "line1",
            "pos": {
                "x": 100,
                "y": 200
            }
        },
        {
            "id": "line2",
            "pos": {
                "x": 300,
                "y": 50
            }
        },
        {
            "id": "line3",
            "pos": {
                "x": 200,
                "y": 350
            }
        }
    ]

    return (
        <section>
            <h1>Save</h1>
            <Form method="post" id="artwork-form">
                <label>
                    Title
                    <input placeholder="title" type="text" name="title" />
                </label>
                <label>
                    Description
                    <textarea placeholder="description" name="description" rows={6} />
                </label>
                <label>
                    Darkmode
                    <input placeholder="darkMode" type="text" name="darkMode" defaultValue="true" />
                </label>
                <label>
                    Dropshadow
                    <input placeholder="dropShadow" type="text" name="dropShadow" defaultValue="true" />
                </label>
                <label>
                    Gradient
                    <input placeholder="gradient" type="text" name="gradient" defaultValue="true" />
                </label>
                <label>
                    Grain
                    <input placeholder="grain" type="text" name="grain" defaultValue="true" />
                </label>
                <label>
                    Shapes
                    <input placeholder="shapes" type="text" name="shapes" defaultValue={JSON.stringify(shapes)} />
                </label>
                <label>
                    Total Lines
                    <input placeholder="linesTotal" type="number" name="linesTotal" defaultValue={10} />
                </label>
                <label>
                    Rotation Lines
                    <input placeholder="linesRotation" type="number" name="linesRotation" defaultValue={90} />
                </label>
                <label>
                    Pattern Lines
                    <input placeholder="linesPattern" type="text" name="linesPattern" defaultValue={JSON.stringify(linesPattern)} />
                </label>
                <label>
                    Margin Frame
                    <input placeholder="frameMargin" type="number" name="frameMargin" defaultValue={50} />
                </label>
                <label>
                    Dashes Frame
                    <input placeholder="frameDashes" type="number" name="frameDashes" defaultValue={25} />
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
            </Form>
        </section>
    )
}

Save.action = action;

export default Save;