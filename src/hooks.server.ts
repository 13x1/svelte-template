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

export const handleError = (async () => {
    return {
        message: 'Whoops! Something went wrong.'
    };
}) satisfies HandleServerError;
