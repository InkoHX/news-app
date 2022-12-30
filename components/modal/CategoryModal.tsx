import React from 'react'
import { Dialog, Switch } from '@headlessui/react'
import { useRecoilState } from 'recoil'
import { categoriesState, modalVisibilityState } from '../../state'

const CATEGORIES = [
  [1, 'Programming Language'],
  [2, 'JavaScript Library'],
  [4, 'JavaScript Framework'],
  [8, 'JavaScript Runtime'],
  [16, 'Media'],
  [32, 'Editor/IDE'],
  [64, 'Linux'],
  [128, 'Hosting Service'],
] as const

const CategoryModal: React.FC = () => {
  const [categories, setCategories] = useRecoilState(categoriesState)
  const [modalVisibility, setModalVisibility] =
    useRecoilState(modalVisibilityState)

  return (
    <Dialog
      className="relative z-50"
      onClose={() => setModalVisibility('none')}
      open={modalVisibility === 'categoryFilter'}
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl rounded bg-slate-100 p-4 dark:bg-slate-800">
          <Dialog.Title className="text-xl font-bold leading-loose">
            表示するニュースのカテゴリ
          </Dialog.Title>
          <Dialog.Description>
            表示する内容から特定のカテゴリを除外することができます。
          </Dialog.Description>
          <div className="mt-4 grid auto-rows-max grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-4">
            {CATEGORIES.map(([id, name]) => (
              <Switch
                checked={(categories & id) === id}
                className={({ checked }) =>
                  `break-words rounded-md border border-slate-400 p-2 text-center text-sm font-semibold ${
                    checked
                      ? 'bg-blue-300 hover:opacity-80 dark:bg-blue-900'
                      : 'hover:opacity-50'
                  }`
                }
                onChange={(checked) =>
                  setCategories((it) => (checked ? it | id : it & ~id))
                }
                key={id}
              >
                {name}
              </Switch>
            ))}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default CategoryModal
