import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import {Metadata} from 'next'
import {PropsWithChildren} from 'react'

export const metadata: Metadata = {
  title: 'Legal',
  description:
    "Page de conditions d'utilisation et de politique de confidentialité",
}
const LegalLayout = ({children}: PropsWithChildren) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default LegalLayout
