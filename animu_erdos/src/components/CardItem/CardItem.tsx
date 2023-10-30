import './CardItem.css';
import React from 'react';
import EItemType from '../../enums/EItemType';
import { ECardSize } from '../../enums/ECardSize';

type Paragraphs = {
  [key: string]: string;
};


function CardItem({
  itemType,
  id,
  onClick,
  cardSize,
  imgUrl,
  imgAlt,
  paragraphs
}: {
  itemType: EItemType,
  id: number,
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
  cardSize: ECardSize,
  imgUrl: string,
  imgAlt: string,
  paragraphs: Paragraphs
}) {
  const cPointer = onClick ? 'pointer' : '';
  return (
    <div
      key={`card-item-${itemType}-${id}`}
      className={`card-item ${itemType} ${cPointer} ${cardSize}`}
      onClick={onClick}>
      <img src={imgUrl} alt={imgAlt}/>
      {
        Object
          .entries(paragraphs)
          .map(([className, text]) => (<p className={className}>{text}</p>))
      }
    </div>
  );
}

export {
  CardItem
};