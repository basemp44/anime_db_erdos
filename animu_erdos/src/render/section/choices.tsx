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
				game.anime_choices ?
					<div className='anime-choices'>
						{
							game.anime_choices.map(anime => (
								<AnimeChoice
									animedb={animedb}
									setGame={setGame}
									anime={anime}
								/>
							))
						}
					</div> : <></>
			}
			{
				game.character_choices ?
					<div className='character-choices'>
						{
							game.character_choices.map(character => (
								<CharacterChoice
									animedb={animedb}
									setGame={setGame}
									character={character}
								/>
							))
						}
					</div> : <></>
			}
			{
				game.staff_choices ?
					<div className='staff-choices'>
						{
							game.staff_choices.map(staff => (
								<StaffChoice
									animedb={animedb}
									setGame={setGame}
									staff={staff}
								/>
							))
						}
					</div> : <></>
			}
			{
				game.voiceactor_choices ?
					<div className='voiceactor-choices'>
						{
							game.voiceactor_choices.map(voiceactor => (
								<VoiceactorChoice
									animedb={animedb}
									setGame={setGame}
									voiceactor={voiceactor}
								/>
							))
						}
					</div> : <></>
			}
		</div>
	);
}


export {
	Choices
};