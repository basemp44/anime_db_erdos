import { IAnime } from './IAnime';
import { ICharacter } from './ICharacter';
import { IStaff } from './IStaff';
import { IVoiceactor } from './IVoiceactor';
import { EGameStatus } from '../enums/EGameStatus';


type TAnimeItemIterable = IAnime|ICharacter|IStaff|IVoiceactor;


export interface IGame {
	character_from: ICharacter,
	character_to: ICharacter,
	path: Array<TAnimeItemIterable>,
	anime_choices: Array<IAnime>,
	character_choices: Array<ICharacter>,
	staff_choices: Array<IStaff>,
	voiceactor_choices: Array<IVoiceactor>,
	status: EGameStatus,
	with_staff: boolean
};