import React from 'react';
import { ICharacter } from '../../../interfaces/ICharacter';
import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { updatePickCharacter } from '../../../logic/game';
import { renderFavorites } from './common';
import { EGameStatus } from '../../../enums/EGameStatus';


function renderCharacter(
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
	character: ICharacter,
	keyType?: string,
	index?: number,
	divClassName?: string,
	imgClassName?: string,
	withFavorites?: boolean
) {
	return (
		<div
			key={`character-${keyType}-${character.character_id}-${index}`}
			className={`${divClassName} ${onClick ? 'pointer' : ''}`}
			onClick={onClick}>
			<div className='img-container'>
				<img
					className={imgClassName}
					src={character.images_webp_image_url}
					alt={character.name}
				/>
			</div>
			<p className='name'>{character.name}</p>
			{ withFavorites ? renderFavorites(character.favorites) : undefined }
		</div>
	);
}


function renderCharacterPickable(
	animedb: IAnimeDb,
	setGame: Function,
	status: EGameStatus,
	character: ICharacter,
	...rest: any[]
) {
	return renderCharacter(
		status == EGameStatus.playing
			? () => setGame(updatePickCharacter(animedb, character.character_id))
			: undefined,
		character,
		...rest
	);
}


function renderCharacterUnpickable(
	character: ICharacter,
	...rest: any[]
) {
	return renderCharacter(
		undefined,
		character,
		...rest
	);
}


function CharacterChoice({animedb, setGame, character, status} : {
	animedb: IAnimeDb,
	setGame: Function,
	character: ICharacter,
	status: EGameStatus
}) {
	return renderCharacterPickable(
		animedb,
		setGame,
		status, // EGameStatus
		character,
		'choices', //keyType
		0, // index
		'card character', // divClassName
		'', // imgClassName
		true // withFavorites
	);
}


function CharacterFromTo({character} : {
	character: ICharacter
}) {
	return renderCharacterUnpickable(
		character,
		'from-to', //keyType
		0, // index
		'card character', // divClassName
		'', // imgClassName
		true // withFavorites
	);
}


function CharacterPath({character, index} : {
	character: ICharacter,
	index: number
}) {
	return renderCharacterUnpickable(
		character,
		'path', //keyType
		index,
		'list-item character disabled', // divClassName
		'', // imgClassName
		false // withFavorites
	);
}


export {
	CharacterChoice,
	CharacterFromTo,
	CharacterPath
};