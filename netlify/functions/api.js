export async const api_key_exporter = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      api: process.env.MOVIEDB_API_KEY,
    }),
  }
}
