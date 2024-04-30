import PropTypes from "prop-types";
import TextInput from "./TextInput";
import Toggle from "./Toggle";
import Chip from "./Chip";
import InputSection from "./InputSection";
import SliderWrapper from "./SliderWrapper";
import ShapeSection from "./ShapeSection";
import Slider from "./Slider";

const Inputs = ({
    title, onTitleChange,
    colorMode, onColorModeChange,
    styling, onDropShadowChange, onGradientChange, onGrainChange,
    shapes, onSizeChange, onColorChange, onRepositionChange,
    lines, onTotalChange, onRotationChange,
    frame, onMarginChange, onDashesChange
}) => {
    return (
        <>
            <div className="intro__wrapper">
                <TextInput label="title" value={title} onValueChange={onTitleChange} />
                <Toggle label="mode" value={colorMode.darkMode} onValueChange={onColorModeChange} />
                <div className="chips__wrapper">
                    <Chip name="drop shadow" value={styling.dropShadow} onClickChip={onDropShadowChange} />
                    <Chip name="gradient" value={styling.gradient} onClickChip={onGradientChange} />
                    <Chip name="grain" value={styling.grain} onClickChip={onGrainChange} />
                </div>
            </div>
            <InputSection title="shapes">
                <SliderWrapper>
                    {shapes.map((shape, i) => (
                        <ShapeSection
                            key={shape.id}
                            size={shape.size} onSliderChange={(v) => onSizeChange(v, i)}
                            color={shape.color} onColorChange={(v) => onColorChange(v, i)}
                            onReposition={(v) => onRepositionChange(v, i)}
                        />
                    ))}
                </SliderWrapper>
            </InputSection>
            <InputSection title="lines">
                <SliderWrapper>
                    <Slider min={5} max={15} value={lines.total} onValueChange={onTotalChange} label="number of lines" />
                    <Slider min={0} max={180} value={lines.rotation} onValueChange={onRotationChange} label="rotation" />
                </SliderWrapper>
            </InputSection>
            <InputSection title="frame">
                <SliderWrapper>
                    <Slider min={40} max={80} value={frame.margin} onValueChange={onMarginChange} label="margin" />
                    <Slider min={0} max={50} value={frame.dashes} onValueChange={onDashesChange} label="dash array" />
                </SliderWrapper>
            </InputSection>
        </>
    )
}


Inputs.propTypes = {
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    colorMode: PropTypes.object.isRequired,
    onColorModeChange: PropTypes.func.isRequired,
    styling: PropTypes.object.isRequired,
    onDropShadowChange: PropTypes.func.isRequired,
    onGradientChange: PropTypes.func.isRequired,
    onGrainChange: PropTypes.func.isRequired,
    shapes: PropTypes.array.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onRepositionChange: PropTypes.func.isRequired,
    lines: PropTypes.object.isRequired,
    onTotalChange: PropTypes.func.isRequired,
    onRotationChange: PropTypes.func.isRequired,
    frame: PropTypes.object.isRequired,
    onMarginChange: PropTypes.func.isRequired,
    onDashesChange: PropTypes.func.isRequired,
};

export default Inputs;