import { useState, useContext } from "react";
import { Form, redirect, useLoaderData, Link } from "react-router-dom";
import { canvas } from "../context/CanvasContext";
import { getAuthData } from "../services/auth";
import Canvas from "../components/Canvas";
import Inputs from "../components/Inputs";
import '../styles/generator.css'

import { createArtwork } from "../services/artworks";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  let loggedIn;
  if (!user) {
    loggedIn = false;
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    const searchParam = params.toString()
    return { loggedIn, searchParam }
  }
  loggedIn = true
  return { loggedIn, searchParam: null };
};

const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.values = JSON.parse(data.values);
  await createArtwork(data);
  return redirect(`/`);
};

const generateRandomBool = () => {
  return Math.random() < 0.5
}

const generateRandomFrame = () => {
  const margin = Math.floor(Math.random() * 40) + 40;
  const dashes = Math.floor(Math.random() * 50);
  return { margin, dashes }
}

const generateRandomLines = () => {
  const total = Math.floor(Math.random() * 10) + 5;
  const rotation = Math.floor(Math.random() * 180);
  return { total, rotation };
}

const generateRandomLinePattern = (id, canvasContext, margin) => {
  const randomX = Math.floor(Math.random() * canvasContext.width + margin) - margin * 2;
  const randomY = Math.floor(Math.random() * canvasContext.height + margin) - margin * 2;

  return { id, pos: { x: randomX, y: randomY } };
}

const generateRandomShape = (id, canvasContext, margin) => {
  const randomSize = Math.floor(Math.random() * 150) + 50;
  const randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`;
  const randomX = Math.floor(Math.random() * canvasContext.width + margin) - margin * 2;
  const randomY = Math.floor(Math.random() * canvasContext.height + margin) - margin * 2;
  const randomTypeCircle = generateRandomBool();

  return { id, size: randomSize, color: randomColor, pos: { x: randomX, y: randomY }, typeCircle: randomTypeCircle };
}

const App = () => {
  const canvasContext = useContext(canvas);
  const [colorMode, setColorMode] = useState({ darkMode: false, foreground: "#0D0D0C", background: "#F2F2E6" });
  const [title, setTitle] = useState("React Artistique");
  const [frame, setFrame] = useState(generateRandomFrame());
  const [styling, setStyling] = useState({
    dropShadow: generateRandomBool(),
    gradient: generateRandomBool(),
    grain: generateRandomBool()
  });
  const [lines, setLines] = useState(generateRandomLines());
  const [linesPattern] = useState([
    generateRandomLinePattern("line1", canvasContext, frame.margin),
    generateRandomLinePattern("line2", canvasContext, frame.margin),
    generateRandomLinePattern("line3", canvasContext, frame.margin),
  ]);
  const [shapes, setShapes] = useState([
    generateRandomShape("shape1", canvasContext, frame.margin),
    generateRandomShape("shape2", canvasContext, frame.margin),
    generateRandomShape("shape3", canvasContext, frame.margin),
    generateRandomShape("shape4", canvasContext, frame.margin),
    generateRandomShape("shape5", canvasContext, frame.margin),
    generateRandomShape("shape6", canvasContext, frame.margin),
  ]);

  document.documentElement.style.setProperty('--c-fg', colorMode.foreground);
  document.documentElement.style.setProperty('--c-bg', colorMode.background);

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

  const { loggedIn, searchParam } = useLoaderData();
  const [formVisible, setFormVisible] = useState(false);

  return (
    <main className="main--generator">
      <h1 className="title">React Artistique</h1>
      <div className="frame">
        <Canvas
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
        {!formVisible ? (
          <>
            <Inputs
              title={title} onTitleChange={(v) => setTitle(v)}
              colorMode={colorMode} onColorModeChange={handleColorModeChange}
              styling={styling} onDropShadowChange={() => handleStylingChange("dropShadow")} onGradientChange={() => handleStylingChange("gradient")} onGrainChange={() => handleStylingChange("grain")}
              shapes={shapes} onSizeChange={(v, i) => handleValueChange(`shapes`, `size`, { index: i, value: v })} onColorChange={(v, i) => handleValueChange(`shapes`, `color`, { index: i, value: v })} onRepositionChange={(v, i) => handleValueChange(`shapes`, `pos`, { index: i, value: v })}
              lines={lines} onTotalChange={(v) => handleValueChange(`lines`, `total`, v)} onRotationChange={(v) => handleValueChange(`lines`, `rotation`, v)}
              frame={frame} onMarginChange={(v) => handleValueChange(`frame`, `margin`, v)} onDashesChange={(v) => handleValueChange(`frame`, `dashes`, v)}
            />
            {loggedIn ? (
              <button className="button button--primary" type="button" onClick={() => setFormVisible(true)} >create</button>
            ) : (
              <p>Want to save this artwork? <Link to={`/login?${searchParam}`}>Log in</Link> first</p>
            )}
          </>
        ) : (
          <Form method="post" id="artwork-form">
            <label>
              Title
              <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              Description
              <textarea name="description" rows={3} />
            </label>
            <input type="hidden" name="darkMode" value={colorMode.darkMode} />
            <input type="hidden" name="dropShadow" value={styling.dropShadow} />
            <input type="hidden" name="gradient" value={styling.gradient} />
            <input type="hidden" name="grain" value={styling.grain} />
            <input type="hidden" name="values" value={JSON.stringify({ shapes: shapes, lines: lines, linesPattern: linesPattern, frame: frame })} />
            <div className="button__wrapper">
              <button className="button" type="button" onClick={() => setFormVisible(false)}>cancel</button>
              <button className="button button--primary" type="submit">create</button>
            </div>
          </Form>
        )}
      </div>
    </main>
  )
}

App.loader = loader;
App.action = action;

export default App
