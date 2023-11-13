import './FromToPathChoice.css'
import { Choices } from '../Choices/Choices';
import { FromTo } from '../FromTo/FromTo';
import { IFromToItem } from '../FromToItem/FromToItem';
import { Path } from '../Path/path';
import { Timer } from '../Timer/Timer';


interface IFromToPathChoice {
  timeToggled: number,
  time: number,
  from: IFromToItem,
  to: IFromToItem,
  path: any,
  choices: any,
  choiceOnClick: Function,
  active: boolean,
  version: string
};


function FromToPathChoice({
  timeToggled,
  time,
  from,
  to,
  path,
  choices,
  choiceOnClick,
  active,
  version
}: IFromToPathChoice) {
  return (
    <div className='from-to-path-choice'>
      <FromTo
        timeToggled={timeToggled}
        from={from}
        to={to}/>
      <Path path={path}/>
      <Choices
        choices={choices}
        choiceOnClick={choiceOnClick}
        active={active}/>
      <div className='stats'></div>
      <Timer time={time}/>
      <div className='version'>
        <span>{version}</span>
      </div>
    </div>
  )
}

export type { IFromToPathChoice };
export { FromToPathChoice };