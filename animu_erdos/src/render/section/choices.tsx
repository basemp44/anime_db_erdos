import { IAnimeDb } from '../../interfaces/IAnimeDb';
import { IGame } from '../../interfaces/IGame';
import { renderAnimeChoices } from './atomic/anime';
import { renderCharacterChoices } from './atomic/character';
import { renderStaffChoices } from './atomic/staff';
import { renderVoiceactorChoices } from './atomic/voiceactor';


function renderChoices(
	animedb: IAnimeDb,
	game: IGame,
	setGame: Function
) {
	return (
		<div className='choices'>
			{ game.anime_choices ?
				<div className='anime-choices'>
					{ game.anime_choices.map(renderAnimeChoices(animedb, setGame)) }
				</div> : <></>
			}
			{ game.character_choices ?
				<div className='character-choices'>
					{ game.character_choices.map(renderCharacterChoices(animedb, setGame)) }
				</div> : <></>
			}
			{ game.staff_choices ?
				<div className='staff-choices'>
					{ game.staff_choices.map(renderStaffChoices(animedb, setGame)) }
				</div> : <></>
			}
			{ game.voiceactor_choices ?
				<div className='voiceactor-choices'>
					{ game.voiceactor_choices.map(renderVoiceactorChoices(animedb, setGame)) }
				</div> : <></>
			}
		</div>
	);
}


export default renderChoices;