import type { Locales as Locale, TranslationFunctions } from './i18n-types';
import { loadFormatters, loadLocaleAsync } from './i18n-util.async';
import { i18nObject, isLocale, loadedLocales as staticLoadedLocales, locales } from './i18n-util';
import { type Readable, type Writable, writable } from 'svelte/store';

export const paramName = 'lang';
export const cookieName = 'lang';

// fix the type being called "Locales" instead of "Locale"
export type { Locale };

function toReadable<T>(store: Writable<T>): Readable<T> {
    return { subscribe: store.subscribe };
}

export async function getI18nStores(locale: Locale) {
    const i8 = writable(<TranslationFunctions>(<unknown>null));
    const loadedLocales = writable(staticLoadedLocales);

    const stores = {
        locale: writable(locale),
        i8: toReadable(i8),
        setLocale,
        allLocales: locales,
        loadedLocales: toReadable(loadedLocales)
    };

    async function setLocale(locale: string) {
        if (!isLocale(locale)) throw new Error(`Invalid locale: ${locale}`);
        await loadLocaleAsync(locale);
        loadFormatters(locale);
        stores.locale.set(locale);
        stores.locale.set(locale);
        i8.set(i18nObject(locale));
        loadedLocales.set(staticLoadedLocales);
        processDocumentLanguageChange(locale);
    }

    await setLocale(locale);

    stores.locale.subscribe((locale: string) => {
        stores.setLocale(locale).catch(console.error);
    });

    return stores;
}

function processDocumentLanguageChange(locale: Locale) {
    if (typeof window === 'undefined') return; // SSR compat
    // html lang attribute
    const html = document.documentElement;
    if (html.lang !== locale) html.lang = locale;
    // <meta name="content-language"
    const meta = document.querySelector('meta[name="content-language"]');
    if (meta && meta.getAttribute('content') !== locale) meta.setAttribute('content', locale);
    // cookie
    document.cookie = `${cookieName}=${locale};path=/;max-age=31536000`;
    // url param
    const url = new URL(window.location.href);
    if (url.searchParams.get(paramName) && url.searchParams.get(paramName) !== locale) {
        url.searchParams.set(paramName, locale);
        window.history.replaceState({}, '', url.toString());
    }
}
