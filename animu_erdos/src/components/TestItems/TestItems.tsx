import React from 'react';
import { FromToItem } from '../FromToItem/FromToItem';
import EItemType from '../../enums/EItemType';


function TestItems() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridGap:'10px'}}>
      <FromToItem
        timeToggled={1500}
        fromToItemP1={{
          itemType: EItemType.anime,
          id: 0,
          img_url: 'https://cdn.myanimelist.net/images/anime/10/47347.webp',
          img_alt: 'img_alt',
          paragraphs: {'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}
        }}
        fromToItemP2={{
          itemType: EItemType.anime,
          id: 1,
          img_url: 'https://cdn.myanimelist.net/images/characters/11/222449.webp',
          img_alt: 'img_alt',
          paragraphs: {'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}
        }}
      />
      {/* <FromToItem
        itemType={EItemType.anime}
        id={0}
        index={0}
        onClick={undefined}
        img_url={'https://cdn.myanimelist.net/images/anime/10/47347.webp'}
        img_alt={'img_alt'}
        paragraphs={{'title': 'title1', 'scored-by': 'scoredby', 'status red': '⬤', 'rank': '#110'}}/>
      <FromToItem
        itemType={EItemType.character}
        id={0}
        index={0}
        onClick={undefined}
        img_url={'https://cdn.myanimelist.net/images/characters/11/222449.webp'}
        img_alt={'img_alt'}
        paragraphs={{'title': 'hola', 'favorites': '74084★'}}/>
      <FromToItem
        itemType={EItemType.voiceactor}
        id={0}
        index={0}
        onClick={undefined}
        img_url={'https://cdn.myanimelist.net/images/voiceactors/1/66163.jpg'}
        img_alt={'img_alt'}
        paragraphs={{'name': 'name1', 'favorites': 'favorites1'}}/>
      <FromToItem
        itemType={EItemType.staff}
        id={0}
        index={0}
        onClick={() => alert('test')}
        img_url={'https://cdn.myanimelist.net/images/voiceactors/3/27061.jpg'}
        img_alt={'img_alt'}
        paragraphs={{'name': 'name1'}}/> */}
    </div>
  )
}

export default TestItems