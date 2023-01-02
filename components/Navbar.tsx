import AdjustmentsHorizontalIcon from '@heroicons/react/24/outline/AdjustmentsHorizontalIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalVisibilityState } from '../state'

export const Navbar: React.FC = () => {
  const [_, setModalVisibility] = useRecoilState(modalVisibilityState)

  return (
    <header className="sticky top-0 bg-stone-200 opacity-90 backdrop-blur">
      <div className="flex items-center justify-center space-x-4 px-4 lg:container lg:mx-auto">
        <h1 className="flex-1 text-2xl font-semibold leading-loose">News</h1>
        <button onClick={() => setModalVisibility('categoryFilter')}>
          <AdjustmentsHorizontalIcon className="h-7 w-7" />
          <span className="sr-only">Configure filter</span>
        </button>
        <button onClick={() => setModalVisibility('about')}>
          <InformationCircleIcon className="h-7 w-7" />
          <span className="sr-only">About this site.</span>
        </button>
      </div>
    </header>
  )
}
