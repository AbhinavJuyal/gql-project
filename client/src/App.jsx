import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import DisplayData from "./DisplayData";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Toaster
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            fontSize: ".7rem",
            fontWeight: "bold",
            height: "50px",
          },
        }}
      />
      <div className="App font-bold">GQL PROJECT</div>
      <DisplayData />
    </ApolloProvider>
  );
}

export default App;
