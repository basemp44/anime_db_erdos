import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { IVoiceactor } from '../../../interfaces/IVoiceactor';
import { updatePickVoiceactor } from '../../../logic/game';


function renderVoiceactorFavorites(voiceactor: IVoiceactor) {
	return (
		<p className='favorites'>
			{voiceactor.favorites + String.fromCodePoint(9733)}
		</p>
	);
}


function renderVoiceactor(
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
	voiceactor: IVoiceactor,
	keyType?: string,
	index?: number,
	divClassName?: string,
	imgClassName?: string,
	withFavorites?: boolean
) {
	return (
		<div key={`voiceactor-${keyType}-${voiceactor.voiceactor_id}-${index}`} className={divClassName} onClick={onClick}>
			<div className='img-container'>
				<img
					className={imgClassName}
					src={voiceactor.image_url}
					alt={voiceactor.name}
				/>
			</div>
			<p className='name'>{voiceactor.name}</p>
			{ withFavorites ? renderVoiceactorFavorites(voiceactor) : undefined }
		</div>
	);
}


function renderVoiceactorPickable(
	animedb: IAnimeDb,
	setGame: Function,
	voiceactor: IVoiceactor,
	...rest: any[]
) {
	return renderVoiceactor(
		() => setGame(updatePickVoiceactor(animedb, voiceactor.voiceactor_id)),
		voiceactor,
		...rest
	);
}


function renderVoiceactorUnpickable(
	voiceactor: IVoiceactor,
	...rest: any[]
) {
	return renderVoiceactor(
		undefined,
		voiceactor,
		...rest
	);
}


function renderVoiceactorChoices(
	animedb: IAnimeDb,
	setGame: Function,
) {
	return (voiceactor: IVoiceactor) => {
		return renderVoiceactorPickable(
			animedb,
			setGame,
			voiceactor,
			'choices', //keyType
			0, // index
			'card voiceactor', // divClassName
			'', // imgClassName
			true // withFavorites
		);
	}
}


function renderVoiceactorPath(voiceactor: IVoiceactor, index: number) {
	return renderVoiceactorUnpickable(
		voiceactor,
		'path', //keyType
		index,
		'list-item voiceactor disabled', // divClassName
		'', // imgClassName
		false // withFavorites
	);
}


export {
	renderVoiceactorChoices,
	renderVoiceactorPath
};