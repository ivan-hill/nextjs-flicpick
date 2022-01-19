import axios from 'utils/axios'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Card from 'components/Card/card'

export default () => {
  const [tvList, setTvList] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const fetchMore = (page) => {
    if (page >= 500) {
      setHasMore(false)
    }
    axios
      .get('discover/tv', {
        params: { api_key: process.env.API_KEY, page }
      })
      .then((res) => {
        setTvList(
          tvList.concat(res.data.results.filter((tv) => tv.poster_path != null))
        )
      })
  }

  return (
    <div className="container">
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchMore.bind(this)}
        hasMore={hasMore}
        threshold={1000}
        loader={
          <div key={0} className="loader">
            <h4>Loading...</h4>
          </div>
        }
      >
        <div className="row center-xs">
          {tvList.map((tv) => (
            <div className="col-xs" key={tv.id}>
              <Card
                card_type="tv"
                id={tv.id}
                title={tv.name}
                poster_path={tv.poster_path}
                release_date={tv.first_air_date}
                overview={tv.overview}
                vote_average={tv.vote_average}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
