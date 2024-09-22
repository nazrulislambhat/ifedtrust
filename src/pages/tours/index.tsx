import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getTours, type Tour, toursQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    tours: Tour[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const tours = await getTours(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      tours,
    },
  }
}

export default function Tours(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [tours] = useLiveQuery<Tour[]>(props.tours, toursQuery)
  return (
    <Container>
      <section className="flex justify-center gap-8 ">
        {tours.length ? (
          tours.map((tour) => <Card key={tour._id} tour={tour} />)
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
