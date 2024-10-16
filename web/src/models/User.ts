import moment from 'moment';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
  'with the appropriate user keys.';


// **** Types **** //
export enum Gender{
  MALE,
  FEMALE
}

export interface IUser {
  // id: number;
  // name: string;
  // email: string;
  // created: Date;
  id: string;
  username: string;
  email: string;
  gender: Gender;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  id?: string,
  username?: string,
  email?: string,
  gender?: Gender, // id last cause usually set by db
): IUser {
  return {
    id: (id ?? ''),
    username: (username ?? ''),
    email: (email ?? ''),
    gender: (gender ? Gender.FEMALE)
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  if (isUser(param)) {
    return new_(param.name, param.email, param.created, param.id);
  }
  throw new Error(INVALID_CONSTRUCTOR_PARAM);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'string' &&
    'email' in arg && typeof arg.email === 'string' &&
    'username' in arg && typeof arg.username === 'string'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
