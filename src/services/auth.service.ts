import { Service } from 'typedi';

import { ICredentials } from '../interfaces/auth.interface';
import { hashPassword } from '../utils/auth.util';
import { AuthUser } from '../database/models/auth-user.model';
import { compareSync } from 'bcrypt';

@Service()
export class AuthService {
  /**
   * @method register
   * @async
   * @param {ICredentials} authDetails
   * @returns {Promise<ICredentials>}
   */
  async register(authDetails: ICredentials): Promise<void> {
    authDetails.password = await hashPassword(authDetails.password);
    await AuthUser.create(authDetails);
  }

  /**
   * @method
   * @async
   * @param {ICredentials} authDetails
   * @returns {Promise<boolean>}
   */
  async login(authDetails: ICredentials): Promise<boolean> {
    const auth = await AuthUser.findOne({ emailAddress: authDetails.emailAddress });
    if (!auth) {
      return false;
    }

    return compareSync(authDetails.password, auth.password);
  }

  /**
   * @method checkIfAccountExists
   * @private
   * @param {string} email
   * @returns {Promise<IUser>}
   */
  async checkIfAccountExists(email: string): Promise<boolean> {
    return !!(await AuthUser.findOne({ emailAddress: email }));
  }
}
