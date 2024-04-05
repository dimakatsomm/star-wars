import axios from 'axios';
import { Service } from 'typedi';

import * as C from '../../constants/index';
import { ICharacter } from '../../interfaces/star-wars.interface';
import { mapPeopleToCharacter } from '../../mappers/swa.mapper';
import { redisClient } from '../../index';

@Service()
export class SWAService {
  private CHARACTER_INSTANCE = axios.create({ baseURL: `${C.STAR_WARS_API}/people` })

  /**
   * @method listCharacters
   * @async
   * @param {string} search
   * @returns {Promise<Array<ICharacter>>}
   */
  async listCharacters(search: string): Promise<Array<ICharacter>> {
    const characters = await this.checkIfSearchExists(search);
    if (characters?.length) {
      return characters;
    }

    const peopleDetail: [] = await this.CHARACTER_INSTANCE.get(`/?search=${search}`);
    const characterDetails = peopleDetail.map(character => mapPeopleToCharacter(character));

    redisClient.set(search, characterDetails.toString(), { EX: C.REDIS_TTL });
    return characterDetails;
  }

  /**
   * @method checkIfSearchExists
   * @private
   * @async
   * @param {string} search
   * @returns {Promise<Array<ICharacter>>}
   */
  private async checkIfSearchExists(search: string): Promise<Array<ICharacter>> {
    return JSON.parse(await redisClient.get(search) || '[]') as ICharacter[];
  }
}
