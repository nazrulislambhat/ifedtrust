import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Tour } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ tour }: { tour: Tour }) {
  return (
    <div className="card shadow-2xl ">
      <div className="card__container">
        <h3 className="card__title">
          <a
            className="card__link text-red-700 text-3xl"
            href={`/tour/${tour.slug.current}`}
          >
            {tour.title}
          </a>
        </h3>

        <p className="card__excerpt">{tour.excerpt}</p>
        <p className="card__date red">{formatDate(tour.date)}</p>
      </div>
    </div>
  )
}
