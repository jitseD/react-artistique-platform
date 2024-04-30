import { useState } from "react"
import { Form, redirect, useLoaderData } from "react-router-dom";
import { getArtworkById, editArtwork } from "../services/artworks";
import { getAuthData } from "../services/auth";
import Inputs from "../components/Inputs";
import Canvas from "../components/Canvas";

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

    const [colorMode, setColorMode] = useState({ darkMode: artwork.darkMode, foreground: artwork.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.darkMode ? "#0D0D0C" : "#F2F2E6" });
    const [title, setTitle] = useState(artwork.title);
    const [frame, setFrame] = useState(artwork.values.frame);
    const [styling, setStyling] = useState({ dropShadow: artwork.dropShadow, gradient: artwork.gradient, grain: artwork.grain });
    const [lines, setLines] = useState(artwork.values.lines);
    const [linesPattern] = useState(artwork.values.linesPattern);
    const [shapes, setShapes] = useState(artwork.values.shapes);

    const handleColorModeChange = () => {
        const newColorMode = structuredClone(colorMode);
        newColorMode.darkMode = !colorMode.darkMode
        if (newColorMode.darkMode) {
            newColorMode.foreground = "#F2F2E6";
            newColorMode.background = "#0D0D0C";
        } else {
            newColorMode.foreground = "#0D0D0C";
            newColorMode.background = "#F2F2E6";
        }
        setColorMode(newColorMode)
    }

    document.documentElement.style.setProperty('--c-fg', colorMode.foreground);
    document.documentElement.style.setProperty('--c-bg', colorMode.background);

    const handleStylingChange = (property) => {
        const newStyling = structuredClone(styling);
        newStyling[property] = !styling[property]
        setStyling(newStyling)
    }

    const handleValueChange = (type, property, value) => {
        switch (type) {
            case `shapes`:
                setShapes(shapes.map((shape, i) => (i === value.index ? { ...shape, [property]: value.value } : shape)));
                break;
            case `lines`:
                setLines({ ...lines, [property]: value });
                break;
            case `frame`:
                setFrame({ ...frame, [property]: value });
                break;
            default: break;
        }
    }

    return (
        <>
            <div className="frame">
                <Canvas
                    id={artwork.id}
                    frame={frame}
                    linesPattern={linesPattern}
                    lines={lines}
                    shapes={shapes}
                    title={title}
                    colorMode={colorMode}
                    styling={styling}
                />
            </div>
            <div className="inputs">
                <Inputs
                    title={title} onTitleChange={(v) => setTitle(v)}
                    colorMode={colorMode} onColorModeChange={handleColorModeChange}
                    styling={styling} onDropShadowChange={() => handleStylingChange("dropShadow")} onGradientChange={() => handleStylingChange("gradient")} onGrainChange={() => handleStylingChange("grain")}
                    shapes={shapes} onSizeChange={(v, i) => handleValueChange(`shapes`, `size`, { index: i, value: v })} onColorChange={(v, i) => handleValueChange(`shapes`, `color`, { index: i, value: v })} onRepositionChange={(v, i) => handleValueChange(`shapes`, `pos`, { index: i, value: v })}
                    lines={lines} onTotalChange={(v) => handleValueChange(`lines`, `total`, v)} onRotationChange={(v) => handleValueChange(`lines`, `rotation`, v)}
                    frame={frame} onMarginChange={(v) => handleValueChange(`frame`, `margin`, v)} onDashesChange={(v) => handleValueChange(`frame`, `dashes`, v)}
                />
                <Form method="post" id="artwork-form">
                    <input type="hidden" name="title" value={title} />
                    <label>
                        Description
                        <textarea name="description" rows={6} defaultValue={artwork.description} />
                    </label>
                    <input type="hidden" name="darkMode" value={colorMode.darkMode} />
                    <input type="hidden" name="dropShadow" value={styling.dropShadow} />
                    <input type="hidden" name="gradient" value={styling.gradient} />
                    <input type="hidden" name="grain" value={styling.grain} />
                    <input type="hidden" name="values" value={JSON.stringify({ shapes: shapes, lines: lines, linesPattern: linesPattern, frame: frame })} />
                    <button className="button" type="submit">create</button>
                </Form>
            </div>
        </>
    )
}

ArtworkEdit.loader = loader;
ArtworkEdit.action = action;

export default ArtworkEdit;