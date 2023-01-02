import { Dialog } from '@headlessui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalVisibilityState } from '../../state'

const AboutModal: React.FC = () => {
  const [modalVisibility, setModalVisibility] =
    useRecoilState(modalVisibilityState)

  return (
    <Dialog
      className="relative z-50"
      onClose={() => setModalVisibility('none')}
      open={modalVisibility === 'about'}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded bg-white p-4">
          <Dialog.Title className="text-xl font-bold leading-10">
            このサイトについて
          </Dialog.Title>
          <div className="space-y-2">
            <p>
              このサイトは
              <a
                href="https://github.com/InkoHX/news"
                className="mx-1 text-blue-600 hover:underline"
              >
                InkoHX/news
              </a>
              のWeb APIを使って実装されたRSS Readerです。
            </p>
            <p>
              このサイトでバグを見つけた場合、
              <a
                href="https://github.com/InkoHX/news-app"
                className="mx-1 text-blue-600 hover:underline"
              >
                InkoHX/news-app
              </a>
              にissueあるいはPRを作成してくれると助かります。
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default AboutModal
