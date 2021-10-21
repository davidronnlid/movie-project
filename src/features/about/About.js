import React from 'react'
import ConfidentSmile from './ConfidentSmile.png'

export const About = () => (
  <div style={{ textAlign: 'center' }}>
    <h2>
      About{' '}
      <a href="https://github.com/davidronnlid/movie-project">
        project <i className="fa fa-github"></i>
      </a>
    </h2>
    <p>
      Hey! This is me,{' '}
      <a href="https://www.linkedin.com/in/davidronnlid/">
        David Rönnlid <i className="fa fa-linkedin" aria-hidden="true"></i>
      </a>
    </p>
    <img
      src={ConfidentSmile}
      className="large-centered-rounded-img"
      style={{
        objectFit: 'cover',
        objectPosition: '-10% 20%',
        border: '2px solid black',
        width: '180px',
        height: '180px',
      }}
      alt="David Rönnlid smiling confidently"
    />
    <p style={{ width: '60vw', margin: 'auto' }}>
      I created this movie selection app for two <b>reasons</b>.<br /> These are
      1. for <b> practice</b>, and 2. to <b>show competence</b> with{' '}
      <span className="larger-text">Redux state management</span> as well as{' '}
      <span className="larger-text">handling 3rd-party API data fetching</span>.
    </p>
  </div>
)
