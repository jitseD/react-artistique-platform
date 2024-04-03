import PropTypes from "prop-types";
import "./Toggle.css";

const Toggle = ({ label, value, onValueChange }) => {
    return (
        <label className="toggle__label" htmlFor={label}>
            <input type="checkbox" id={label} checked={value} onChange={onValueChange} />
            <div className="toggle"></div>
        </label>
    )
}

Toggle.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default Toggle
