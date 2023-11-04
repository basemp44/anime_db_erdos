import './PathItem.css';
import EItemType from '../../enums/EItemType';


interface IPathItemLogic {
  itemType: EItemType,
  id: number,
  imgUrl: string,
  imgAlt: string,
  name: string
}

interface IPathItem extends IPathItemLogic{
  index: number,
}

function PathItem({
  itemType,
  id,
  index,
  imgUrl,
  imgAlt,
  name
}: IPathItem) {
  return (
    <div
      key={`path-${itemType}-${id}-${index}`}
      className={`path-item ${itemType}`}>
      <div className="img-container">
        <img src={imgUrl} alt={imgAlt}/>
      </div>
      <p>{name}</p>
    </div>
  );
}

export type { IPathItemLogic, IPathItem };
export { PathItem };