import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
export const eventsQuery = groq`*[_type == "event" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}
export async function getEvents(client: SanityClient): Promise<Event[]> {
  return await client.fetch(eventsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`
export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}
export async function getEvent(
  client: SanityClient,
  slug: string,
): Promise<Event> {
  return await client.fetch(eventBySlugQuery, {
    slug,
  })
}
export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`
export const eventSlugsQuery = groq`
*[_type == "event" && defined(slug.current)][].slug.current
`
export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  type: 'e vent' | 'Educational Tour' | 'Event' // Specify the allowed values here
  slug: Slug
  date: string
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
