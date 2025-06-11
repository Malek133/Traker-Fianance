import {
  BadgeEuro,
  Cog,
  HeartPulse,
  Home,
  UserRound,
  LucideIcon
} from 'lucide-react'

type SidebarLink = {
  title: string
  href: string
  icon: LucideIcon
}

export const DATA_ROWS_PER_PAGE = 10

export const dashboardLinks: SidebarLink[] = [
  {href: '/dashboard', title: 'Dashboard', icon: Home},
  {href: '/account', title: 'Compte', icon: UserRound},
  {href: '/settings', title: 'Options', icon: Cog},
  // {href: '/finance', title: 'Finance', icon: BadgeEuro},
  // {href: '/health', title: 'Santé', icon: HeartPulse},
]
