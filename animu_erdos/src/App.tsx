import { useState } from 'react'
import './App.css'
import animedbjson from './animedbtest.json'
import initialgame from './logic/initialgame.json'
import { IAnimeDb } from './interfaces/IAnimeDb'
import { IGame } from './interfaces/IGame'
import renderGame from './render/game'


const animedb = animedbjson as IAnimeDb


function App() {
  const [game, setGame] = useState<IGame>(initialgame as IGame)
  return renderGame(animedb, game, setGame)
}


export default App;
