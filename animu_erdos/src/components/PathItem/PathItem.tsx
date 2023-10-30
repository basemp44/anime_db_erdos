import './PathItem.css';
import React from 'react';
import EItemType from '../../enums/EItemType';


function PathItem({
  itemType,
  id,
  index,
  imgUrl,
  imgAlt,
  text
}: {
  itemType: EItemType,
  id: number,
  index: number,
  imgUrl: string,
  imgAlt: string,
  text: string
}) {
  return (
    <div
      key={`path-${itemType}-${id}-${index}`}
      className={`path-item ${itemType}`}>
      <div className="img-container">
        <img src={imgUrl} alt={imgAlt}/>
      </div>
      <p>{text}</p>
    </div>
  );
}

export {
  PathItem
};