import PropTypes from "prop-types";
import { useContext } from "react";
import { canvas } from "../context/CanvasContext";
import Frame from "./Frame";
import Lines from "./Lines";
import Shape from "./Shape";

const Canvas = ({ frame, linesPattern, lines, shapes, title, colorMode, styling }) => {
    const canvasContext = useContext(canvas);

    return (
        <svg viewBox={`0 0 ${canvasContext.width} ${canvasContext.height}`}>
            <defs>
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="200" numOctaves="100" result="turbulence" />
                    <feComposite operator="in" in="turbulence" in2="SourceAlpha" result="composite" />
                    <feColorMatrix in="composite" type="luminanceToAlpha" />
                    <feBlend in="SourceGraphic" in2="composite" mode="color-burn" />
                </filter>
            </defs>
            <rect // background
                x="0" y="0" width="100%" height="100%"
                fill={colorMode.background}
            />

            {linesPattern.map(linePattern => (
                <Lines key={linePattern.id} linePattern={linePattern} lines={lines} colorMode={colorMode} />
            ))}

            {shapes.map((value) => (
                <Shape key={value.id} value={value} colorMode={colorMode} styling={styling} />
            ))}

            <Frame styling={styling} colorMode={colorMode} frame={frame} title={title} />
        </svg>
    )
}

Canvas.propTypes = {
    frame: PropTypes.object.isRequired,
    linesPattern: PropTypes.array.isRequired,
    lines: PropTypes.object.isRequired,
    shapes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    colorMode: PropTypes.object.isRequired,
    styling: PropTypes.object.isRequired,
};

export default Canvas
