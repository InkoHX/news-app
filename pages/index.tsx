import React from 'react'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'
import { useFeed } from '../hooks'
import { useRecoilState } from 'recoil'
import { categoriesState } from '../state'

export default function Page() {
  const [categories] = useRecoilState(categoriesState)
  const { data, error, isLoading, isValidating, setSize } = useFeed({
    categories,
  })
  const entriesTerminalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const entriesTerminal = entriesTerminalRef.current

    if (!entriesTerminal) return

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const hasNextData = (data?.at(-1)?.length ?? 0) > 0

        if (entry?.isIntersecting && hasNextData) {
          setSize((size) => size + 1)
        }
      },
      {
        rootMargin: '0px 0px 100px 0px',
      }
    )

    intersectionObserver.observe(entriesTerminal)
    return () => intersectionObserver.unobserve(entriesTerminal)
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
            <li key={url}>
              <h2 className="text-xl font-bold leading-relaxed">
                <a
                  href={url}
                  className="cursor-pointer hover:underline group-visited:text-zinc-500 dark:visited:text-gray-400"
                >
                  {title}
                </a>
              </h2>
              <p className="text-md dark:text-gray-300">
                <strong>{name}</strong> - {dateFormat(Date.parse(publishedAt))}
              </p>
            </li>
          ))}
        </ul>
        <div
          className="my-8 flex flex-col items-center"
          ref={entriesTerminalRef}
        >
          {isLoading ||
            (isValidating && (
              <div>
                <ArrowPathIcon className="h-12 w-12 animate-spin" />
                <span className="sr-only">読み込み中</span>
              </div>
            ))}
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
