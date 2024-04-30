import PropTypes from "prop-types";

const ErrorField = ({ data, field }) => {
    if (data && data.error?.[field]) {
        return <p>{data.error[field]}</p>;
    }
    return null;
};

ErrorField.propTypes = {
    data: PropTypes.object,
    field: PropTypes.string.isRequired,
};

export default ErrorField;