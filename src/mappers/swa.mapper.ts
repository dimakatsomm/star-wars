import { ICharacter } from '../interfaces/star-wars.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapPeopleToCharacter = (people: any): ICharacter => {
  console.log(people);
  return {
    name: people.name,
    age: people.birth_year,
  };
};
