import React from 'react';
import newImagePalceholder from '../../../public/img/news-back.jpg'

const New = ({ _new }) => {
    const newImage = _new.urlToImage;
    return (
        <div className="col s12 m3">
            <div className="card">
                <div className="card-image">
                    <img src={!_new.urlToImage || _new.urlToImage == 'null' ? newImagePalceholder : _new.urlToImage} height="300" />
                    <span className="card-title"><a href={_new.url} target="_blank">{_new.title}</a></span>
                </div>
                <div className="card-content">
                    <p>{_new.description.substring(0, 90)}...</p>
                </div>
                <div className="card-action">
                    <a href={_new.url} target="_blank">{_new.source.name}</a>
                </div>
            </div>
        </div>
    );
}

export default New;
