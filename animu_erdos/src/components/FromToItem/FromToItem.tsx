import './FromToItem.css';
import { useState } from 'react';
import { CardItem } from '../CardItem/CardItem';
import { ECardSize } from '../../enums/ECardSize';


function FromToItem({
  timeToggled,
  cardItemP1,
  cardItemP2,
}: {
  timeToggled: number
  cardItemP1: any
  cardItemP2: any
}) {
  const [visible, setVisible] = useState(true)
  return (
    <div className="from-to-item-container-container">
      <div className={`from-to-item-container ${visible ? 'to-visible' : 'to-invisible'}`}>
        <CardItem
          itemType={cardItemP1.itemType}
          id={cardItemP1.id}
          onClick={() => {
            if (visible) {
              setVisible(!visible);
              setTimeout(() => setVisible(visible), timeToggled);
            }
          }}
          cardSize={ECardSize.XL}
          imgUrl={cardItemP1.imgUrl}
          imgAlt={cardItemP1.imgAlt}
          paragraphs={cardItemP1.paragraphs}/>
      </div>
      <div className={`from-to-item-container ${visible ? 'to-invisible' : 'to-visible'}`}>
        <CardItem
          itemType={cardItemP2.itemType}
          id={cardItemP2.id}
          onClick={undefined}
          cardSize={ECardSize.XL}
          imgUrl={cardItemP2.imgUrl}
          imgAlt={cardItemP2.imgAlt}
          paragraphs={cardItemP2.paragraphs}/>
      </div>
    </div>
  )
}

export {
  CardItem,
  FromToItem
};