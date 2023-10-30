import './FromToItem.css';
import { useState } from 'react';
import EItemType from '../../enums/EItemType';


type Paragraphs = {
  [key: string]: string;
};


function FromToItemSingle({
  itemType,
  id,
  visible,
  pointer,
  img_url,
  img_alt,
  paragraphs
}: {
  itemType: EItemType,
  id: number,
  visible: boolean,
  pointer: boolean,
  img_url: string,
  img_alt: string,
  paragraphs: Paragraphs
}) {
  const cVisible = visible ? 'to-visible' : 'to-invisible';
  const cPointer = pointer ? 'pointer' : '';

  return (
    <div
      key={`fromto-${itemType}-${id}`}
      className={`from-to-item ${itemType} ${cVisible} ${cPointer}`}>
      <img
        src={img_url}
        alt={img_alt}/>
        {
          Object
            .entries(paragraphs)
            .map(([className, text]) => (<p className={className}>{text}</p>))
        }
    </div>
  );
}


function FromToItem({
  timeToggled,
  fromToItemP1,
  fromToItemP2,
}: {
  timeToggled: number
  fromToItemP1: any
  fromToItemP2: any
}) {
  const [fromToVisible, setFromToVisible] = useState(true)
  return (
    <div
      className="from-to-item-container-container"
      onClick={() => {
        if (fromToVisible) {
          setFromToVisible(!fromToVisible);
          setTimeout(() => setFromToVisible(fromToVisible), timeToggled);
        }
      }}>
      <div className='from-to-item-container'>
        <FromToItemSingle
          itemType={fromToItemP1.itemType}
          id={fromToItemP1.id}
          visible={fromToVisible}
          pointer={true}
          img_url={fromToItemP1.img_url}
          img_alt={fromToItemP1.img_alt}
          paragraphs={fromToItemP1.paragraphs}/>
      </div>
      <div className='from-to-item-container'>
        <FromToItemSingle
          itemType={fromToItemP2.itemType}
          id={fromToItemP2.id}
          visible={!fromToVisible}
          pointer={false}
          img_url={fromToItemP2.img_url}
          img_alt={fromToItemP2.img_alt}
          paragraphs={fromToItemP2.paragraphs}/>
      </div>
    </div>
  )
}

export {
  FromToItemSingle,
  FromToItem
};