import { Service } from 'typedi';

import { ICreateUser } from '../interfaces/user.interface';
import { IUser } from '../database/types/user.type';
import { User } from '../database/models/user.model';

@Service()
export class UserService {
  /**
   * @method createUser
   * @async
   * @param {ICreateUser} userDetails
   * @returns {Promise<IUser>}
   */
  async createUser(userDetails: ICreateUser): Promise<IUser> {
    const user = await User.create(userDetails);
    return user as IUser;
  }

  /**
   * @method checkIfUserExists
   * @param {string} userId
   * @returns {Promise<IUser>}
   */
  checkIfUserExists(userId: string): Promise<IUser | null> {
    return User.findOne({ _id: userId });
  }

  /**
   * @method checkIfUserExistsByEmail
   * @param {string} email
   * @returns {Promise<IUser>}
   */
  checkIfUserExistsByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ emailAddress: email });
  }
}
