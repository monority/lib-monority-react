import type { Locale } from '../locales'
import { common as enCommon } from './en/common'
import { docs as enDocs } from './en/docs'
import { guides as enGuides } from './en/guides'
import { home as enHome } from './en/home'
import { nav as enNav } from './en/nav'
import { common as frCommon } from './fr/common'
import { docs as frDocs } from './fr/docs'
import { guides as frGuides } from './fr/guides'
import { home as frHome } from './fr/home'
import { nav as frNav } from './fr/nav'

export type Messages = {
    nav: typeof enNav
    docs: typeof enDocs
    guides: typeof enGuides
    home: typeof enHome
    common: typeof enCommon
}

export const messages: Record<Locale, Messages> = {
    en: {
        nav: enNav,
        docs: enDocs,
        guides: enGuides,
        home: enHome,
        common: enCommon,
    },
    fr: {
        nav: frNav,
        docs: frDocs,
        guides: frGuides,
        home: frHome,
        common: frCommon,
    },
}
