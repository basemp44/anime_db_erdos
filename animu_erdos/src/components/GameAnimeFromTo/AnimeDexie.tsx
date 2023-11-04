import Dexie, { Table } from 'dexie';
import { ICardItemLogicMin, ICardItemLogicRel } from '../CardItem/CardItem';
import EItemType from '../../enums/EItemType';

interface Version {
  id: number,
  version: number;
};

interface ICardItemLogicRelWeight extends ICardItemLogicRel {
  cumweight: number
}


class AnimeDexie extends Dexie {
  cardItem!: Table<ICardItemLogicRelWeight>;
  dbVersion!: Table<Version>;

  constructor() {
    super('animedb');
    this.version(1).stores({
      cardItem: '[id+itemType],itemType,[itemType+cumweight]',
      dbVersion: 'id'
    });
  }


  async _getRandomMaxWeight(
    itemType: EItemType
  ) {
    const { cumweight } = await this.cardItem
      .where('itemType')
      .equals(itemType)
      .last() as ICardItemLogicRelWeight;

    return Math.floor(Math.random() * cumweight);
  }


  async _getCumulativeBiggerThan(
    itemType: EItemType,
    cumweight: number
  ) {
    const {cumweight:_, ...itemRel} = await this.cardItem
      .where('[itemType+cumweight]')
      .aboveOrEqual([itemType, cumweight])
      .first() as ICardItemLogicRelWeight;
    
    return itemRel
  }


  async getVersus(
    target_from_main: EItemType,
    target_to_main: EItemType
  ) {
    const cumweight_from = await this._getRandomMaxWeight(target_from_main);
    const cumweight_to = await this._getRandomMaxWeight(target_to_main);
    
    const from = await this._getCumulativeBiggerThan(target_from_main, cumweight_from);
    const to = await this._getCumulativeBiggerThan(target_to_main, cumweight_to);

    return [
      from,
      to
    ]
  }


  async getCardItemLogicRel(
    key: ICardItemLogicMin,
    choice_options: Array<EItemType>
  ) {
    const item = (await this.cardItem.get([key.id, key.itemType])) as ICardItemLogicRel;
  
    if (choice_options.length === 0) {
      return item;
    }
  
    const { relations, ...props } = item;
  
    return {
      ...props,
      relations: relations.filter(({
        id: _,
        itemType
      }) => choice_options.includes(itemType))
    } as ICardItemLogicRel;
  }


  async bulkGetCardItemLogicRel(
    keys: Array<ICardItemLogicMin>,
  ) {
    const items = await this.cardItem.bulkGet(
      keys.map(({ id, itemType }) => [id, itemType])
    ) as Array<ICardItemLogicRel>;
  
    return items.map(({relations:_, ...cardItem}) => cardItem);
  }


  async setVersionADX(
    version: number
  ) {
    return await this.dbVersion.add({
      id: 1,
      version
    });
  }


  async shouldRecreateADX(
    version: number
  ) {
    const dbVersion = (await this.dbVersion.get(1))?.version
    debugger;
    return version != dbVersion;
  }


  async recreateADX() {
    debugger;
    await this.delete();
    await this.open();
  }


  async bulkInsertADX(
    data: Array<ICardItemLogicRelWeight>
  ) {
    return await this.cardItem
      .bulkAdd(data)
      .catch(
        Dexie.BulkError,
        e => console.log(`Bulk insert failures: ${e.failures.length}`)
      )
  }


  async getFromToItemADX(
    id: number,
    itemType: EItemType,
    itemTypeAlt: EItemType
  ) {
    const { relations, ...main } = await this.getCardItemLogicRel({id, itemType}, []) || {};
    const relation = relations
      ?.find(({ itemType }) => itemType == itemTypeAlt) as ICardItemLogicMin;
    const alt = await this.getCardItemLogicRel(relation, []);
  
    return [
      main as ICardItemLogicRel,
      alt as ICardItemLogicRel
    ]
  }

  
  async getChoicesADX(
    id: number,
    itemType: EItemType,
    choice_options: Array<EItemType>
  ) {
    const { relations } = await this.getCardItemLogicRel(
      {id, itemType},
      choice_options
    ) as ICardItemLogicRel;
  
    return await this.bulkGetCardItemLogicRel(
      relations || []
    ) as Array<ICardItemLogicRel>;
  }

}


export {
  AnimeDexie
};