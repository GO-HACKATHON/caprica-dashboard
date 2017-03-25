import {Component, PropTypes} from 'react'
import db from '../util/db'
// import withHighscore from '../util/with-highscore'
import withEvents from '../util/with-events.js'
import Head from 'next/head'
import List from '../layout/list';

export default withEvents(({accidents}) => (
  <div className="main min-h-100">
    <Head>
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel="stylesheet" href="/static/tachyons.min.css"/>
      <title>Caprica Dashboard</title>
    </Head>

    <main className="mw7 center black-80 ph4 pv5 min-h-100">
    <h1>Caprica Dashboard</h1>
    <h2>Accidents</h2>
    <List accidents={accidents}/>

    <h2>Events</h2>

    <h2>Helmet events</h2>
  </main>
  <style jsx>{
    `
    .main {
      background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
      min-height: 100vh;
    }
    `
  }</style>
  </div>
))
