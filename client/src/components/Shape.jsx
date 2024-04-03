import PropTypes from "prop-types";
import "./Shape.css"

const Shape = ({ value, colorMode, styling }) => {
    const gradientId = `gradient-${value.id}`;
    const fadeId = `fade-${value.id}`;

    return (
        <>
            <defs>
                {value.typeCircle ? (
                    <circle
                        id={value.id}
                        cx={value.pos.x} cy={value.pos.y} r={value.size}
                    />
                ) : (
                    <rect
                        id={value.id}
                        x={value.pos.x} y={value.pos.y} width={value.size * 1.5} height={value.size * 2}
                    />
                )}
                <mask id={gradientId}>
                    <radialGradient id={fadeId} r="100%" fx="100%" fy="0%">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </radialGradient>
                    <use href={`#${value.id}`} fill={`url(#${fadeId})`} />
                </mask>
            </defs>

            {styling.dropShadow &&
                <use // drop shadow
                    href={`#${value.id}`} className="shadow__shape"
                    x="-10" y="10"
                    fill={colorMode.foreground}
                />
            }
            <use
                href={`#${value.id}`}
                fill={value.color}
                filter={styling.grain ? `url(#noise)` : ``}
            />
            {styling.gradient &&
                <use // gradient
                    href={`#${value.id}`}
                    fill={`url(#${fadeId})`} opacity="0.5"
                />
            }
        </>
    );
}

Shape.propTypes = {
    value: PropTypes.object.isRequired,
    colorMode: PropTypes.object.isRequired,
    styling: PropTypes.object.isRequired,
};

export default Shape