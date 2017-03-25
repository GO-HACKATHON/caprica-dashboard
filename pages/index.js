import {Component, PropTypes} from 'react'
import db from '../util/db'
// import withHighscore from '../util/with-highscore'
import withEvents from '../util/with-events.js'
import Head from 'next/head'

export default withEvents(({accidents}) => (
  <div>
    <Head><title>Caprica Dashboard</title></Head>

    <h1>Caprica Dashboard</h1>

    <h2>Accidents</h2>
    {
      accidents.map(({user_id: userId, latitude, longitude, speed, created_at: time}, idx) => (
        <div key={idx}>Accident happened: User {userId} - speed: {speed}, at {latitude}, {longitude}</div>
      ))
    }
  </div>
))
