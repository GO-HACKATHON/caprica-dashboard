import {Component} from 'react'
import db from './db'
import axios from 'axios'
import _ from 'underscore'
import asyncauto from 'async'

const GOJEK_NEAREST_DRIVER_URL = 'https://api.gojekapi.com/gojek/service_type/1/drivers/nearby?location='

const withEvents = (fn) => (
  class extends Component {
    static async getInitialProps () {
      const users = await db.ref('users').once('value')
      const usersVal = users.val()
      const listOfUsers = await Object.keys(usersVal).map(key => usersVal[key]).sort((a, b) => b.created_at - a.created_at)

      const warnings = await db.ref('warnings').once('value')
      const warningsVal = warnings.val()
      const listOfWarnings = Object.keys(warningsVal).map(key => warningsVal[key]).sort((a, b) => b.created_at - a.created_at)
      
      const ref = db.ref('accidents')
      const accidents = await ref.once('value')
      const accidentsVal = accidents.val()
      const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key] ).sort((a, b) => b.created_at - a.created_at)

      // const listOfCompleteAccidents = await listOfAccidents.map(async accident => {
      //   const {latitude, longitude} = accident
        
      //   await axios.get(GOJEK_NEAREST_DRIVER_URL + longitude + ',' + latitude)
      //     .then(function (response) { 
      //       return _.extend(accidentsVal[key], { nearby_drivers: response.data  })
      //     } )
      //     .catch(function (error) { return error } )
      // })

      return {
        accidents: listOfAccidents,
        users: listOfUsers,
        warnings: listOfWarnings
      }
    }

    constructor (props) {
      super(props)
      this.state = Object.assign({}, props)
      this.onUpdateAccident = this.onUpdateAccident.bind(this)
      this.onUpdateUser = this.onUpdateUser.bind(this)
      this.onUpdateWarning = this.onUpdateWarning.bind(this)
    }

    componentDidMount () {
      db.ref('accidents').on('value', this.onUpdateAccident)
      db.ref('users').on('value', this.onUpdateUser)
      db.ref('warnings').on('value', this.onUpdateWarning)
    }

    componentWillUnmount () {
      db.ref('accidents').off('value', this.onUpdateAccident)
      db.ref('users').off('value', this.onUpdateUser)
      db.ref('warnings').off('value', this.onUpdateWarning)
    }

    onUpdateAccident (accidents) {
      const accidentsVal = accidents.val()
      const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at)

      this.setState({ accidents: listOfAccidents })
    }

    onUpdateUser (users) {
      const usersVal = users.val()
      const listOfUsers = Object.keys(usersVal).map(key => usersVal[key]).sort((a, b) => b.created_at - a.created_at)
      this.setState({ users: listOfUsers })
    }

    onUpdateWarning (warnings) {
      const warningsVal = warnings.val()
      const listOfWarnings = Object.keys(warningsVal).map(key => warningsVal[key]).sort((a, b) => b.created_at - a.created_at)
      this.setState({ warnings: listOfWarnings })
    }

    render () {
      return fn(this.state)
    }
  }
)

export default withEvents
