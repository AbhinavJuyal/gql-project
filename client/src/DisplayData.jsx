import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      name
      username
      email
      phone
      nationality
    }
  }
`;
// const QUERY_ALL_USERS = gql`
//   query GetAllUsers {
//     users {
//       ... on UsersSuccess {
//         users {
//           name
//           username
//           email
//           phone
//           nationality
//         }
//       }
//       ... on UsersError {
//         error
//       }
//     }
//   }
// `;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
      yearOfRelease
    }
  }
`;

const QUERY_GET_MOVIE = gql`
  query GetMovie($input: String!) {
    movie(name: $input) {
      name
      yearOfRelease
    }
  }
`;

const MUTATION_CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      email
      age
    }
  }
`;

const CreateUser = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [createUser, { data, loading, error }] = useMutation(
    MUTATION_CREATE_USER,
    {
      refetchQueries: [
        {
          query: QUERY_ALL_USERS,
        },
      ],
    }
  );
  return (
    <>
      <div className="w-100 m-2">
        <h3 className="text-2xl font-bold ml-2">Create User</h3>
        <form className="flex flex-col">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="border-blue-500 border-2 p-2 m-2"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="border-blue-500 border-2 p-2 m-2"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="border-blue-500 border-2 p-2 m-2"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="border-blue-500 border-2 p-2 m-2"
            type="text"
            placeholder="Phone"
          />
          <input
            onChange={(e) => {
              setAge(Number(e.target.value));
            }}
            className="border-blue-500 border-2 p-2 m-2"
            type="number"
            placeholder="Age"
          />
          <select
            onChange={(e) => {
              const temp = e.target.options;
              setNationality(temp[temp.selectedIndex].value);
            }}
            className="border-blue-500 border-2 p-2 m-2"
          >
            <option value="INDIA">INDIA</option>
            <option value="CZECH">CZECH</option>
            <option value="DUBAI">DUBAI</option>
            <option value="BRAZIL">BRAZIL</option>
            <option value="USA">USA</option>
            <option value="GERMANY">GERMANY</option>
          </select>
          <button
            className="text-sm border-black border-2 p-2 ml-auto"
            type="button"
            onClick={() => {
              createUser({
                variables: {
                  input: {
                    name,
                    username,
                    age,
                    email,
                    phone,
                    nationality,
                  },
                },
              });
            }}
          >
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

const UsersList = () => {
  const {
    data: data,
    loading: loading,
    error: error,
  } = useQuery(QUERY_ALL_USERS);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="w-100 m-2">
      {!loading &&
        data &&
        data.users.map((user, idx) => {
          return (
            <div key={idx} className="p-2 m-2 border-2 border-black">
              <h3>{user.name}</h3>
              <h5>{user.username}</h5>
              <h5>{user.email}</h5>
              <h5>{user.phone}</h5>
              <h5>{user.nationality}</h5>
            </div>
          );
        })}
    </div>
  );
};

const MoviesList = () => {
  const {
    data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useQuery(QUERY_ALL_MOVIES);

  useEffect(() => {
    if (moviesError) {
      toast.error(moviesError.message);
    }
  }, [moviesError]);

  return (
    <>
      {!moviesLoading &&
        moviesData &&
        moviesData.movies.map((movie, idx) => {
          return (
            <div key={idx} className="p-2 m-2 border-2 border-black">
              <h3>{movie.name}</h3>
              <h5>{movie.yearOfRelease}</h5>
            </div>
          );
        })}
    </>
  );
};

const MovieSearch = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const [fetchMovie, { data: movieSearchResult, error: movieSearchError }] =
    useLazyQuery(QUERY_GET_MOVIE);

  useEffect(() => {
    if (movieSearchError) {
      toast.error(movieSearchError.message);
    }
  }, [movieSearchError]);

  useEffect(() => {
    setMovieSearch("");
  }, [movieSearchResult]);

  return (
    <>
      <div className="flex">
        <input
          type="text"
          className="border-blue-500 border-2 p-2 m-2 my-0"
          placeholder="Search for a movie.."
          onChange={(e) => {
            setMovieSearch(e.target.value);
          }}
        />
        <button
          className="text-xs border-black border-2 px-2"
          type="button"
          onClick={() => {
            fetchMovie({
              variables: {
                input: movieSearch,
              },
            });
          }}
        >
          Search
        </button>
      </div>
      {movieSearchResult && (
        <div className="p-2 m-2 border-2 border-teal-500">
          <h3>{movieSearchResult.movie.name}</h3>
          <h5>{movieSearchResult.movie.yearOfRelease}</h5>
        </div>
      )}
    </>
  );
};

const DisplayData = () => {
  return (
    <>
      <div className="flex justify-around">
        <CreateUser />
        <UsersList />
        <div className="w-100 m-2">
          <MovieSearch />
          <MoviesList />
        </div>
      </div>
    </>
  );
};

export default DisplayData;
