/**
 * Object representation of a user
 */
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
};
/**
 * object, when trying to pass login information
 */
export type LogInUser = {
  email: string;
  password: string;
};
