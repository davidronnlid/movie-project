import fetch from 'node-fetch'

const API_ENDPOINT = 'https://api.themoviedb.org/3/discover/movie'
const API_KEY = '?api_key=' + process.env.MOVIEDB_API_KEY

exports.handler = async (event, context) => {
  try {
    const PAGE = '&page=' + event.queryStringParameters.page

    const response = await fetch(API_ENDPOINT + API_KEY + PAGE)
    console.log('Response log', response)

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
