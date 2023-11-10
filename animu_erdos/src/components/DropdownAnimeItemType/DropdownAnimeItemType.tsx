import React from 'react';
import { compose, set, Lens } from 'ramda';
import { Dropdown } from '../Dropdown/Dropdown';
import EItemType from '../../enums/EItemType';


interface IDropdownAnimeItemType {
  trigger: React.ReactElement,
  setGame: Function,
  lensMain: Lens<unknown, EItemType|''>,
  lensAlt: Lens<unknown, EItemType|''>
}

function DropdownAnimeItemType({
  trigger,
  setGame,
  lensMain,
  lensAlt
}: IDropdownAnimeItemType) {
  return (
  <Dropdown
    trigger={trigger}
    menu={[
      <button onClick={() => setGame(compose(
        set(lensMain, EItemType.anime),
        set(lensAlt, '')
      ))}>
        {EItemType.anime}
      </button>,
      <button onClick={() => setGame(compose(
        set(lensMain, EItemType.character),
        set(lensAlt, EItemType.anime)
      ))}>
        {EItemType.character}
      </button>,
      <button onClick={() => setGame(compose(
        set(lensMain, EItemType.staff),
        set(lensAlt, '')
      ))}>
        {EItemType.staff}
      </button>,
      <button onClick={() => setGame(compose(
        set(lensMain, EItemType.voiceactor),
        set(lensAlt, '')
      ))}>
        {EItemType.voiceactor}
      </button>
    ]}/>
  );
}

export {
  DropdownAnimeItemType
}