import { ICharacter } from "../interfaces/star-wars.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapPeopleToCharacter = (people: any): ICharacter => {
  return {
    name: people.firstName,
    age: people.date_of_birth,
  };
};
