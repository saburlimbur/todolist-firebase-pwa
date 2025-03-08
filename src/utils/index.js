import { faker } from "@faker-js/faker";

export const generateRandomAvatar = (uid) => {
  return faker.image.avatar();
};
