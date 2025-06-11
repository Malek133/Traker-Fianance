import {Separator} from '@/components/ui/separator'

import {AppearanceButton} from './appearance'
import {appearances} from './apperance-setting'
import {Icon, MoonIcon, SunIcon} from 'lucide-react'

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Options</h1>
      <Separator className="my-4" />
      <div className="space-y-4 py-4">
        <div>
          <h3 className="text-lg font-medium">Apparence</h3>
          <p className="text-md text-muted-foreground">
            Personnalise l&apos;apparence de l&apos;application. Change
            automatiquement entre les thèmes jour et nuit.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row md:flex-wrap">
          {appearances.map((appearance) => {
            return (
              <AppearanceButton
                key={appearance.value}
                value={appearance.value}
                label={appearance.label}
                component={appearance.component}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
