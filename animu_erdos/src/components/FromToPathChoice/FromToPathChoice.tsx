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
  choiceOnClick: Function
};


function FromToPathChoice({
  timeToggled,
  from,
  to,
  path,
  choices,
  choiceOnClick
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
        choiceOnClick={choiceOnClick}/>
      <div className='stats'></div>
    </div>
  )
}

export type { IFromToPathChoice };
export { FromToPathChoice };