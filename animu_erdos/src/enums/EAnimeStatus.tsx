export enum EAnimeStatus {
	currently_airing = 'Currently Airing',
	finished_airing = 'Finished Airing',
	not_yet_aired = 'Not yet aired'
};

export const mapAnimeStatus = {
	[EAnimeStatus.currently_airing]: 'green',
	[EAnimeStatus.finished_airing]: 'red',
	[EAnimeStatus.not_yet_aired]: 'gray',
}