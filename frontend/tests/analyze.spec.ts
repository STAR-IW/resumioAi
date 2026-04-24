import { test, expect } from '@playwright/test'


test.describe('analyze page', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:3000/analyze');
    });
    test('cv file uploads correctly', async ({ page }) => {
        await page.setInputFiles('input[type="file"]', 'tests/fixture/john_doe_cv.pdf')
        await expect(page.getByTestId('select-cv')).toContainText('Uploaded Successfully');
    });

    test('analyze button disabled without CV', async ({ page }) => {
        await page.getByText('Paste job description instead').click();
        await page.getByTestId('input-job-description').fill('We are looking for a senior software engineer with 5+ years of experience in Node.js and JAVA who also knows how to shred the guitar and bench 200KG to join our team.');
        await expect(page.getByTestId('analyze-button')).toBeDisabled();//no cv, analyze button is de
    });

    test('full analyze flow', async ({ page }) => {
        await page.setInputFiles('input[type="file"]', 'tests/fixture/john_doe_cv.pdf');
        await expect(page.getByTestId('select-cv')).toContainText('Uploaded Successfully');

        await page.getByText('paste job description instead').click();
        await page.getByTestId('input-job-description').fill('We are looking for a senior software engineer with 5+ years of experience in Node.js and JAVA who also knows how to shred the guitar and bench 200KG to join our team.');

        await page.getByTestId('analyze-button').click();

        await expect(page.getByText('Match Score')).toBeVisible({timeout: 3000})
    })

    test('analyze button is disabled until both CV and JD are provided', async ({ page }) => {
        await expect(page.getByTestId('analyze-button')).toBeDisabled()
        await page.setInputFiles('input[type="file"]', 'tests/fixture/john_doe_cv.pdf')
        await expect(page.getByTestId('analyze-button')).toBeDisabled() // still disabled - no JD
    })

    test('mode toggle switches between URL and paste input', async ({ page }) => {
        await expect(page.getByTestId('input-url')).toBeVisible()
        await page.getByText('Paste job description instead').click()
        await expect(page.getByTestId('input-job-description')).toBeVisible()
    })

});