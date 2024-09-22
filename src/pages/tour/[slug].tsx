import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getTour,
  type Tour,
  tourBySlugQuery,
  tourSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tour: Tour
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const tour = await getTour(client, params.slug)

  if (!tour) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      tour,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [tour] = useLiveQuery(props.tour, tourBySlugQuery, {
    slug: props.tour.slug.current,
  })

  return (
    <Container>
      <section className="tour">
        <div className="tour__container">
          <h1 className="tour__title">{tour.title}</h1>
          <p className="tour__excerpt">{tour.excerpt}</p>
          <p className="tour__date red">{formatDate(tour.date)}</p>
          <div className="tour__content">
            <PortableText value={tour.body} />
          </div>{' '}
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(tourSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/tour/${slug}`) || [],
    fallback: 'blocking',
  }
}
