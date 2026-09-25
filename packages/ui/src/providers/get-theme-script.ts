import { THEME_STORAGE_KEY } from '../lib/constants'

export interface GetThemeScriptOptions {
  storageKey?: string
}

/** Script de tête sans dépendance : pose le thème résolu avant le premier rendu. */
export function getThemeScript(options: GetThemeScriptOptions = {}): string {
  const storageKey = JSON.stringify(options.storageKey ?? THEME_STORAGE_KEY)

  return `(()=>{const d=document.documentElement;try{let s=localStorage.getItem(${storageKey});if(s==="dim")s="dark";if(!["light","dark","oled","ocean","night","high-contrast","system"].includes(s))s="dark";let r=s==="system"?(matchMedia("(prefers-contrast: more)").matches?"high-contrast":matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;d.dataset.theme=r;d.dataset.themeChoice=s;d.style.colorScheme=r==="dark"||r==="oled"||r==="ocean"||r==="night"?"dark":"light";if(s==="dark"&&localStorage.getItem(${storageKey})==="dim")localStorage.setItem(${storageKey},"dark")}catch(e){d.dataset.theme="dark";d.dataset.themeChoice="dark";d.style.colorScheme="dark"}})();`
}
