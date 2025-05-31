interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: ' Pierogi.ai – Sistema de delivery',
    description: `Um sistema de delivery para restaurantes que permite pedidos "meio a meio", personalização de ingredientes, cálculo dinâmico de preços e integração com WhatsApp. Foi meu primeiro projeto real, e eu participei ativamente em vários pontos do desenvolvimento.`,
    imgSrc: '/static/images/pierogi.jpg',
    href: 'https://www.google.com',
  },
  // {
  //   title: 'The Time Machine',
  //   description: `Imagine being able to travel back in time or to the future. Simple turn the knob
  //   to the desired date and press "Go". No more worrying about lost keys or
  //   forgotten headphones with this simple yet affordable solution.`,
  //   imgSrc: '/static/images/time-machine.jpg',
  //   href: '/blog/the-time-machine',
  // },
]

export default projectsData
