import {Component, PropTypes} from 'react'
import db from '../util/db'
import withEvents from '../util/with-events.js'
import Head from 'next/head'
import List from '../layout/list';
import ListUser from '../layout/list-user';
import ListWarning from '../layout/list-warning';

export default withEvents(({accidents, users, warnings}) => (
  <div className="main min-h-100">
    <Head>
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel="stylesheet" href="/static/tachyons.min.css"/>
      <title>Caprica Dashboard 🌏</title>
    </Head>

    <main className="mw7 center black-80 ph4 pv5 min-h-100">
    <h1>Caprica Dashboard 🌏</h1>
    <h2>Recent Accidents</h2>
    <List accidents={accidents}/>

    <h2>Available Drivers</h2>
    <ListUser users={users}/>

    <h2>Recent Speed Warning</h2>
    <ListWarning warnings={warnings}/>
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
