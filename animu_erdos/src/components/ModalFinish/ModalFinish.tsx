import './ModalFinish.css'
import { MouseEventHandler } from 'react';
import { Modal } from '../Modal/Modal';
import EItemType from '../../enums/EItemType';


interface IModalFinish {
  setIsOpen: Function,
  time: number,
  distance: number,
  from: EItemType,
  to: EItemType,
  choices: Array<EItemType>
  sessionSummary: ISummaryGames,
  onClickNewGame: MouseEventHandler<HTMLButtonElement>,
  onClickReturn: MouseEventHandler<HTMLButtonElement>
};


interface ISummaryGame {
  distance?: number,
  time?: number,
  from: EItemType,
  to: EItemType,
  choices: Array<EItemType>
};


interface ISummaryWinGame {
  distance: number,
  time: number,
  from: EItemType,
  to: EItemType,
  choices: Array<EItemType>
};


type ISummaryGames = Array<ISummaryGame>;
type ISummaryWinGames = Array<ISummaryWinGame>;


function getWinGames(
  summaryGames: ISummaryGames
) : ISummaryGames {
  return summaryGames.filter(e => e.hasOwnProperty('distance'));
}


function getWinRate(
  summaryGames: ISummaryGames
): number {
  return getWinGames(summaryGames).length / summaryGames.length
}


function hasSameMembers(arr1: Array<any>, arr2: Array<any>) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return arr1.every(item => set2.has(item)) &&
      arr2.every(item => set1.has(item))
}


function filterTypeGame(
  from: EItemType,
  to: EItemType,
  choices: Array<EItemType>,
  summaryGames: ISummaryGames
): ISummaryGames {
  return summaryGames.filter(e => (
    (e.from === from) &&
    (e.to === to) &&
    hasSameMembers(e.choices, choices)
  ));
}


function StatusLast10GamesItem(summaryGame: ISummaryGame) {
  return (
    <div className={
      summaryGame.hasOwnProperty('distance') ?
        'green' :
        'red'
    }></div>
  );
}


function getBestTime(summaryWinGames: ISummaryWinGames) {
  return Math.min(...summaryWinGames.map(
    (e:ISummaryGame) => e?.time || Infinity
  ))
}


function getBestDistance(summaryWinGames: ISummaryWinGames) {
  return Math.min(...summaryWinGames.map(
    (e:ISummaryGame) => e?.distance || Infinity
  ))
}


function average(arr: Array<number>) {
  return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
}


function getAverageTime(summaryWinGames: ISummaryWinGames) {
  return average(summaryWinGames.map(
    (e:ISummaryGame) => e?.time || Infinity
  ))
}


function getAverageDistance(summaryWinGames: ISummaryWinGames) {
  return average(summaryWinGames.map(
    (e:ISummaryGame) => e?.distance || Infinity
  ))
}

function formatTime(time: number) {
  return new Date(time * 1000).toISOString().slice(11, -1);
}


function ModalFinish({
  setIsOpen,
  time,
  distance,
  from,
  to,
  choices,
  sessionSummary,
  onClickNewGame,
  onClickReturn
}: IModalFinish) {

  const sessionSummaryTypeGame = filterTypeGame(
    from,
    to,
    choices,
    sessionSummary
  );

  const sessionSummaryTypeGameLast10 = sessionSummaryTypeGame.slice(-10);
  const sessionSummaryTypeGameWin = getWinGames(sessionSummaryTypeGame) as ISummaryWinGames;

  return (
    <Modal
      closeOnClick={false}
      setIsOpen={setIsOpen}
      heading={<h3>Enhorabuena</h3>}
      content={
        <div>
          <h4>Estadísticas</h4>
          <div className="flex-center">
            <table>
              <tbody>
                <tr>
                  <th>Modalidad</th>
                  <td>{from} vs {to}</td>
                </tr>
                <tr>
                  <th>Opciones</th>
                  <td>{choices.join(', ')}</td>
                </tr>
                <tr>
                  <th>Partidas jugadas</th>
                  <td>{sessionSummaryTypeGame.length}</td>
                </tr>
                <tr>
                  <th>Winrate</th>
                  <td>{getWinRate(sessionSummaryTypeGame)}</td>
                </tr>
                <tr>
                  <th>Últimas 10</th>
                  <td>
                    <div className="last-10">
                      {sessionSummaryTypeGameLast10.map(StatusLast10GamesItem)}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='summary-type-game'>
              <thead>
                <th></th>
                <th>Tiempo</th>
                <th>Distancia</th>
              </thead>
              <tbody>
                <tr>
                  <td>Actual</td>
                  <td>{formatTime(time)}</td>
                  <td>{distance}</td>
                </tr>
                <tr>
                  <td>Total (mejor)</td>
                  <td>{formatTime(getBestTime(sessionSummaryTypeGameWin))}</td>
                  <td>{getBestDistance(sessionSummaryTypeGameWin)}</td>
                </tr>
                <tr>
                  <td>Total (media)</td>
                  <td>{formatTime(getAverageTime(sessionSummaryTypeGameWin))}</td>
                  <td>{getAverageDistance(sessionSummaryTypeGameWin)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      footer={
        <div className='modal-footer-container'>
          <button onClick={onClickNewGame}>
            Nueva partida
          </button>
          <button onClick={onClickReturn}>
            Volver
          </button>
        </div>
      }
    />
  );
}


export type {
  ISummaryGames
};

export {
  ModalFinish
};
