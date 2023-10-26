import { IAnimeDb } from '../interfaces/IAnimeDb';
import { IGame } from '../interfaces/IGame';
import { EGameStatus } from '../enums/EGameStatus';
import { updateInitGame } from '../logic/game';
import renderFromTo from '../render/section/from-to';
import renderPath from '../render/section/path';
import renderChoices from '../render/section/choices';


function renderGame(
	animedb: IAnimeDb,
	game: IGame,
	setGame: Function
) {
	if (game.status == EGameStatus.init)
		return (
			<>
				<div className='init-game'>
					<div className='card'>
						<button onClick={ () => setGame(updateInitGame(animedb, true)) }>
							Start Game
						</button>
					</div>
				</div>
			</>
		);
	else
		return (
			<>
				<div className='grid-game'>
					{ renderFromTo(game) }
					{ renderPath(game) }
					{ renderChoices(animedb, game, setGame) }
					<div className='stats'></div>
				</div>
			</>
		);
}


export default renderGame;