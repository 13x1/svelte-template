import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		trace: 'on-first-retry'
	},
	testDir: './src/tests/e2e',
	workers: '100%',
	reporter: [['html', { outputFolder: './test-results/playwright-report' }], ['list']],
	projects: [
		{ name: 'chromium', use: devices['Desktop Chrome'] },
		{ name: 'firefox', use: devices['Desktop Firefox'] },
		{ name: 'webkit', use: devices['Desktop Safari'] }
	],
	outputDir: './test-results/playwright-output'
};

export default config;
