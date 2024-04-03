import PropTypes from "prop-types";
import "./InputSection.css";

const InputSection = ({ title, children }) => {
    return (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

InputSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default InputSection
