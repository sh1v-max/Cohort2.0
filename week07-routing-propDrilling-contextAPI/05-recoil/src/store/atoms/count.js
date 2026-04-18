// import { atom } from 'recoil'
import { atom } from 'recoil'

// this is a simple recoil atom to manage a counter state
export const countAtom = atom({
  // unique key for this atom
  key: 'countAtom',
  // default initial state value
  default: 0,
})
