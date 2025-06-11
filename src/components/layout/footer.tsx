import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-foreground">
        © 2024 Tracker entrepeneur Inc.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          className="text-xs underline-offset-4 hover:underline"
          href="/instructions"
        >
          Instructions
        </Link>
        <Link
          className="text-xs underline-offset-4 hover:underline"
          href="/terms"
        >
          Condition d&apos;utilisation
        </Link>
        <Link
          className="text-xs underline-offset-4 hover:underline"
          href="/privacy"
        >
          Confidentialité
        </Link>
      </nav>
    </footer>
  )
}

export default Footer
