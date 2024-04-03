import PropTypes from "prop-types";
import "./SliderWrapper.css";

const SliderWrapper = ({ children }) => {
    return (
        <div className="slider__wrapper">
            {children}
        </div>
    )
}

SliderWrapper.propTypes = {
    children: PropTypes.node
};

export default SliderWrapper
