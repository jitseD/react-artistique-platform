import PropTypes from "prop-types";
import "./TextInput.css";

const TextInput = ({ label, value, onValueChange }) => {
    return (
        <input type="text" placeholder={label} value={value} onChange={(e) => onValueChange(e.target.value)} />
    )
}

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onValueChange: PropTypes.func.isRequired,
};

export default TextInput
