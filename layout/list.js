import Head from 'next/head'
import hash from '../util/hashUserId';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps'
import _ from 'underscore'

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

const params = {v: '3.exp', key: process.env.GMAPS_API_KEY};

const List = ({accidents}) => {
  return (
    <div>

    {
      accidents.map(({user_id: userId, latitude, longitude, speed, created_at: time, nearby_drivers: nearbyDrivers}, idx) => {
        const hashed = hash(Math.random().toString(36).substring(7))

        const InfoWindows = _.map(nearbyDrivers, function (nearbyDriver, index) {
          console.log(nearbyDriver)

          return (
            <InfoWindow
              lat={latitude}
              lng={longitude}
              content={'Driver {index}'}/>
          )
        })

        const maps = (
          <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
          <Gmaps
              width={'100%'}
              height={'24rem'}
              lat={latitude}
              lng={longitude}
              zoom={15}
              loadingMessage={'Be happy'}
              params={params}>
              {InfoWindows}
            </Gmaps>
          </article>
        )

        const timestamp = new Date(time).toString()

        if (idx < 5) {
          return (
            <div key={idx}>
            <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
              <div className="dtc w2 w3-ns v-mid">
                <img src={`http://mrmrs.io/photos/p/${hashed + 1}.jpg`} className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
              </div>
              <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">Accident at {latitude}, {longitude}.</h1>
                <h2 className="f6 fw4 mt0 mb0 black-60">User @{userId} with speed {speed}kph. {timestamp}</h2>
              </div>
              <div className="dtc v-mid pl3">
              </div>

              <div className="dtc v-mid">
                <form className="w-100 tr">
                  <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" onClick={() => console.log(`Sending help to user ${userId}`)}>+ Send Help</button>
                </form>
              </div>
            </article>
            {maps}
          </div>
          )
        }
      })
    }

</div>
  )
}

export default List
