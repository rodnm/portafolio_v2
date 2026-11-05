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
    hero: {
      chapter: "CAP. 01 — Apertura",
      operator: "Operador",
      base: "Base",
      role: "Rol",
      edition: "Edición",
      contact: "Contactar",
      cv: "Descargar CV",
      figure: "FIG. 01",
      figureCaption: "Esfera de cobertura — proyección ortográfica, coordenadas de la base.",
      globeTitle: "Globo terrestre en malla de alambre con la ubicación de la base marcada",
      broadcast: "Transmisión iniciada — desplázate para continuar",
    },
    about: {
      chapter: "CAP. 02",
      title: "Sobre mí",
      kicker: "Perfil · 2 min de lectura",
      figure: "FIG. 02",
      figureCaption: "Ajuste por MCO con banda de confianza al 95 %. Datos simulados.",
      figureTitle:
        "Diagrama de dispersión con una recta de regresión ajustada y su banda de confianza",
      equation: "decisión = β₀ + β₁·evidencia + ε",
      interests: "Me interesa",
      languages: "Idiomas",
      languagesValue: "ES · EN (C1)",
      etl: "Ciclo ETL",
    },
    experience: {
      chapter: "CAP. 03",
      title: "Experiencia",
      kicker: "Diario de campo",
      volunteer: "Voluntariado",
      number: "N.º",
    },
    stack: {
      chapter: "CAP. 09",
      title: "Stack",
      kicker: "Instrumentación",
      command: "summarize stack",
      variable: "Variable",
      obs: "Obs",
      values: "Herramientas",
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
    hero: {
      chapter: "CH. 01 — Opening",
      operator: "Operator",
      base: "Base",
      role: "Role",
      edition: "Edition",
      contact: "Get in touch",
      cv: "Download CV",
      figure: "FIG. 01",
      figureCaption: "Coverage sphere — orthographic projection, base coordinates.",
      globeTitle: "Wireframe globe with the base location marked",
      broadcast: "Broadcast initiated — scroll to continue",
    },
    about: {
      chapter: "CH. 02",
      title: "About",
      kicker: "Profile · 2 min read",
      figure: "FIG. 02",
      figureCaption: "OLS fit with a 95% confidence band. Simulated data.",
      figureTitle: "Scatter plot with a fitted regression line and its confidence band",
      equation: "decision = β₀ + β₁·evidence + ε",
      interests: "Interested in",
      languages: "Languages",
      languagesValue: "ES · EN (C1)",
      etl: "ETL cycle",
    },
    experience: {
      chapter: "CH. 03",
      title: "Experience",
      kicker: "Field journal",
      volunteer: "Volunteering",
      number: "No.",
    },
    stack: {
      chapter: "CH. 09",
      title: "Stack",
      kicker: "Instrumentation",
      command: "summarize stack",
      variable: "Variable",
      obs: "Obs",
      values: "Tools",
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
