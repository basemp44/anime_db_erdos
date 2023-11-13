import './GameAnimeFromTo.css';
import { lensPath } from 'ramda';
import { useEffect, useState } from 'react';
import { AnimeProvider } from './AnimeProvider';
import { EGameStatus } from './EGame';
import { IGameAnimeFromTo } from './IGameAnimeFromTo';
import initialgame from './initialgame.json';
import { ICardItemLogic } from '../CardItem/CardItem';
import { DropdownAnimeItemType } from '../DropdownAnimeItemType/DropdownAnimeItemType';
import { FromToPathChoice } from "../FromToPathChoice/FromToPathChoice";
import { ISummaryGames, ISummaryGame, ModalFinish } from '../ModalFinish/ModalFinish';
import { CheckboxAnimeItemTypes } from '../CheckboxAnimeItemTypes/CheckboxAnimeItemTypes';


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
	const [summary, setSummary] = useState([] as ISummaryGames)

	const animeProvider = new AnimeProvider(game.config);

  // state to check stopwatch running or not

  useEffect(() => {
		const dateOld = Date.now()
    let intervalId: number | undefined;

		if (isTimerRunning) {
      intervalId = setInterval(() => setTime((Date.now() - dateOld)/1000), 10);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);
	game.game_params.target_from_main
	useEffect(() => {
		switch(game.status) {
			case EGameStatus.init:
				setTimerIsRunning(false);
				setModalOpen(false);
				break;
			case EGameStatus.playing:
				setTime(0);
				setTimerIsRunning(true);
				setSummary(summary => [...summary, {
					from: game.game_params.target_from_main,
					to: game.game_params.target_to_main,
					choices: game.game_params.choice_options
				}]);
				break;
			case EGameStatus.finish_ok:
				setTimerIsRunning(false);
				setModalOpen(true);
				setSummary(summary => [...summary.slice(0,-1), {
					...summary.at(-1) as ISummaryGame,
					distance: game.path.length,
					time: time
				}]);
				break;
			case EGameStatus.finish_ko:
				setTimerIsRunning(false);
				setModalOpen(true);
				
		}
	}, [game.status])

	
	useEffect(() => {
		persist().then(() => animeProvider.initGame());
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
	}, [])

	if (game.status == EGameStatus.init)
		return (
			<div className='init-game'>
				<div className="init-game-btn-container">
					<button className="init-game-btn" onClick={
						async () => {
							const partialGame = await animeProvider.startNewGame(
								game.game_params
							);
							setGame({...game, ...partialGame});
							{game.game_params.target_from_main}
						}
					}>
						Jugar
					</button>
				</div>
				<div className='game-options'>
					<div className='from-to-options'>
						<DropdownAnimeItemType
							trigger={<button>{game.game_params.target_from_main}</button>}
							setGame={setGame}
							lensMain={lensPath(['game_params', 'target_from_main'])}
							lensAlt={lensPath(['game_params', 'target_from_alt'])}/>
						<span>VS</span>
						<DropdownAnimeItemType
							trigger={<button>{game.game_params.target_to_main}</button>}
							setGame={setGame}
							lensMain={lensPath(['game_params', 'target_to_main'])}
							lensAlt={lensPath(['game_params', 'target_to_alt'])}/>
					</div>
					<CheckboxAnimeItemTypes
						from={game.game_params.target_from_main}
						to={game.game_params.target_to_main}
						choices={game.game_params.choice_options}
						setGame={setGame}/>
				</div>
			</div>
		);
	else
		return (
			<>
				{
					modalOpen ? 
						<ModalFinish
							setIsOpen={setModalOpen}
							time={time}
							distance={game.path.length}
							onClickNewGame={async () => {
								const partialGame = await animeProvider.startNewGame(
									game.game_params
								);
								setGame({ ...game, ...partialGame });
								setModalOpen(false);
							}}
							onClickReturn={() => {
								setGame({ ...game, status: EGameStatus.init });
								setModalOpen(false);
							}}
							from={game.game_params.target_from_main}
							to={game.game_params.target_to_main}
							choices={game.game_params.choice_options}
							sessionSummary={summary}/> :
						<></>
				}
				<FromToPathChoice
					timeToggled={game.config.fromToTimeToggled}
					time={time}
					from={game.fromto[0]}
					to={game.fromto[1]}
					path={game.path}
					choices={game.choices}
					active={game.status === EGameStatus.playing}
					version={game.config.version}
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