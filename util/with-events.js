import {Component} from 'react'
import db from './db'

const withEvents = (fn) => (
  class extends Component {
    static async getInitialProps () {

      const ref = db.ref('accidents')
      const accidents = await ref.once('value')
      const accidentsVal = accidents.val()
      const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at)
      return {
        accidents: listOfAccidents
      }
    }

    constructor (props) {
      super(props)
      this.state = Object.assign({}, props)
      this.onUpdateScore = this.onUpdateScore.bind(this)
    }

    componentDidMount () {
      db.ref('accidents').on('value', this.onUpdateScore)
    }

    componentWillUnmount () {
      db.ref('accidents').off('value', this.onUpdateScore)
    }

    onUpdateScore (accidents) {
      const accidentsVal = accidents.val()
      const listOfAccidents = Object.keys(accidentsVal).map(key => accidentsVal[key]).sort((a, b) => b.created_at - a.created_at)
      this.setState({ accidents: listOfAccidents })
    }

    render () {
      return fn(this.state)
    }
  }
)

export default withEvents
