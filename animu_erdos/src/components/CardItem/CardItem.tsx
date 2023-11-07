import './CardItem.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleUp } from '@fortawesome/free-regular-svg-icons';
import EItemType from '../../enums/EItemType';
import { ECardSize } from '../../enums/ECardSize';
import { EAnimeStatus, mapAnimeStatus } from '../../enums/EAnimeStatus';


type Paragraphs = {
  [key: string]: string;
};


enum EParagraph {
  status = 'status',
  rank = 'rank',
  scored_by = 'scored_by',
  favorites = 'favorites',
}


interface ICardItemLogicMin {
  id: number,
  itemType: EItemType
};


interface ICardItemLogicBase extends ICardItemLogicMin {
  imgUrl: string,
  imgAlt: string,
  name: string
};


interface ICardItemLogic extends ICardItemLogicBase {
  paragraphs: Paragraphs
};


interface ICardItemLogicRel extends ICardItemLogic {
  relations: Array<ICardItemLogicMin>
}


interface ICardItem extends ICardItemLogic {
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
  cardSize: ECardSize,
  pointer: boolean
};


function formatParagraph(
  mainKey: string
) {
  return ([className, text]: [string, string]) => {
    switch(className) {
      case EParagraph.status:
        const color = mapAnimeStatus[text as EAnimeStatus]
        return (
          <p
            key={`${mainKey}-${className}`}
            className={`${className} ${color}`}>
            <FontAwesomeIcon icon={faCircleUp}/>
          </p>
        );
      case EParagraph.rank:
        return (
          <p
            key={`${mainKey}-${className}`}
            className={className}>
            {text}
          </p>
        );
      case EParagraph.scored_by:
        return (
          <p
            key={`${mainKey}-${className}`}
            className={className.split('_').join('-')}>
            <FontAwesomeIcon icon={faStar}/>
            {text}
          </p>
        );
      case EParagraph.favorites:
        return (
          <p
            key={`${mainKey}-${className}`}
            className={className}>
            <FontAwesomeIcon icon={faStar}/>
            {text}
          </p>
        );
    }
  }
}

function CardItem({
  itemType,
  id,
  onClick,
  pointer,
  cardSize,
  imgUrl,
  imgAlt,
  name,
  paragraphs
}: ICardItem) {
  const cPointer = pointer ? 'pointer' : '';
  return (
    <div
      className={`card-item ${itemType} ${cPointer} ${cardSize}`}
      onClick={onClick}>
      <img src={imgUrl} alt={imgAlt}/>
      <p className='name'>{name}</p>
      {
        Object
          .entries(paragraphs)
          .map(formatParagraph(`card-item-${itemType}-${id}`
          ))
      }
    </div>
  );
}


export type {
  ICardItemLogicMin,
  ICardItemLogicBase,
  ICardItemLogic,
  ICardItem,
  ICardItemLogicRel
};

export { CardItem };