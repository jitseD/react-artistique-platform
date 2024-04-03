import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({ min, max, value, onValueChange, label }) => {
    return (
        label ? (
            <label className="slider__label" htmlFor={label}>
                {label}
                <input type="range" min={min} max={max} value={value} onChange={(e) => onValueChange(parseInt(e.target.value))} id={label} />
            </label>
        ) : (
            <input type="range" min={min} max={max} value={value} onChange={(e) => onValueChange(parseInt(e.target.value))} />
        )
    )
}

Slider.propTypes = {
    label: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default Slider
