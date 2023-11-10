import { concat, ifElse, includes, lensPath, over, without } from 'ramda';
import EItemType from "../../enums/EItemType";
import { Checkbox } from "../Checkbox/Checkbox";


interface ICheckboxAnimeItemTypes {
  from: EItemType,
  to: EItemType,
  choices: Array<EItemType>,
  setGame: Function
};


interface ICheckboxAnimeItemType extends ICheckboxAnimeItemTypes {
  itemType: EItemType
};

const lensChoices = lensPath(['game_params', 'choice_options']);


function addOrRemove(element: unknown) {
  return ifElse(includes(element), without([element]), concat([element]))
}


function CheckboxAnimeItemType({
  from,
  to,
  choices,
  setGame,
  itemType
}: ICheckboxAnimeItemType) {
  return (
    <Checkbox
      label={itemType}
      value={[...choices, from, to].includes(itemType)}
      disabled={[from, to].includes(itemType)}
      onChange={() => setGame(over(lensChoices, addOrRemove(itemType)))}/>
  );
}


function CheckboxAnimeItemTypes({
  from,
  to,
  choices,
  setGame
}: ICheckboxAnimeItemTypes) {
  return (
    <div className="checkbox-container">
      {
        [
          EItemType.anime,
          EItemType.character,
          EItemType.staff,
          EItemType.voiceactor
        ].map(itemType => (
          <CheckboxAnimeItemType
            key={`anime-checkbox-${itemType}`}
            from={from}
            to={to}
            choices={choices}
            setGame={setGame}
            itemType={itemType}/>
        ))
      }
    </div>
  );
}


export {
  CheckboxAnimeItemTypes
};
