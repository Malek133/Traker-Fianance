import Link from 'next/link'

const Legal = () => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      En cliquant sur continuer, vous accepter nos{' '}
      <Link
        href="/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Condition d&apos;utilisation
      </Link>{' '}
      et notre{' '}
      <Link
        href="/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Politique de confidentialité
      </Link>
      .
    </p>
  )
}

export default Legal
