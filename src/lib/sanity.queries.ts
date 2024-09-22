import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const toursQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getTours(client: SanityClient): Promise<Tour[]> {
  return await client.fetch(toursQuery)
}

export const tourBySlugQuery = groq`*[_type == "tour" && slug.current == $slug][0]`

export async function getTour(
  client: SanityClient,
  slug: string,
): Promise<Tour> {
  return await client.fetch(tourBySlugQuery, {
    slug,
  })
}

export const tourSlugsQuery = groq`
*[_type == "tour" && defined(slug.current)][].slug.current
`
export interface Tour {
  _type: 'tour'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  date: string
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
