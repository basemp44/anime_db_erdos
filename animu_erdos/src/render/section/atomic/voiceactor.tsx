import React from 'react';
import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { IVoiceactor } from '../../../interfaces/IVoiceactor';
import { updatePickVoiceactor } from '../../../logic/game';
import { renderFavorites } from './common';


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
			{ withFavorites ? renderFavorites(voiceactor.favorites) : undefined }
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


function VoiceactorChoice({animedb, setGame, voiceactor}: {
	animedb: IAnimeDb,
	setGame: Function,
	voiceactor: IVoiceactor
}) {
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


function VoiceactorPath({voiceactor, index}: {
	voiceactor: IVoiceactor,
	index: number
}) {
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
	VoiceactorChoice,
	VoiceactorPath
};