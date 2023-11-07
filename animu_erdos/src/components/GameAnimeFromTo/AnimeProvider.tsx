import { EGameStatus } from '../../enums/EGameStatus';
import EItemType from '../../enums/EItemType';
import { ICardItemLogic, ICardItemLogicMin } from '../CardItem/CardItem';
import { IPathItemLogic } from '../PathItem/PathItem';
import { AnimeApi } from './AnimeApi';
import { AnimeDexie } from './AnimeDexie';
import { IGameAnimeGameParams, IGameConfig } from './IGameAnimeFromTo';


class AnimeProvider {
  animeDx: AnimeDexie;
  animeApi: AnimeApi;
  config: IGameConfig;
  dbReady: boolean;


  constructor(
    config: IGameConfig
  ) {
    this.config = config;
    this.animeDx = new AnimeDexie();
    this.animeApi = new AnimeApi(config.api);
    this.dbReady = true;
  }
  
  
  async initGame() {
    this.dbReady = false;
    if ((await this.animeDx.shouldRecreateADX(this.config.version))) {
      await this.animeDx.recreateADX();
      const data = await this.animeApi.bulkGetApi();
      await this.animeDx.bulkInsertADX(data);
      debugger
      await this.animeDx.setVersionADX(this.config.version);
      debugger
    }
    this.dbReady = true;
  }


  async _getVersus(
    target_from_main: EItemType,
    target_to_main: EItemType,
  ) {
    try {
      return await this.animeApi.getVersus(
        target_from_main,
        target_to_main
      );
    } catch {
      return await this.animeDx.getVersus(
        target_from_main,
        target_to_main
      )

    }
  }


  _getFromToItem() {
    return this.dbReady ?
      this.animeDx.getFromToItemADX.bind(this.animeDx) :
      this.animeApi.getCardItemAltApi.bind(this.animeApi);
  }


  _getChoices() {
    return this.dbReady ?
      this.animeDx.getChoicesADX.bind(this.animeDx) :
      this.animeApi.getChoicesApi.bind(this.animeApi);
  }


  async _pickItemChoice(
    choice: ICardItemLogic,
    path: Array<IPathItemLogic>,
    gameParams: IGameAnimeGameParams
  ) {
    const {paragraphs:_, ...pathItem} = choice;

    const choices = await this._getChoices()(
      choice.id,
      choice.itemType,
      gameParams.choice_options
    );

    return {
      path: [...path, pathItem as IPathItemLogic],
      choices
    };
  }


  async startNewGame(
    gameParams: IGameAnimeGameParams
  ) {
    const [from, to]: Array<ICardItemLogicMin> = await this._getVersus(
      gameParams.target_from_main,
      gameParams.target_to_main
    );

    const [card_from, card_from_alt] = await this._getFromToItem()(
      from.id,
      from.itemType,
      gameParams.target_from_alt
    );
    
    const [card_to, card_to_alt] = await this._getFromToItem()(
      to.id,
      to.itemType,
      gameParams.target_to_alt
    );
    
    const partPathChoices = await this._pickItemChoice(
      card_from,
      [],
      gameParams
    );

    return {
      status: EGameStatus.playing,
      fromto: [
        {
          main: card_from,
          alt: card_from_alt,
          timeToggled: this.config.fromToTimeToggled
        }, {
          main: card_to,
          alt: card_to_alt,
          timeToggled: this.config.fromToTimeToggled
        }
      ],
      ...partPathChoices
    }
  }

  async pickChoice(
    to: ICardItemLogic,
    choice: ICardItemLogic,
    path: Array<IPathItemLogic>,
    gameParams: IGameAnimeGameParams
  ) {
    if ((choice.id === to.id) && (choice.itemType == to.itemType)) {
      return {
        status: EGameStatus.finish_ok
      };
    }

    return await this._pickItemChoice(
      choice,
      path,
      gameParams
    );
  }
}


export {
  AnimeProvider
};