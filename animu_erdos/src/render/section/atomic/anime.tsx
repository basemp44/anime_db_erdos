import React from 'react';
import { IAnime } from '../../../interfaces/IAnime';
import { IAnimeDb } from '../../../interfaces/IAnimeDb';
import { updatePickAnime } from '../../../logic/game';


function renderAnimeScoredBy(anime: IAnime) {
	return (
		<p className='scored-by'>
			{anime.scored_by + String.fromCodePoint(9733)}
		</p>
	);
}


function renderAnimeStatus(anime: IAnime) {
	return (
		<p className={'status ' + anime.status}>
			{String.fromCodePoint(8226)}
		</p>
	);
}


function renderAnimeRank(anime: IAnime) {
	return <p className='Rank'>{'#' + anime.rank}</p>;
}


function renderAnime(
	onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
	anime: IAnime,
	keyType?: string,
	index?: number,
	divClassName?: string,
	imgClassName?: string,
	withScoredBy?: boolean,
	withStatus?: boolean,
	withRank?: boolean
) {
	return (
		<div key={`anime-${keyType}-${anime.anime_id}-${index}`} className={divClassName} onClick={onClick}>
			<div className='img-container'>
				<img
					className={imgClassName}
					src={anime.image_webp}
					alt={anime.title}
				/>
			</div>
			<p className = 'title'>{anime.title}</p>
			{ withScoredBy ? renderAnimeScoredBy(anime) : undefined }
			{ withStatus ? renderAnimeStatus(anime) : undefined }
			{ withRank ? renderAnimeRank(anime) : undefined }
		</div>
	);
}


function renderAnimePickable(
	animedb: IAnimeDb,
	setGame: Function,
	anime: IAnime,
	...rest: any[]
) {
	return renderAnime(
		() => setGame(updatePickAnime(animedb, anime.anime_id)),
		anime,
		...rest
	);
}


function renderAnimeUnpickable(
	anime: IAnime,
	...rest: any[]
) {
	return renderAnime(
		undefined,
		anime,
		...rest
	);
}


function AnimeChoice({animedb, setGame, anime}: {
	animedb: IAnimeDb,
	setGame: Function,
	anime: IAnime
}) {
	return renderAnimePickable(
		animedb,
		setGame,
		anime,
		'choices', //keyType
		0, // index
		'card anime', // divClassName
		'', // imgClassName
		true, // withScoredBy
		true, // withStatus
		true // withRank
	);
}


function AnimePath({anime, index}: {
	anime: IAnime,
	index: number
}) {
	return renderAnimeUnpickable(
		anime,
		'path', //keyType
		index,
		'list-item anime disabled', // divClassName
		'', // imgClassName
		false, // withScoredBy
		false, // withStatus
		false // withRank
	);
}


export {
	AnimeChoice,
	AnimePath
};