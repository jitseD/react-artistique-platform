import PropTypes from "prop-types";
import "./ColorPicker.css"

const ColorPicker = ({ value, onValueChange }) => {
    return (
        <input type="color" value={value} onChange={(e) => onValueChange(e.target.value)} />
    )
}

ColorPicker.propTypes = {
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default ColorPicker
