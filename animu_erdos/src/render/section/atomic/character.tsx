import { ICharacter } from '../../../interfaces/ICharacter';
import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { updatePickCharacter } from '../../../logic/game';


function renderCharacterFavorites(character: ICharacter) {
	return (
		<p className='favorites'>
			{character.favorites + String.fromCodePoint(9733)}
		</p>
	);
}


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
		<div key={`character-${keyType}-${character.character_id}-${index}`} className={divClassName} onClick={onClick}>
			<div className='img-container'>
				<img
					className={imgClassName}
					src={character.images_webp_image_url}
					alt={character.name}
				/>
			</div>
			<p className='name'>{character.name}</p>
			{ withFavorites ? renderCharacterFavorites(character) : undefined }
		</div>
	);
}


function renderCharacterPickable(
	animedb: IAnimeDb,
	setGame: Function,
	character: ICharacter,
	...rest: any[]
) {
	return renderCharacter(
		() => setGame(updatePickCharacter(animedb, character.character_id)),
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


function renderCharacterChoices(
	animedb: IAnimeDb,
	setGame: Function,
) {
	return (character: ICharacter) => {
		return renderCharacterPickable(
			animedb,
			setGame,
			character,
			'choices', //keyType
			0, // index
			'card character', // divClassName
			'', // imgClassName
			true // withFavorites
		);
	}
}


function renderCharacterFromTo(character: ICharacter) {
	return renderCharacterUnpickable(
		character,
		'from-to', //keyType
		0, // index
		'card character', // divClassName
		'', // imgClassName
		true // withFavorites
	);
}


function renderCharacterPath(character: ICharacter, index: number) {
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
	renderCharacterChoices,
	renderCharacterFromTo,
	renderCharacterPath
};