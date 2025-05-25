import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  title: 'UFC Blog',
  author: 'Tu Nombre',
  description: 'Blog sobre artículos de la UFC, peleas, luchadores y eventos',
  favicon: '/favicon/favicon.ico',
  locale: {
    lang: 'es-ES',
    attrs: 'es_ES',
    dateLocale: 'es-ES',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'UFC Blog Logo'
  },
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  head: [],
  customCss: [],
  header: {
  menu: [
    { title: 'Inicio', link: '/' },
    { title: 'Blog', link: '/blog' },
    { title: 'Categorías', link: '/tags' },
    { title: 'Acerca de', link: '/about' }
  ]
},
  footer: {
    registration: {
      url: '',
      text: ''
    },
    credits: true,
    social: { 
      github: 'https://github.com/tu-usuario',
      x: 'https://twitter.com/tu-usuario',
      instagram: 'https://instagram.com/tu-usuario'
    }
  },
  content: {
    externalLinksContent: ' ↗',
    blogPageSize: 8,
    externalLinkArrow: true,
    share: ['x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [],
    applyTip: [
      { name: 'Nombre', val: theme.title },
      { name: 'Desc', val: theme.description || 'Blog sobre UFC' },
      { name: 'Link', val: 'https://tu-dominio.com/' },
      { name: 'Avatar', val: '/favicon/favicon.ico' }
    ]
  },
  pagefind: true,
  quote: {
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  typography: {
    class: 'prose text-base text-muted-foreground'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  waline: {
    enable: false,
    server: '',
    emoji: ['bmoji', 'weibo'],
    additionalConfigs: {
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Me gusta',
        placeholder: 'Bienvenido a comentar. (Email para recibir respuestas. No es necesario iniciar sesión)'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Términos y condiciones',
  list: [
    {
      title: 'Política de Privacidad',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Términos y Condiciones',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Derechos de Autor',
      link: '/terms/copyright'
    },
    {
      title: 'Aviso Legal',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config