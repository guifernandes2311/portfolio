import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={4} />
          <SocialIcon kind="github" href={siteMetadata.github} size={4} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={4} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={4} />
        </div>
      </div>
    </footer>
  )
}
