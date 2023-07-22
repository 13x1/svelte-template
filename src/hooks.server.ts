import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

import { sequence } from '@sveltejs/kit/hooks';
import { i18nHandle } from './i18n/i18n-sk.js';

// Request handling

const handler = (async ({ event, resolve }) => {
    return resolve(event);
}) satisfies Handle;

export const handle = sequence(i18nHandle, handler);

// Fetch handling

export const handleFetch = (async ({ request, fetch }) => {
    return fetch(request);
}) satisfies HandleFetch;

// Rendering error handling

export const handleError = (async ({ event, error }) => {
    console.error(
        `SvelteKit ran into an uncaught error while rendering the page ${event.request.url}:`
    );
    console.error(error);
    console.error(
        event?.url?.searchParams?.get('logEvent') === 'true'
            ? event
            : 'Append `?logEvent=true` to the URL to see the full event details.'
    );
    return {
        message: 'Whoops! Something went wrong.'
    };
}) satisfies HandleServerError;
