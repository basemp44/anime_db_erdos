import './GameAnimeFromTo.css';
import initialgame from './initialgame.json';
import { useEffect, useState } from 'react';
import { EGameStatus } from './EGame';
import { IGameAnimeFromTo } from './IGameAnimeFromTo';
import { FromToPathChoice } from "../FromToPathChoice/FromToPathChoice";
import { ICardItemLogic } from '../CardItem/CardItem';
import { AnimeProvider } from './AnimeProvider';
import { Modal } from '../Modal/Modal';


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
	const [time, setTime] = useState(0);
  const [isTimerRunning, setTimerIsRunning] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const animeProvider = new AnimeProvider(game.config);

  // state to check stopwatch running or not

  useEffect(() => {
		const dateOld = Date.now()
    let intervalId: number | undefined;

		if (isTimerRunning) {
      intervalId = setInterval(() => setTime((Date.now() - dateOld)/1000), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

	useEffect(() => {
		switch(game.status) {
			case EGameStatus.init:
				setTimerIsRunning(false);
				setModalOpen(false);
				break;
			case EGameStatus.playing:
				setTime(0);
				setTimerIsRunning(true);
				break;
			default:
				setTimerIsRunning(false);
				setModalOpen(true);
		}
	}, [game.status])

	
	useEffect(() => {
		persist().then(() => animeProvider.initGame());
	}, [])
	
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
	});

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
			<>
				{
					modalOpen ? 
						<Modal
							closeOnClick={false}
							setIsOpen={setModalOpen}
							heading={<h3>Enhorabuena</h3>}
							content={
								<div>
									<h4>Estadísticas</h4>
									<p>Tiempo: {time}</p>
									<p>Distancia: {game.path.length -1}</p>
								</div>
							}
							footer={
								<button onClick={
									async () => {
										const partialGame = await animeProvider.startNewGame(
											game.game_params
										);
										setGame({...game, ...partialGame});
										setModalOpen(false)
									}
								}>
									New Game
								</button>
							}
						/> :
						<></>
				}
				<FromToPathChoice
					timeToggled={game.config.fromToTimeToggled}
					from={game.fromto[0]}
					to={game.fromto[1]}
					path={game.path}
					choices={game.choices}
					active={game.status === EGameStatus.playing}
					choiceOnClick={async (choice: ICardItemLogic) => {
						const partialGame = await animeProvider.pickChoice(
							game.fromto[1].main,
							choice,
							game.path,
							game.game_params
						);

						setGame({...game, ...partialGame})
					}}
				/>
			</>
		);
}


export {
	GameAnimeFromTo
};