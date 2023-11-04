import './GameAnimeFromTo.css';
import initialgame from './initialgame.json';
import { useEffect, useState } from 'react';
import { EGameStatus } from './EGame';
import { IGameAnimeFromTo } from './IGameAnimeFromTo';
import { FromToPathChoice } from "../FromToPathChoice/FromToPathChoice";
import { ICardItemLogic } from '../CardItem/CardItem';
import { AnimeProvider } from './AnimeProvider';


async function persist() {
	return await navigator.storage && navigator.storage.persist &&
		navigator.storage.persist();
}

async function isStoragePersisted() {
  return await navigator.storage && navigator.storage.persisted &&
    navigator.storage.persisted();
}


function GameAnimeFromTo() {
  const [game, setGame] = useState<IGameAnimeFromTo>(initialgame as IGameAnimeFromTo)
	const animeProvider = new AnimeProvider(game.config);
	isStoragePersisted().then(async isPersisted => {
		if (isPersisted) {
			console.log(":) Storage is successfully persisted.");
		} else {
			console.log(":( Storage is not persisted.");
			console.log("Trying to persist..:");
			if (await persist()) {
				console.log(":) We successfully turned the storage to be persisted.");
			} else {
				console.log(":( Failed to make storage persisted");
			}
		}
	})

	useEffect(() => {
		persist().then(() => animeProvider.initGame());
	}, [])

	if (game.status == EGameStatus.init)
		return (
			<div className='init-game'>
				<div className='card'>
					<button onClick={
						async () => {
							const partialGame = await animeProvider.startNewGame(
								game.game_params
							);
							setGame({...game, ...partialGame});
						}
					}>
						Start Game
					</button>
				</div>
			</div>
		);
	else
		return (
      <FromToPathChoice
        timeToggled={game.config.fromToTimeToggled}
        from={game.fromto[0]}
        to={game.fromto[1]}
        path={game.path}
        choices={game.choices}
        choiceOnClick={async (choice: ICardItemLogic) => {
					const partialGame = await animeProvider.pickItemChoice(
						game.path,
						choice,
						game.game_params
					);

					setGame({...game, ...partialGame})
				}}
      />
		);
}


export {
	GameAnimeFromTo
};