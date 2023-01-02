import React from 'react'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import { useFeed } from '../hooks'
import { useRecoilState } from 'recoil'
import { categoriesState } from '../state'

export default function Page() {
  const [categories] = useRecoilState(categoriesState)
  const { data, error, isLoading, setSize } = useFeed({ categories })
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const hasNextData = (data?.at(-1)?.length ?? 0) > 0

        if (entry?.isIntersecting && hasNextData) {
          setSize((size) => size + 1)
        }
      },
      { threshold: 0 }
    )

    intersectionObserver.observe(ref.current)
    return () => intersectionObserver.disconnect()
  }, [data, setSize])

  const dateFormat = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    dateStyle: 'long',
    timeStyle: 'medium',
  }).format

  return (
    <div className="my-4">
      <div className="mx-auto max-w-5xl px-4">
        <ul className="grid grid-cols-1 gap-8">
          {data?.flat().map(({ name, publishedAt, title, url }) => (
            <li className="group" key={url}>
              <h2 className="text-xl font-bold leading-relaxed">
                <a
                  href={url}
                  className="cursor-pointer visited:text-gray-500 hover:underline"
                >
                  {title}
                </a>
              </h2>
              <p className="text-md">
                <strong>{name}</strong> - {dateFormat(Date.parse(publishedAt))}
              </p>
            </li>
          ))}
        </ul>
        <div className="my-8 flex flex-col items-center" ref={ref}>
          {isLoading && (
            <div>
              <ArrowPathIcon className="h-12 w-12 animate-spin" />
              <span className="sr-only">読み込み中</span>
            </div>
          )}
          {error && (
            <span className="font-bold text-red-600">
              {error?.message ?? '問題が発生しました。'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
