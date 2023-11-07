import './FromToItem.css';
import { useState } from 'react';
import { CardItem, ICardItemLogic } from '../CardItem/CardItem';
import { ECardSize } from '../../enums/ECardSize';


interface IFromToItemLogic {
  main: ICardItemLogic
  alt: ICardItemLogic
};


interface IFromToItem extends IFromToItemLogic {
  timeToggled: number
};


function FromToItem({
  timeToggled,
  main,
  alt,
}: IFromToItem) {
  const [visible, setVisible] = useState(true)
  return (
    <div className="from-to-item-container-container">
      <div className={`from-to-item-container ${visible ? 'to-visible' : 'to-invisible'}`}>
        <CardItem
          itemType={main.itemType}
          id={main.id}
          onClick={() => {
            if (visible) {
              setVisible(!visible);
              setTimeout(() => setVisible(visible), timeToggled);
            }
          }}
          pointer={true}
          cardSize={ECardSize.XL}
          imgUrl={main.imgUrl}
          imgAlt={main.imgAlt}
          name={main.name}
          paragraphs={main.paragraphs}/>
      </div>
      <div className={`from-to-item-container ${visible ? 'to-invisible' : 'to-visible'}`}>
        <CardItem
          itemType={alt.itemType}
          id={alt.id}
          onClick={undefined}
          pointer={false}
          cardSize={ECardSize.XL}
          imgUrl={alt.imgUrl}
          imgAlt={alt.imgAlt}
          name={alt.name}
          paragraphs={alt.paragraphs}/>
      </div>
    </div>
  );
}


export type { IFromToItem, IFromToItemLogic };
export { FromToItem };