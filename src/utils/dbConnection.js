import dbData from './fakeBakckend.json';

export const getUser = (id) => {
  return dbData.users.find((user) => user.id === id);
};

export const getCollection = (id) => {
  return dbData.collections.find((collection) => collection.id === id);
};

export const getUserCollections = (userId) => {
  return dbData.collections.filter((colleciton) => colleciton.id_user === userId);
};
