import './ArtworkCard.css'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import Canvas from "./Canvas";

const ArtworkCard = ({ artwork, creator }) => {
    return (
        <Link to={`/artwork/detail/${artwork.id}`} className={`artwork__card artwork__card--${artwork.darkMode ? `dark` : `light`}`}>
            <div className="artwork__info">
                <h3 className="artwork__title--short">{artwork.title}</h3>
                {creator &&
                    <Link to={`/user/${artwork.creator.data.id}`} className="artwork__creator">
                        <RxPerson className="icon--person" />
                        <p>{artwork.creator.data.attributes.username}</p>
                    </Link>
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
    creator: PropTypes.bool.isRequired,
};

export default ArtworkCard;