import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';

import * as C from '../constants';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { generateJwtToken } from '../utils/auth.util';
import { IUser } from '../database/types/user.type';
import { ICredentials } from '../interfaces/auth.interface';
import { handleError } from '../utils/error.util';

@Service()
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject() private authService: AuthService,
    @Inject() private userService: UserService,
  ) {}

  /**
   * @method register
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  register = async (req: Request, res: Response) => {
    try {
      const newUser = req.body;

      const accountExists = await this.authService.checkIfAccountExists(newUser.emailAddress);
      if (accountExists) {
        return res.status(409).json({ status: false, data: { message: `Email address is already in use.` } });
      }

      const userExists = !!(await this.userService.checkIfUserExistsByEmail(newUser.emailAddress));
      if (userExists) {
        return res.status(409).json({ status: false, data: { message: `Email address is already in use.` } });
      }

      await this.authService.register({
        emailAddress: newUser.emailAddress,
        password: newUser.password,
      });

      delete newUser.password;
      const user: IUser = await this.userService.createUser(newUser);
      const token = generateJwtToken({ userId: user.id, email: user.emailAddress }, C.JWT_LOGIN_EXPIRES_IN);

      return res.status(201).json({ user, token });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      handleError(res, e);
    }
  };

  /**
   * @method login
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  login = async (req: Request, res: Response) => {
    try {
      const credentials = req.body as ICredentials;
      if (!credentials?.emailAddress) {
        return res.status(400).json({ status: false, data: { message: `No email provided for login.` } });
      }

      const correctPassword: boolean = await this.authService.login(credentials);
      if (!correctPassword) {
        return res.status(403).json({ status: false, data: { message: `User login details provided are incorrect.` } });
      }

      const user = await this.userService.checkIfUserExistsByEmail(credentials.emailAddress);
      if (!user) {
        return res.status(400).json({ status: false, data: { message: `User login details provided are incorrect.` } });
      }

      const token = generateJwtToken({ userId: user.id }, C.JWT_LOGIN_EXPIRES_IN);

      return res.status(200).json({ status: true, data: { user, token } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      handleError(res, e);
    }
  };
}
