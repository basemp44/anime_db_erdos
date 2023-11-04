import './CardItem.css';
import React from 'react';
import EItemType from '../../enums/EItemType';
import { ECardSize } from '../../enums/ECardSize';


type Paragraphs = {
  [key: string]: string;
};


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
  cardSize: ECardSize
};


function CardItem({
  itemType,
  id,
  onClick,
  cardSize,
  imgUrl,
  imgAlt,
  name,
  paragraphs
}: ICardItem) {
  const cPointer = onClick ? 'pointer' : '';
  return (
    <div
      key={`card-item-${itemType}-${id}`}
      className={`card-item ${itemType} ${cPointer} ${cardSize}`}
      onClick={onClick}>
      <img src={imgUrl} alt={imgAlt}/>
      <p className='name'>{name}</p>
      {
        Object
          .entries(paragraphs)
          .map(([className, text]) => (<p className={className}>{text}</p>))
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