import './PathItem.css';
import EItemType from '../../enums/EItemType';


interface IPathItemLogic {
  itemType: EItemType,
  id: number,
  imgUrl: string,
  imgAlt: string,
  name: string
}


function PathItem({
  itemType,
  imgUrl,
  imgAlt,
  name
}: IPathItemLogic) {
  return (
    <div
      className={`path-item ${itemType}`}>
      <div className="img-container">
        <img src={imgUrl} alt={imgAlt}/>
      </div>
      <p>{name}</p>
    </div>
  );
}

export type { IPathItemLogic };
export { PathItem };