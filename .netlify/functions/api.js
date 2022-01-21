import fetch from 'node-fetch'

const API_ENDPOINT = 'https://api.themoviedb.org/3/discover/movie?api_key='
const API_KEY = process.env.MOVIEDB_API_KEY

exports.handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT + API_KEY)
    console.log(response)

    const data = await response.json()
    console.log('Data', data)
    return { statusCode: 200, body: JSON.stringify({ data }) }
  } catch (error) {
    console.log('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
