import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  console.log(state)

  // const post = useSelector(
  //   state.posts.posts.find(
  //     (post) =>
  //       console.log(post.id.toString(), postId) && post.id.toString() === postId
  //   )
  // )

  if (!post) {
    return (
      <section>
        <h2>Movie not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p>Release date: {post.release_date}</p>
      </article>
      <Link to="/">Select another movie</Link>
    </section>
  )
}
