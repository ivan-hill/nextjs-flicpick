import Link from 'next/link'
import slug from 'slug'
import VoteChart from '../VoteChart/voteChart'

const Card = ({
  card_type,
  id,
  title,
  release_date,
  poster_path,
  overview,
  vote_average
}) => {
  return (
    <div className="card">
      <div className="card-img">
        <Link href={`/${card_type}/[slug]`} as={`/${card_type}/${slug(title)}-${id}`}>
          <a>
            <img
              src={`https://image.tmdb.org/t/p/w342${poster_path}`}
              title={title}
              alt={title}
            />
          </a>
        </Link>
        <VoteChart voteAverage={vote_average * 10} className="vote-chart-index" />
      </div>
      <div className="card-body">
        <Link href={`/${card_type}/[slug]`} as={`/${card_type}/${slug(title)}-${id}`}>
          <a>
            <h2>{title}</h2>
          </a>
        </Link>
        <p className="release-data">{release_date}</p>
        <div className="overview">
          <p>{overview}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
