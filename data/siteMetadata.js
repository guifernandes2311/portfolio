/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  headerTitle: '',
  description:
    'Estudante de Sistemas de Informação na UNIARA, focado em aprender e aplicar tecnologias como JavaScript, React e Node.js para construir soluções práticas e eficientes. Buscando evoluir constantemente no desenvolvimento de software.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  email: 'guilherme.15232006@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in/guilherme-fernandes-ba7bb8344',
  instagram: 'https://www.instagram.com/guifernandes_0/',
  locale: 'en-US',
  stickyNav: false,

  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },

  newsletter: {
    provider: 'buttondown',
  },

  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },

  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
