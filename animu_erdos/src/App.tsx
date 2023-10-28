import './App.css'
import animedb from './animedbdict.json'
import initialgame from './logic/initialgame.json'
import { useState } from 'react'
import { IAnimeDb } from './interfaces/IAnimeDb'
import { IGame } from './interfaces/IGame'
import { Game } from './render/Game'


function App() {
  const [game, setGame] = useState<IGame>(initialgame as IGame)
  return <Game animedb={animedb as IAnimeDb} game={game} setGame={setGame}/>
}


export default App;
