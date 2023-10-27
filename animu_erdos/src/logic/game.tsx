import initialgame from './initialgame.json';
import { EGameStatus } from '../enums/EGameStatus';
import { IAnime } from '../interfaces/IAnime';
import { IAnimeDb } from '../interfaces/IAnimeDb';
import { ICharacter } from '../interfaces/ICharacter';
import { IGame } from '../interfaces/IGame';
import { IStaff } from '../interfaces/IStaff';
import { IVoiceactor } from '../interfaces/IVoiceactor';


function pickWeightRandomCharacter(
	picklist: Array<number>
) {
	return picklist[
		Math.floor(Math.random()*picklist.length)
	];
}


function intersection(
	array1: Array<any>,
	array2: Array<any>
) {
	return array1.filter(value => array2.includes(value));
}


function pickDifferentWeightAnimeCharacters(
	picklist: IAnimeDb['character_weights'],
	character_anime: IAnimeDb['character_anime']
) {
	while (true) {
		const [character1, character2] = [
			pickWeightRandomCharacter(picklist),
			pickWeightRandomCharacter(picklist)
		];

		const animes1 = character_anime[character1];
		const animes2 = character_anime[character2];

		if (!intersection(animes1, animes2).length) {
			return [character1, character2];
		}
	}
}


function idToAnimeC(
	animedb: IAnimeDb
) {
	const anime = animedb['anime'];
	return (id: number): IAnime => anime[id];
}


function idToCharacterC(
	animedb: IAnimeDb
) {
	const character = animedb['character'];
	return (id: number): ICharacter => character[id];
}


function idToStaffC(
	animedb: IAnimeDb
) {
	const staff = animedb['staff'];
	return (id: number): IStaff => staff[id];
}


function idToVoiceactorC(
	animedb: IAnimeDb
) {
	const voiceactor = animedb['voiceactor'];
	return (id: number): IVoiceactor => voiceactor[id];
}


function updatePickAnime(
	animedb: IAnimeDb,
	anime: number
) {
	const animeP = animedb['anime'][anime];
	const animeCharacterP = animedb['anime_character'][anime];
	const animeStaffP = animedb['anime_staff'][anime];

	return (game: IGame) => ({
		...game,
		path: [...game.path, animeP],
		anime_choices: [],
		character_choices: animeCharacterP.map(idToCharacterC(animedb)),
		staff_choices: animeStaffP.map(idToStaffC(animedb)),
		voiceactor_choices: []
	});
}


function updatePickCharacterNoWin(
	animedb: IAnimeDb,
	character: number
) {
	const characterP = animedb['character'][character];
	const characterAnimeP = animedb['character_anime'][character];
	const characterVoiceactorP = animedb['character_voiceactor'][character];

	return (game: IGame) => ({
		...game,
		path: [...game.path, characterP],
		anime_choices: characterAnimeP.map(idToAnimeC(animedb)),
		character_choices: [],
		staff_choices: [],
		voiceactor_choices: characterVoiceactorP.map(idToVoiceactorC(animedb))
	});
}


function updatePickCharacterWin(
	animedb: IAnimeDb,
	character: number
) {
	return (game: IGame) => ({
		...game,
		path: [...game.path, animedb['character'][character]],
		status: EGameStatus.finish_ok
	});
}


function updatePickCharacter(
	animedb: IAnimeDb,
	character: number
) {
	return (game: IGame) => {
		if (character == game.character_to.character_id)
			return updatePickCharacterWin(animedb, character)(game);
		else
			return updatePickCharacterNoWin(animedb, character)(game);
	}
}


function updatePickStaff(
	animedb: IAnimeDb,
	staff: number
) {
	const staffAnimeP = animedb['staff_anime'][staff];
	return (game: IGame) => ({
		...game,
		path: [...game.path, animedb['staff'][staff]],
		anime_choices: staffAnimeP.map(idToAnimeC(animedb)),
		character_choices: [],
		staff_choices: [],
		voiceactor_choices: []
	});
}


function updatePickVoiceactor(
	animedb: IAnimeDb,
	voiceactor: number
) {
	const voiceactorCharacterP = animedb['voiceactor_character'][voiceactor];
	return (game: IGame) => ({
		...game,
		path: [...game.path, animedb['voiceactor'][voiceactor]],
		anime_choices: [],
		character_choices: voiceactorCharacterP.map(idToCharacterC(animedb)),
		staff_choices: [],
		voiceactor_choices: []
	});
}


function updateInitGame(
	animedb: IAnimeDb,
	with_staff: boolean
) {
	return (_: IGame) => {
		const [character_from, character_to] = pickDifferentWeightAnimeCharacters(
			animedb.character_weights,
			animedb.character_anime
		);

		const newGame: IGame = ({
			...initialgame as IGame,
			character_from: animedb.character[character_from],
			character_to: animedb.character[character_to],
			with_staff: with_staff,
			status: EGameStatus.playing
		});

		return updatePickCharacter(animedb, character_from)(newGame);
	}
}


export {
	updateInitGame,
	updatePickAnime,
	updatePickCharacter,
	updatePickStaff,
	updatePickVoiceactor
};