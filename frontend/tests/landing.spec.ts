import { test, expect } from '@playwright/test'


test.describe('landing page', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:3000');
    });
    test('landing page loads correctly', async ({ page }) => {
        await expect(page.getByTestId('try-it-now')).toBeVisible()
    });

    test('try it now navigates to analyze page', async ({ page }) => {
        await page.getByTestId('try-it-now').click()
        await expect(page).toHaveURL('http://localhost:3000/analyze')
    });
    test('landing page has correct title', async ({ page }) => {
        await expect(page.getByText('Resumio')).toBeVisible()
    })

    test('landing page shows tagline', async ({ page }) => {
        await expect(page.getByText('Analyze. Improve. Get Hired.')).toBeVisible()
    })


});