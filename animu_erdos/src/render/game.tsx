import { IAnimeDb } from '../interfaces/IAnimeDb';
import { IGame } from '../interfaces/IGame';
import { EGameStatus } from '../enums/EGameStatus';
import { updateInitGame } from '../logic/game';
import { FromTo } from '../render/section/FromTo';
import { Path } from '../render/section/Path';
import { Choices } from '../render/section/Choices';
import TestItems from '../components/TestItems/TestItems';

function Game({animedb, game, setGame}: {
	animedb: IAnimeDb,
	game: IGame,
	setGame: Function
}) {
	if (game.status == EGameStatus.init)
		return (
			<div className='init-game'>
				<div className='card'>
					<button onClick={ () => setGame(updateInitGame(animedb, true)) }>
						Start Game
					</button>
				</div>
				<TestItems/>
			</div>
		);
	else
		return (
			<div className='grid-game'>
				<FromTo game={game}/>
				<Path game={game}/>
				<Choices animedb={animedb} game={game} setGame={setGame}/>
				<div className='stats'></div>
			</div>
		);
}


export {
	Game
};