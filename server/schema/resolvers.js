// all the functions which makes the call to database.
// all the functions which decide what we return to the frontend
// all the functions which are reponsible for running queries to the db
// all the functions which are reponsible for running mutations to the db
// etc. comes under resolvers.
const {
  getLists,
  createItem,
  deleteItem,
  updateItem,
} = require("../operations");
const dataURL = "https://jsonplaceholder.typicode.com/users";

const resolvers = {
  Query: {
    users: async () => {
      const res = await getLists("users");
      return res;
    },
    // users: async () => {
    //   const res = await getLists("users");
    //   // const res = null;
    //   if (res) {
    //     return { users: res };
    //   }
    //   return { error: "There was a problem with the resolver." };
    // },
    user: async (_, { id }) => {
      const res = await getLists("users");
      return res.find((user) => user.id === parseInt(id));
    },
    movies: async () => {
      const res = await getLists("movies");
      return res;
    },
    movie: async (_, { name }) => {
      const res = await getLists("movies");
      return res.find(
        (movie) => movie.name.toLowerCase() === name.toLowerCase()
      );
    },
  },
  User: {
    favouriteMovies: async (parents, args, context) => {
      console.log(context);
      const res = await getLists("movies");
      const date = new Date("Aug 28 1998");
      return res.filter((movie) => {
        const movieDate = new Date(movie.yearOfRelease);
        return movieDate >= date;
      });
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = {
        name: input.name,
        username: input.username,
        age: Number(input.age),
        email: input.email,
        phone: input.phone,
        nationality: input.nationality,
      };
      const res = await createItem("users", newUser);
      return newUser;
    },

    updateUserName: async (_, { input }) => {
      const { id, username } = input;
      const res = await updateItem("users", id, { username });
      return res;
    },

    deleteUser: async (_, { id }) => {
      const res = await deleteItem("users", id);
      return res;
    },
  },

  // UsersResult: {
  //   __resolveType(obj) {
  //     if (obj.users) {
  //       return "UsersSuccess";
  //     }
  //     if (obj.error) {
  //       return "UsersError";
  //     }
  //   },
  // },
};

module.exports = { resolvers };
