import './FromToPathChoice.css'
import { Choices } from '../Choices/Choices';
import { FromTo } from '../FromTo/FromTo';
import { IFromToItem } from '../FromToItem/FromToItem';
import { Path } from '../Path/path';


interface IFromToPathChoice {
  timeToggled: number,
  from: IFromToItem,
  to: IFromToItem,
  path: any,
  choices: any,
  choiceOnClick: Function,
  active: boolean
};


function FromToPathChoice({
  timeToggled,
  from,
  to,
  path,
  choices,
  choiceOnClick,
  active
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
    </div>
  )
}

export type { IFromToPathChoice };
export { FromToPathChoice };