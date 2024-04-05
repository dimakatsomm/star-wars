import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';

import { handleError } from '../utils/error.util';
import { ICharacter } from '../interfaces/star-wars.interface';
import { UserService } from '../services/user.service';
import { SWAService } from '../services/external/swa.service';

@Service()
export class SWAController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject() private swaService: SWAService,
    @Inject() private userService: UserService,
  ) {}

  /**
   * @method register
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  getCharacters = async (req: Request, res: Response) => {
    try {
      const userExists = !!(await this.userService.checkIfUserExists(req.auth.userId));
      if (!userExists) {
        return res.status(403).json({ status: false, data: { message: `Username does not exist.` } });
      }

      const characters: ICharacter[] = await this.swaService.listCharacters(req.query?.search as string);

      return res.status(200).json(characters);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      handleError(res, e);
    }
  };
}
