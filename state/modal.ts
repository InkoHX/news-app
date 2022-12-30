import { atom } from 'recoil'

export type ModalType = 'categoryFilter' | 'about' | 'none'

export const modalVisibilityState = atom<ModalType>({
  key: 'modalVisibilityState',
  default: 'none',
})
