import './Choices.css';
import { CardItem } from '../CardItem/CardItem'
import { ECardSize } from '../../enums/ECardSize';
import { ICardItemLogic } from '../CardItem/CardItem';


interface IChoicesLogic {
  choices: Array<ICardItemLogic>
};


interface IChoices extends IChoicesLogic {
  choiceOnClick: Function
};


function Choices({
  choices,
  choiceOnClick
} : IChoices) {
	return (
		<div className='choices'>
			{
				choices.map((choice: ICardItemLogic) => (
          <CardItem
            itemType={choice.itemType}
            id={choice.id}
            onClick={async () => await choiceOnClick(choice)}
            cardSize={ECardSize.L}
            imgUrl={choice.imgUrl}
            imgAlt={choice.imgAlt}
            name={choice.name}
            paragraphs={choice.paragraphs}
          />
        ))
			}
		</div>
	);
}


export type { IChoices, IChoicesLogic };
export { Choices };