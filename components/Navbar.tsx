import AdjustmentsHorizontalIcon from '@heroicons/react/24/solid/AdjustmentsHorizontalIcon'
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalVisibilityState } from '../state'

export const Navbar: React.FC = () => {
  const [_, setModalVisibility] = useRecoilState(modalVisibilityState)

  return (
    <header className="sticky top-0 bg-slate-600/80 text-white backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-center space-x-4 px-4">
        <h1 className="flex-1 text-2xl font-extrabold leading-loose">News</h1>
        <button onClick={() => setModalVisibility('categoryFilter')}>
          <AdjustmentsHorizontalIcon className="h-7 w-7 hover:opacity-70" />
          <span className="sr-only">Configure filter</span>
        </button>
        <button onClick={() => setModalVisibility('about')}>
          <InformationCircleIcon className="h-7 w-7 hover:opacity-70" />
          <span className="sr-only">About this site.</span>
        </button>
      </div>
    </header>
  )
}
