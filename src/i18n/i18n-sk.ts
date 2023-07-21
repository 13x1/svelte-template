import type { Handle, RequestEvent } from '@sveltejs/kit';
import { paramName, cookieName } from './i18n';
import { isLocale, locales, detectLocale } from './i18n-util';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import type { Locale } from './i18n';

export function findRequestLocale(event: RequestEvent): Locale {
    // get hints
    let maybeLang =
        event.url.searchParams.get(paramName) || event.cookies.get(cookieName) || 'null';

    // detect
    if (!isLocale(maybeLang))
        maybeLang =
            locales.find(l => l.toLowerCase().startsWith(maybeLang.toLowerCase())) ??
            detectLocale(initAcceptLanguageHeaderDetector(event.request));

    const lang = maybeLang as Locale;

    // set cookie
    event.cookies.set(cookieName, lang);

    // set on locals
    event.locals.requestLocale = lang;

    return lang;
}

export const i18nHandle = (async ({ event, resolve }) => {
    try {
        const locale = findRequestLocale(event);
        event.locals.requestLocale = locale;

        return resolve(event, {
            transformPageChunk: ({ html }) => html.replace('%lang%', locale)
        });
    } catch (e) {
        console.error(e);
        return resolve(event);
    }
}) satisfies Handle;
