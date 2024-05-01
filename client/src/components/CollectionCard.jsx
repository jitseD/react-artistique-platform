import './CollectionCard.css'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import Canvas from "./Canvas";

const CollectionCard = ({ collection, showCreator, titleShort, creator }) => {
    console.log(collection.artworks.data);
    return (
        <Link to={`/collection/detail/${collection.id}`} className="collection__card">
            <div className="collection__info">
                <h3 className={`collection__title ${titleShort && `collection__title--short`}`}>{collection.title}</h3>
                {showCreator &&
                    creator.id == collection.creator.data.id ? (
                    <div className="collection__creator">
                        <RxPerson className="icon" />
                        <p>by you</p>
                    </div>
                ) : (
                    collection.creator.data && (
                        <div className="collection__creator">
                            <RxPerson className="icon" />
                            <p>{collection.creator.data.attributes.username}</p>
                        </div>
                    )
                )}
                {collection.description && <p className="collection__description--short">{collection.description}</p>}
            </div>
            <div className="collection__artworks">
                {collection.artworks && collection.artworks.data.length > 0 ? (
                    collection.artworks.data.slice(0, 3).map((artwork) => (
                        <Canvas
                            key={artwork.id}
                            id={artwork.id}
                            frame={artwork.attributes.values.frame}
                            linesPattern={artwork.attributes.values.linesPattern}
                            lines={artwork.attributes.values.lines}
                            shapes={artwork.attributes.values.shapes}
                            title={artwork.attributes.title}
                            colorMode={{ darkMode: artwork.attributes.darkMode, foreground: artwork.attributes.darkMode ? "#F2F2E6" : "#0D0D0C", background: artwork.attributes.darkMode ? "#0D0D0C" : "#F2F2E6" }}
                            styling={{
                                dropShadow: artwork.attributes.dropShadow,
                                gradient: artwork.attributes.gradient,
                                grain: artwork.attributes.grain
                            }}
                        />
                    ))
                ) : (
                    <p className="collection__artworks--empty">this collection has no artworks</p>
                )}
            </div>


        </Link>
    )
}

CollectionCard.propTypes = {
    collection: PropTypes.object.isRequired,
    showCreator: PropTypes.bool.isRequired,
    creator: PropTypes.object,
    titleShort: PropTypes.bool.isRequired,
};

export default CollectionCard;