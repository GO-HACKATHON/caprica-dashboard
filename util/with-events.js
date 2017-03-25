import {Component} from 'react'
import db from './db'

const withEvents = (fn) => (
  class extends Component {
    static async getInitialProps () {

      const ref = db.ref('accidents')
      const accidents = await ref.once('value')
      const accidentsVal = accidents.val()
      const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at)

      const users = await db.ref('users').once('value')
      const usersVal = users.val()
      const listOfUsers = Object.keys(usersVal).map(key => usersVal[key]).sort((a, b) => b.created_at - a.created_at)

      return {
        accidents: listOfAccidents,
        users: listOfUsers 
      }
    }

    constructor (props) {
      super(props)
      this.state = Object.assign({}, props)
      this.onUpdateAccident = this.onUpdateAccident.bind(this)
      this.onUpdateUser = this.onUpdateUser.bind(this)
    }

    componentDidMount () {
      db.ref('accidents').on('value', this.onUpdateAccident)
      db.ref('users').on('value', this.onUpdateUser)
    }

    componentWillUnmount () {
      db.ref('accidents').off('value', this.onUpdateAccident)
      db.ref('users').off('value', this.onUpdateUser)
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

    render () {
      return fn(this.state)
    }
  }
)

export default withEvents
