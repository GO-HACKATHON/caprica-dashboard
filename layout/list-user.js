import Head from 'next/head'
import hash from '../util/hashUserId';
const ListUser = ({users}) => {
  return (
    <div>

    {
      users.map(({name, is_connected: available, created_at: time}, idx) => {
        const hashed = hash(idx)
        
        if (available) {
          return (
            <article key={idx} className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
              <div className="dtc w2 w3-ns v-mid">
                <img src={`http://mrmrs.io/photos/p/${hashed + 1}.jpg`} className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
              </div>
              <div className="dtc v-mid pl3">
                <h2 className="f6 fw4 mt0 mb0 black-60">User {name} is connected</h2>
              </div>
            </article>
          )
        }
      })
    }

</div>
  )
}

export default ListUser
