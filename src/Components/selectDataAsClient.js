import axios from "axios";
import React from "react";
import "./App.css";

const baseURL = "http://www.omdbapi.com/?apikey=81c55880&";

function SelectedData() {
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
