import {JSX} from 'react'
export type Theme = 'system' | 'dark' | 'light'

const SystemAppearance = () => {
  return (
    <>
      <div className="space-y-2 rounded-sm bg-neutral-300 p-2">
        <div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
      </div>
    </>
  )
}

const DarkAppearance = () => {
  return (
    <>
      <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
        <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-neutral-400" />
          <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
        </div>
      </div>
    </>
  )
}

const LightAppearance = () => {
  return (
    <>
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
      </div>
    </>
  )
}
type Appearance = {
  value: Theme
  label: string
  component: JSX.Element
}
export const appearances: Appearance[] = [
  {value: 'light', label: 'Clair', component: <LightAppearance />},
  {value: 'dark', label: 'Sombre', component: <DarkAppearance />},
  {value: 'system', label: 'Système', component: <SystemAppearance />},
]
