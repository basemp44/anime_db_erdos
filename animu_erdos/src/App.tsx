import './App.css'
import animedbjson from './animedbtest.json'
import initialgame from './logic/initialgame.json'
import { useState } from 'react'
import { IAnimeDb } from './interfaces/IAnimeDb'
import { IGame } from './interfaces/IGame'
import { Game } from './render/Game'


const animedb = animedbjson as IAnimeDb


function App() {
  const [game, setGame] = useState<IGame>(initialgame as IGame)
  return <Game animedb={animedb} game={game} setGame={setGame}/>
}


export default App;
