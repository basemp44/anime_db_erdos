import EItemType from "../../enums/EItemType";
import { IGameApiParams } from "./IGameAnimeFromTo";

const HEADERS_GET_GZIP = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'gzip',
  },
};


class AnimeApi {
  baseUrl: string;
  initUrl: string;
  bulkGetUrl: string;
  cardItemUrl: string;
  choicesUrl: string;


  constructor(
    {
      baseUrl,
      initUrl,
      bulkGetUrl,
      cardItemUrl,
      choicesUrl
    }: IGameApiParams
  ) {
    this.baseUrl = baseUrl;
    this.initUrl = initUrl;
    this.bulkGetUrl = bulkGetUrl;
    this.cardItemUrl = cardItemUrl;
    this.choicesUrl = choicesUrl;
  }


  async getVersus(
    target_from_main: EItemType,
    target_to_main: EItemType
  ) {
    const url = new URL(`${this.baseUrl}/${this.initUrl}`);
  
    url.searchParams.append('from_type', target_from_main);
    url.searchParams.append('to_type', target_to_main);
  
    const response =  await fetch(url, HEADERS_GET_GZIP);
    return await response.json();
  }


  async bulkGetApi() {
    const response = await fetch(`${this.bulkGetUrl}`, HEADERS_GET_GZIP);
    return await response.json();
  }
  
  
  async getCardItemAltApi(
    id: number,
    itemType: EItemType,
    itemTypeAlt: EItemType
  ) {
    const url = new URL(`${this.baseUrl}/${this.cardItemUrl}`);
  
    url.searchParams.append('id', String(id));
    url.searchParams.append('type', itemType);
    url.searchParams.append('type_alt', itemTypeAlt);
  
    const response =  await fetch(url, HEADERS_GET_GZIP);
    return await response.json();
  }
  
  async getChoicesApi(
    id: number,
    itemType: EItemType,
    choice_options: Array<EItemType>
  ) {
    const url = new URL(`${this.baseUrl}/${this.choicesUrl}`);
  
    url.searchParams.append('id', String(id));
    url.searchParams.append('type', itemType);
    url.searchParams.append('options', choice_options.join('-'));
  
    const response = await fetch(url, HEADERS_GET_GZIP);
    return await response.json();
  }
}


export { AnimeApi };

