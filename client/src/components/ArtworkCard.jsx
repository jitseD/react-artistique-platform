import './ArtworkCard.css'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import Canvas from "./Canvas";

const ArtworkCard = ({ artwork, showCreator, titleShort, creator }) => {
    return (
        <Link to={`/artwork/detail/${artwork.id}`} className={`artwork__card artwork__card--${artwork.darkMode ? `dark` : `light`}`}>
            <div className="artwork__info">
                <h3 className={`artwork__title ${titleShort && `artwork__title--short`}`}>{artwork.title}</h3>
                {showCreator ? (
                    creator.id === artwork.creator.data.id ? (
                        <div className="artwork__creator">
                            <RxPerson className="icon" />
                            <p>by you</p>
                        </div>
                    ) : (
                        <div className="artwork__creator">
                            <RxPerson className="icon" />
                            <p>{artwork.creator.data.attributes.username}</p>
                        </div>
                    )) : (``)
                }
                {artwork.description && <p className="artwork__description--short">{artwork.description}</p>}
            </div>
            <Canvas
                id={artwork.id}
                frame={artwork.values.frame}
                linesPattern={artwork.values.linesPattern}
                lines={artwork.values.lines}
                shapes={artwork.values.shapes}
                title={artwork.title}
                colorMode={{ darkMode: artwork.darkMode, foreground: artwork.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.darkMode ? "#0D0D0C" : "#F2F2E6" }}
                styling={{
                    dropShadow: artwork.dropShadow,
                    gradient: artwork.gradient,
                    grain: artwork.grain
                }}
            />
        </Link>
    )
}

ArtworkCard.propTypes = {
    artwork: PropTypes.object.isRequired,
    showCreator: PropTypes.bool.isRequired,
    creator: PropTypes.object,
    titleShort: PropTypes.bool.isRequired,
};

export default ArtworkCard;