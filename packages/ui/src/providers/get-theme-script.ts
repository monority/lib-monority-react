import { BRAND_ACCENT_STORAGE_KEY, THEME_STORAGE_KEY, ThemeName } from '../lib/constants'

/**
 * Valeurs de stockage acceptées : tous les noms de `ThemeName` sauf `dim`.
 * `dim` est exclu parce qu'il est migré vers `dark` juste avant, et `system`
 * reste dans la liste parce qu'une préférence est stockée puis résolue par la
 * branche conditionnelle, jamais rendue telle quelle.
 *
 * Dérivé de la constante, jamais écrit à la main : une liste en dur ici
 * divergerait en silence, exactement comme le générateur l'a fait pour `slate`.
 */
const STORED_THEME_NAMES = Object.values(ThemeName).filter((name) => name !== 'dim')
const STORED_THEME_LIST = JSON.stringify(STORED_THEME_NAMES)

export interface GetThemeScriptOptions {
    storageKey?: string
    accentStorageKey?: string
}

/**
 * Head script with no dependency: applies the resolved theme and the accent
 * before the first render.
 *
 * The accent is stored as `"<preset> <hue> <chroma>"` so the script needs no hue
 * table of its own — the numbers come from `accentColors` at write time, which
 * keeps a single source of truth and keeps this script inside its size budget.
 */
export function getThemeScript(options: GetThemeScriptOptions = {}): string {
    const storageKey = JSON.stringify(options.storageKey ?? THEME_STORAGE_KEY)
    const accentStorageKey = JSON.stringify(options.accentStorageKey ?? BRAND_ACCENT_STORAGE_KEY)

    return `(()=>{const d=document.documentElement;let h="0",c="0",a="neutral";try{let s=localStorage.getItem(${storageKey});if(s==="dim")s="dark";if(!${STORED_THEME_LIST}.includes(s))s="dark";let r=s==="system"?(matchMedia("(prefers-contrast: more)").matches?"high-contrast":matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;d.dataset.theme=r;d.dataset.themeChoice=s;d.style.colorScheme=r==="dark"||r==="slate"||r==="oled"||r==="ocean"||r==="night"?"dark":"light";if(s==="dark"&&localStorage.getItem(${storageKey})==="dim")localStorage.setItem(${storageKey},"dark")}catch(e){d.dataset.theme="dark";d.dataset.themeChoice="dark";d.style.colorScheme="dark"}try{let v=(localStorage.getItem(${accentStorageKey})||"").split(" ");if(v[1]!==undefined&&!isNaN(+v[1])){a=v[0]||a;h=v[1];c=v[2]}}catch(e){}d.dataset.brandAccent=a;d.style.setProperty("--mr-ref-brand-hue",h);d.style.setProperty("--mr-ref-brand-chroma",c)})();`
}
