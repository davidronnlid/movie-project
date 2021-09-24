import axios from "axios";
import React from "react";
import "./App.css";

const baseURL = "http://www.omdbapi.com/?apikey=81c55880&";
// Use redux to set a variable here to the user-updated (in selectDataAsClient component) api search string

function Data() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  console.log(post);

  if (!post) return null;

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export default App;

// SelectedData should send data to this file's component concerning which user query was entered.
