import { IGame } from '../../interfaces/IGame';
import { CharacterFromTo } from './atomic/Character';


function FromTo({game}: {
	game: IGame
}) {
	return (
		<div className='from-to'>
			<CharacterFromTo character={game.character_from}/>
			<p className='arrow'>{String.fromCodePoint(10144)}</p>
			<CharacterFromTo character={game.character_to}/>
		</div>
	);
}


export {
	FromTo
};