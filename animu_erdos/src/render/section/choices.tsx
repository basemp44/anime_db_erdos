import { IAnimeDb } from '../../interfaces/IAnimeDb';
import { IGame } from '../../interfaces/IGame';
import { AnimeChoice } from './atomic/Anime';
import { CharacterChoice } from './atomic/Character';
import { StaffChoice } from './atomic/Staff';
import { VoiceactorChoice } from './atomic/Voiceactor';


function Choices({animedb, game, setGame}: {
	animedb: IAnimeDb,
	game: IGame,
	setGame: Function
}) {
	return (
		<div className='choices'>
			{
				game.anime_choices
					? game.anime_choices.map(anime => (
							<AnimeChoice
								animedb={animedb}
								setGame={setGame}
								anime={anime}
							/>
						))
					: <></>
			}
			{
				game.character_choices
					? game.character_choices.map(character => (
							<CharacterChoice
								animedb={animedb}
								setGame={setGame}
								character={character}
							/>
						))
					: <></>
			}
			{
				game.staff_choices
					? game.staff_choices.map(staff => (
							<StaffChoice
								animedb={animedb}
								setGame={setGame}
								staff={staff}
							/>
						))
					: <></>
			}
			{
				game.voiceactor_choices
					? game.voiceactor_choices.map(voiceactor => (
							<VoiceactorChoice
								animedb={animedb}
								setGame={setGame}
								voiceactor={voiceactor}
							/>
						))
					: <></>
			}
		</div>
	);
}


export {
	Choices
};