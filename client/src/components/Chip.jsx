import PropTypes from "prop-types";
import "./Chip.css"

const Chip = ({ name, value, onClickChip }) => {
    return (
        <p className={`chip ${value ? `chip--active` : `chip--inactive`}`} onClick={onClickChip}>{name}</p>
    )
}

Chip.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onClickChip: PropTypes.func.isRequired,
};

export default Chip