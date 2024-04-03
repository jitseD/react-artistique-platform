import PropTypes from "prop-types";
import { useContext, useRef, useEffect } from "react";
import { canvas } from "../context/CanvasContext";

const Frame = ({ styling, colorMode, frame, title }) => {
    const { width, height } = useContext(canvas);
    const textRef = useRef(null);
    const textBoxRef = useRef(null);

    useEffect(() => {
        const textBBox = textRef.current.getBBox();
        const textBoxAttributes = {
            x: width - frame.margin - textBBox.width - 10,
            y: height - frame.margin / 2 - textBBox.height / 2 - 5,
            width: textBBox.width + 20,
            height: textBBox.height + 10
        }
        Object.entries(textBoxAttributes).forEach(([attribute, value]) => {
            textBoxRef.current.setAttribute(attribute, value);
        })
    }, [width, height, frame, title]);

    return (
        <>
            <rect // frame
                className={`${styling.dropShadow ? colorMode.darkMode ? 'shadow__frame--darkmode' : 'shadow__frame' : ``}`}
                x={0 + frame.margin / 2} y={0 + frame.margin / 2} width={width - frame.margin} height={height - frame.margin}
                fill="none"
                stroke={colorMode.background} strokeWidth={frame.margin}
            />
            <rect // dash
                x={frame.margin / 2} y={frame.margin / 2} width={width - frame.margin} height={height - frame.margin}
                fill="none"
                stroke={colorMode.foreground} strokeWidth="2" strokeDasharray={frame.dashes}
                rx="5"
            />

            <rect ref={textBoxRef} fill={colorMode.background} />
            <text
                ref={textRef}
                fontSize={frame.margin / 2} fontFamily="Arial, Helvetica, sans-serif"
                textAnchor="end" dominantBaseline="middle"
                x={width - frame.margin} y={height - frame.margin / 2}
                fill={colorMode.foreground}
            >{title}</text>
        </>
    )
}

Frame.propTypes = {
    styling: PropTypes.object.isRequired,
    colorMode: PropTypes.object.isRequired,
    frame: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};


export default Frame