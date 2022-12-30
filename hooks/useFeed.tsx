import { BareFetcher } from 'swr'
import useSWRInfinite from 'swr/infinite'

export interface FeedItem {
  readonly url: string
  readonly title: string
  readonly name: string
  readonly publishedAt: string
}

const fetcher: BareFetcher<ReadonlyArray<FeedItem>> = async (input: string) => {
  const response = await fetch(input)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(
      `Could not retrieve ${input} due to HTTP code ${response.status}.`
    )
    console.error(error, data)

    throw error
  }

  return data
}

export interface UseFeedOptions {
  readonly size?: number
  readonly categories?: number
}

export const useFeed = ({ categories = 255, size = 10 }: UseFeedOptions) => {
  return useSWRInfinite(
    (index) =>
      `https://news-api.inkohx.dev/?size=${size}&categories=${categories}&skip=${
        size * index
      }`,
    fetcher
  )
}
