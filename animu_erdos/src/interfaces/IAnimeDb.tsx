import { IAnime } from './IAnime';
import { ICharacter } from './ICharacter';
import { IStaff } from './IStaff';
import { IVoiceactor } from './IVoiceactor';


export interface IAnimeDb {
	anime: {[index: number]: IAnime},
	character: {[index: number]: ICharacter},
	voiceactor: {[index: number]: IVoiceactor},
	staff: {[index: number]: IStaff},
	anime_character: {[index: number]: Array<number>},
	character_anime: {[index: number]: Array<number>},
	anime_staff: {[index: number]: Array<number>},
	staff_anime: {[index: number]: Array<number>},
	character_voiceactor: {[index: number]: Array<number>},
	voiceactor_character: {[index: number]: Array<number>},
	character_weights: Array<number>,
};