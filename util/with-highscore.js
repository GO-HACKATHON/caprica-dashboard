import {Component} from 'react'
import db from './db'

const withHighscore = (fn) => (
  class extends Component {
    static async getInitialProps () {

      const ref = db.ref('scores')
      const scores = await ref.once('value')
      const scoresVal = scores.val()
      const listOfScores = Object.keys(scoresVal).map(key => scoresVal[key]).sort((a, b) => b.score - a.score)
      return {
        scores: listOfScores
      }
    }

    constructor (props) {
      super(props)
      this.state = Object.assign({}, props)
      this.onUpdateScore = this.onUpdateScore.bind(this)
    }

    componentDidMount () {
      db.ref('scores').on('value', this.onUpdateScore)
    }

    componentWillUnmount () {
      db.ref('scores').off('value', this.onUpdateScore)
    }

    onUpdateScore (scorebaru) {
      const scores = scorebaru.val()
      const listOfScores = Object.keys(scores).map(key => scores[key]).sort((a, b) => b.score - a.score)
      this.setState({ scores: listOfScores })
    }

    render () {
      return fn(this.state)
    }
  }
)

export default withHighscore
