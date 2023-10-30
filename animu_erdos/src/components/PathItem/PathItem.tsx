import './PathItem.css';
import EItemType from '../../enums/EItemType';


function PathItem({
  itemType,
  id,
  index,
  img_url,
  img_alt,
  text
}: {
  itemType: EItemType,
  id: number,
  index: number,
  img_url: string,
  img_alt: string,
  text: string
}) {
  return (
    <div
      key={`path-${itemType}-${id}-${index}`}
      className={`path-item ${itemType}`}>
      <div className="img-container">
        <img src={img_url} alt={img_alt}/>
      </div>
      <p>{text}</p>
    </div>
  );
}

export {
  PathItem
};