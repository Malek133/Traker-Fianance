import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

type MagicLinkMailProps = {
  url: string
  username?: string
}

export const MagicLinkMail = ({
  url,
  username = 'cher utilisateur',
}: MagicLinkMailProps) => {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Votre lien de connexion pour SaaS Tracker</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded bg-white p-8 shadow-lg">
            <Heading className="text-2xl font-bold text-gray-900">
              Bonjour {username},
            </Heading>

            <Text className="mt-4 text-gray-700">
              Vous avez demandé un lien de connexion pour accéder à votre compte
              SaaS Tracker. Cliquez sur le bouton ci-dessous pour vous connecter
              :
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                href={url}
              >
                Se connecter
              </Button>
            </Section>

            <Text className="text-sm text-gray-600">
              Ce lien est valable pendant 24 heures. Si vous n&apos;avez pas
              demandé ce lien, vous pouvez ignorer cet email en toute sécurité.
            </Text>

            <hr className="my-6 border-gray-200" />

            <Text className="text-sm text-gray-500">
              Si le bouton ne fonctionne pas, vous pouvez copier et coller ce
              lien dans votre navigateur :
              <Link href={url} className="mt-2 block break-all text-blue-600">
                {url}
              </Link>
            </Text>

            <Text className="mt-6 text-sm text-gray-500">
              Cordialement,
              <br />
              L&apos;équipe SaaS Tracker
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

// Props par défaut pour la prévisualisation
MagicLinkMail.PreviewProps = {
  url: 'https://saastracker.com/auth/magic-link?token=123456789',
  username: 'John Doe',
} as MagicLinkMailProps

export default MagicLinkMail
