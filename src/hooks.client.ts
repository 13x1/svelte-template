import type { HandleClientError } from '@sveltejs/kit';

// Loading/rendering error handling

export const handleError = (async ({ error }) => {
    return {
        message: 'Whoops! Something went wrong: ' + (error instanceof Error ? error.message : error)
    };
}) satisfies HandleClientError;

// Runtime error handling (not SK native)

const handleRuntimeError = (error: unknown) => {
    alert('Whoops! Something went wrong: ' + (error instanceof Error ? error.message : error));
};

// Register runtime error handlers

addEventListener('unhandledrejection', async (ev: PromiseRejectionEvent) => {
    handleRuntimeError(ev.reason);
});
addEventListener('error', (ev: ErrorEvent) => {
    handleRuntimeError(ev.error);
});
