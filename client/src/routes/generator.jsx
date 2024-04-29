import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { canvas } from "../context/CanvasContext";
import Canvas from "../components/Canvas";
import Chip from "../components/Chip";
import InputSection from "../components/InputSection";
import Slider from "../components/Slider";
import SliderWrapper from "../components/SliderWrapper";
import ShapeSection from "../components/ShapeSection";
import TextInput from "../components/TextInput";
import Toggle from "../components/Toggle";
import '../styles/generator.css'


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
  const rotation = Math.floor(Math.random() * 360);
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
      <h1 className="title">React Artistique</h1>
      <div className="frame">
        <Canvas
          frame={frame}
          linesPattern={linesPattern} lines={lines}
          shapes={shapes}
          title={title}
          colorMode={colorMode}
          styling={styling}
        />
      </div>
      <div className="inputs">
        <div className="intro__wrapper">
          <TextInput label="title" value={title} onValueChange={(v) => setTitle(v)} />
          <Toggle label="mode" value={colorMode.darkMode} onValueChange={handleColorModeChange} />
          <div className="chips__wrapper">
            <Chip name="drop shadow" value={styling.dropShadow} onClickChip={() => handleStylingChange("dropShadow")} />
            <Chip name="gradient" value={styling.gradient} onClickChip={() => handleStylingChange("gradient")} />
            <Chip name="grain" value={styling.grain} onClickChip={() => handleStylingChange("grain")} />
          </div>
        </div>
        <InputSection title="shapes">
          <SliderWrapper>
            {shapes.map((shape, i) => (
              <ShapeSection
                key={shape.id}
                size={shape.size} onSliderChange={(v) => handleValueChange(`shapes`, `size`, { index: i, value: v })}
                color={shape.color} onColorChange={(v) => handleValueChange(`shapes`, `color`, { index: i, value: v })}
                onReposition={(v) => handleValueChange(`shapes`, `pos`, { index: i, value: v })}
              />
            ))}
          </SliderWrapper>
        </InputSection>
        <InputSection title="lines">
          <SliderWrapper>
            <Slider min={5} max={15} value={lines.total} onValueChange={(v) => handleValueChange(`lines`, `total`, v)} label="number of lines" />
            <Slider min={0} max={180} value={lines.rotation} onValueChange={(v) => handleValueChange(`lines`, `rotation`, v)} label="rotation" />
          </SliderWrapper>
        </InputSection>
        <InputSection title="frame">
          <SliderWrapper>
            <Slider min={40} max={80} value={frame.margin} onValueChange={(v) => handleValueChange(`frame`, `margin`, v)} label="margin" />
            <Slider min={0} max={50} value={frame.dashes} onValueChange={(v) => handleValueChange(`frame`, `dashes`, v)} label="dash array" />
          </SliderWrapper>
        </InputSection>
        <Link to="/artwork/save">save artwork</Link>
      </div>
    </>
  )
}

export default App
