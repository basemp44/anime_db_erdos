import { IGame } from '../../interfaces/IGame';
import { renderCharacterFromTo } from './atomic/character';


function renderFromTo(game: IGame) {
	return (
		<div className='from-to'>
			{ renderCharacterFromTo(game.character_from) }
			<p className='arrow'>{String.fromCodePoint(10144)}</p>
			{ renderCharacterFromTo(game.character_to) }
		</div>
	);
}


export default renderFromTo;