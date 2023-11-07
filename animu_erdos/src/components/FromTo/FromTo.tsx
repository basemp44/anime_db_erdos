import './FromTo.css';
import { FromToItem } from "../FromToItem/FromToItem";
import { IFromToItemLogic } from '../FromToItem/FromToItem'


interface IFromToLogic {
	from: IFromToItemLogic,
	to: IFromToItemLogic
};


interface IFromTo extends IFromToLogic {
	timeToggled: number
};


function FromTo({
	timeToggled,
	from,
	to
}: IFromTo) {
  return (
		<div className='from-to'>
			<FromToItem
				timeToggled={timeToggled}
				main={from.main}
				alt={from.alt}
				/>
			<p className='arrow'>{String.fromCodePoint(10144)}</p>
			<FromToItem
				timeToggled={timeToggled}
				main={to.main}
				alt={to.alt}
			/>
		</div>
  );
}


export type { IFromTo, IFromToLogic };
export { FromTo };