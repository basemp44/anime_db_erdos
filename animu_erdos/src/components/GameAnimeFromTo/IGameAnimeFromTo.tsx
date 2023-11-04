import EItemType from '../../enums/EItemType';
import { IFromToItem } from '../FromToItem/FromToItem';
import { EGameStatus } from './EGame';
import { ICardItemLogic } from '../CardItem/CardItem';
import { IPathItemLogic } from '../PathItem/PathItem';


export interface IGameApiParams {
  baseUrl: string,
  initUrl: string,
  bulkGetUrl: string,
  cardItemUrl: string,
  choicesUrl: string
};


export interface IGameConfig {
	api: IGameApiParams,
	version: number
	fromToTimeToggled: number
};


export interface IGameAnimeGameParams {
	target_from_main: EItemType,
	target_from_alt: EItemType,
	target_to_main: EItemType,
	target_to_alt: EItemType,
	choice_options: Array<EItemType>
}


export interface IGameAnimeFromTo {
	config: IGameConfig,
	game_params: IGameAnimeGameParams,
	status: EGameStatus,
	fromto: Array<IFromToItem>,
	path: Array<IPathItemLogic>,
	choices: Array<ICardItemLogic>,
};