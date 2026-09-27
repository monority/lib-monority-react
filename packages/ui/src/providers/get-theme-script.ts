import { BRAND_ACCENT_STORAGE_KEY, THEME_STORAGE_KEY } from '../lib/constants'

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

    return `(()=>{const d=document.documentElement;let h="0",c="0",a="neutral";try{let s=localStorage.getItem(${storageKey});if(s==="dim")s="dark";if(!["light","dark","slate","oled","ocean","night","high-contrast","system"].includes(s))s="dark";let r=s==="system"?(matchMedia("(prefers-contrast: more)").matches?"high-contrast":matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;d.dataset.theme=r;d.dataset.themeChoice=s;d.style.colorScheme=r==="dark"||r==="slate"||r==="oled"||r==="ocean"||r==="night"?"dark":"light";if(s==="dark"&&localStorage.getItem(${storageKey})==="dim")localStorage.setItem(${storageKey},"dark")}catch(e){d.dataset.theme="dark";d.dataset.themeChoice="dark";d.style.colorScheme="dark"}try{let v=(localStorage.getItem(${accentStorageKey})||"").split(" ");if(v[1]!==undefined&&!isNaN(+v[1])){a=v[0]||a;h=v[1];c=v[2]}}catch(e){}d.dataset.brandAccent=a;d.style.setProperty("--mr-brand-hue",h);d.style.setProperty("--mr-brand-chroma",c)})();`
}
