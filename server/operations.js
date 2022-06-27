const { UsersList, MoviesList } = require("./db");

const getLists = (type) => {
  const cases = {
    users: () => UsersList,
    movies: () => MoviesList,
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cases[type]());
    }, 1000);
  });
};

const createItem = (type, newUser) => {
  const cases = {
    users: () => UsersList.push({ ...newUser, id: UsersList.length + 1 }),
    movies: () => MoviesList.push({ ...newUser, id: MoviesList.length + 1 }),
  };
  const id = cases[type]();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, ...newUser });
    }, 1000);
  });
};

const updateItem = (type, id, newObj) => {
  const cases = {
    users: () => {
      const index = UsersList.findIndex((user) => user.id === parseInt(id));
      UsersList[index] = { ...UsersList[index], ...newObj };
      return UsersList;
    },
    movies: () => () => {
      const index = MoviesList.findIndex((user) => user.id === parseInt(id));
      MoviesList[index] = { ...MoviesList[index], ...newObj };
      return MoviesList;
    },
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cases[type]());
    }, 1000);
  });
};

const deleteItem = (type, id) => {
  const cases = {
    users: () => {
      const index = UsersList.findIndex((user) => user.id === parseInt(id));
      if (index > -1) {
        UsersList.splice(index, 1);
      }
      return UsersList;
    },
    movies: () => {
      const index = MoviesList.findIndex((user) => user.id === parseInt(id));
      if (index > -1) {
        MoviesList.splice(index, 1);
      }
      return MoviesList;
    },
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cases[type]());
    }, 1000);
  });
};

module.exports = { getLists, createItem, deleteItem, updateItem };
