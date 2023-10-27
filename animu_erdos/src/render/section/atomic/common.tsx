import React from 'react';
import { EAnimeStatus, mapAnimeStatus } from '../../../enums/EAnimeStatus';


const STAR_CODE = 9733;
const BIG_CIRCLE = 11044;


function getStatusColor(status: EAnimeStatus) {
	return mapAnimeStatus[status];
}


function renderStatus(status: EAnimeStatus) {
	return (
		<p className={'status ' + getStatusColor(status)}>
			{String.fromCodePoint(BIG_CIRCLE)}
		</p>
	);
}


function renderScoredBy(scored_by: number) {
	return (
		<p className='scored-by'>
			{scored_by + String.fromCodePoint(STAR_CODE)}
		</p>
	);
}


function renderRank(rank: number) {
	return (
    <p className='rank'>
      {'#' + rank}
    </p>
  );
}


function renderFavorites(favorites: number) {
	return (
		<p className='favorites'>
			{favorites + String.fromCodePoint(STAR_CODE)}
		</p>
	);
}


export {
  renderStatus,
  renderScoredBy,
  renderRank,
  renderFavorites
}