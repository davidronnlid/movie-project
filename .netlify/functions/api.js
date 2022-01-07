let movie_data = () =>
  fetch(
    `https://api.themoviedb.org/3/discover/movie?${process.env.MOVIEDB_API_KEY}`
  )
    .then((response) => {
      console.log('response:', response)
      response.json()
    })
    .then((json) => {
      console.log(json)
      return json.api
    })

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      api: movie_data,
    }),
  }
}
