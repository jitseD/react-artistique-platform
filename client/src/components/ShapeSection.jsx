import PropTypes from "prop-types";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import Slider from "./Slider";
import "./ShapeSection.css";

const ShapeSection = ({ size, onSliderChange, color, onColorChange, onReposition }) => {
    return (
        <article>
            <Slider min={50} max={200} value={size} onValueChange={onSliderChange} />
            <Button name="reposition" onClickButton={onReposition} />
            <ColorPicker value={color} onValueChange={onColorChange} />
        </article>
    )
}

ShapeSection.propTypes = {
    size: PropTypes.number.isRequired,
    onSliderChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onReposition: PropTypes.func.isRequired,
};


export default ShapeSection
