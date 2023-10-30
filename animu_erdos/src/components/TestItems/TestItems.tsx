import React from 'react';
import { FromToItem } from '../FromToItem/FromToItem';
import { PathItem } from '../PathItem/PathItem';
import { CardItem } from '../CardItem/CardItem';
import EItemType from '../../enums/EItemType';
import { ECardSize } from '../../enums/ECardSize';


function TestItems() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridGap:'10px'}}>
      <div>
        <PathItem
          itemType={EItemType.anime}
          id={0}
          index={0}
          imgUrl={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
          imgAlt={'img_alt'}
          text={'text1 asdkfjlsak fjklasd jfklasdj fkladsjfkljas klfjasdkfjasdlñk fjaslkf sdaklfj '}/>
        <PathItem
          itemType={EItemType.character}
          id={0}
          index={0}
          imgUrl={'https://cdn.myanimelist.net/images/characters/11/222449.webp'}
          imgAlt={'img_alt'}
          text={'text1'}/>
        <PathItem
          itemType={EItemType.voiceactor}
          id={0}
          index={0}
          imgUrl={'https://cdn.myanimelist.net/images/voiceactors/1/66163.jpg'}
          imgAlt={'img_alt'}
          text={'text1'}/>
        <PathItem
          itemType={EItemType.staff}
          id={0}
          index={0}
          imgUrl={'https://cdn.myanimelist.net/images/voiceactors/3/27061.jpg'}
          imgAlt={'img_alt'}
          text={'text1'}/>
      </div>
      <FromToItem
        timeToggled={1500}
        cardItemP1={{
          itemType: EItemType.anime,
          id: 0,
          imgUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.webp',
          imgAlt: 'img_alt',
          paragraphs: {'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}
        }}
        cardItemP2={{
          itemType: EItemType.anime,
          id: 1,
          imgUrl: 'https://cdn.myanimelist.net/images/characters/11/222449.webp',
          imgAlt: 'img_alt',
          paragraphs: {'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}
        }}
      />
      <CardItem
        itemType={EItemType.anime}
        id={0}
        onClick={() => alert('hola')}
        cardSize={ECardSize.L}
        imgUrl={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
        imgAlt={'img_alt'}
        paragraphs={{'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}}
      />
      <CardItem
        itemType={EItemType.character}
        id={0}
        onClick={undefined}
        cardSize={ECardSize.L}
        imgUrl={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
        imgAlt={'img_alt'}
        paragraphs={{'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}}
      />
      <CardItem
        itemType={EItemType.voiceactor}
        id={0}
        onClick={undefined}
        cardSize={ECardSize.L}
        imgUrl={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
        imgAlt={'img_alt'}
        paragraphs={{'favorites': 'favorites1'}}
      />
      <CardItem
        itemType={EItemType.staff}
        id={0}
        onClick={() => alert('hola')}
        cardSize={ECardSize.L}
        imgUrl={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
        imgAlt={'img_alt'}
        paragraphs={{'favorites': 'favorites1'}}
      />
    </div>
  )
}

export default TestItems