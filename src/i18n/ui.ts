export const ui = {
  es: {
    meta: {
      title: "Rodrigo Norabuena · Economista | Analytics",
      description:
        "Economista de la PUCP enfocado en análisis cuantitativo aplicado: datos, econometría y machine learning para entender problemas económicos y sociales.",
    },
    a11y: {
      skip: "Saltar al contenido",
      menu: "Menú",
      closeMenu: "Cerrar menú",
      mainNav: "Navegación principal",
    },
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      credentials: "Formación",
      papers: "Papers",
      contact: "Contacto",
    },
    theme: {
      toggle: "Cambiar tema",
      light: "Claro",
      dark: "Oscuro",
    },
    lang: {
      switchTo: "Read in English",
      short: "EN",
      current: "ES",
    },
    masthead: {
      issue: "Portafolio · 2026 · Edición 02",
    },
    hud: {
      local: "Hora local",
      status: "Estado",
      available: "Disponible",
      signal: "Señal",
    },
    footer: {
      colophon: "Compuesto en Space Grotesk e IBM Plex Mono",
      back: "Fin — volver al inicio ↑",
    },
  },
  en: {
    meta: {
      title: "Rodrigo Norabuena · Economist | Analytics",
      description:
        "PUCP economist focused on applied quantitative analysis: data, econometrics and machine learning to understand economic and social problems.",
    },
    a11y: {
      skip: "Skip to content",
      menu: "Menu",
      closeMenu: "Close menu",
      mainNav: "Main navigation",
    },
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      credentials: "Education",
      papers: "Papers",
      contact: "Contact",
    },
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
    },
    lang: {
      switchTo: "Leer en español",
      short: "ES",
      current: "EN",
    },
    masthead: {
      issue: "Portfolio · 2026 · Issue 02",
    },
    hud: {
      local: "Local time",
      status: "Status",
      available: "Available",
      signal: "Signal",
    },
    footer: {
      colophon: "Set in Space Grotesk & IBM Plex Mono",
      back: "End — back to top ↑",
    },
  },
} as const;

type Widen<T> = { readonly [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Shape of one language's strings; both languages must satisfy it. */
export type UI = Widen<(typeof ui)["es"]>;
