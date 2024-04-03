import PropTypes from "prop-types";
import { useContext } from "react";
import { canvas } from "../context/CanvasContext";
import "./Button.css";

const Button = ({ name, onClickButton }) => {
    const canvasContext = useContext(canvas);

    const handleButtonClick = () => {
        const pos = { x: Math.random() * canvasContext.width, y: Math.random() * canvasContext.height }
        onClickButton(pos)
    }

    return (
        <button onClick={handleButtonClick}>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClickButton: PropTypes.func.isRequired
};

export default Button
