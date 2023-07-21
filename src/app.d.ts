import type { Locale } from './i18n/i18n.js';

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            requestLocale: Locale;
        }

        // interface PageData {}
        // interface Platform {}
    }
}

export {};
