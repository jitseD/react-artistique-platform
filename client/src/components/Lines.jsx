import PropTypes from "prop-types";

const Lines = ({ linePattern, lines, colorMode }) => {
    return (
        <g transform={`rotate(${lines.rotation} ${linePattern.pos.x + 10 * lines.total / 2} ${linePattern.pos.y + 100})`}>
            {Array.from({ length: lines.total }).map((_, index) => (
                <line
                    key={`${linePattern.id}-${index}`}
                    x1={(index * 10) + linePattern.pos.x} y1={linePattern.pos.y}
                    x2={(index * 10) + linePattern.pos.x} y2={linePattern.pos.y + 200}
                    stroke={colorMode.foreground} strokeWidth="2"
                />
            ))}
        </g>
    )
}

Lines.propTypes = {
    linePattern: PropTypes.object.isRequired,
    lines: PropTypes.object.isRequired,
    colorMode: PropTypes.object.isRequired,
};

export default Lines;