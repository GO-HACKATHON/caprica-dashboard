import {Component, PropTypes} from 'react'
import db from '../util/db'
// import withHighscore from '../util/with-highscore'
import withEvents from '../util/with-events.js'
import Head from 'next/head'
import List from '../layout/list';

export default withEvents(({accidents}) => (
  <div>
    <Head>
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
        <link rel="stylesheet" href="/static/tachyons.min.css"/>
        <title>Caprica Dashboard</title>
    </Head>

    <h1>Caprica Dashboard</h1>
    <List accidents={accidents}/>
    {/* <h2>Accidents</h2>
    {
      accidents.map(({user_id: userId, latitude, longitude, speed, created_at: time}, idx) => (
        <div key={idx}>Accident happened: User {userId} - speed: {speed}, at {latitude}, {longitude}</div>
      ))
    } */}
  </div>
))
