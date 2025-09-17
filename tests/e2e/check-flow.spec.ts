import { test, expect } from '@playwright/test'

test.describe('Car Check Flow', () => {
  test('should complete full check flow from start to result', async ({ page }) => {
    // Navigate to check page
    await page.goto('/check')
    
    // Verify we're on the check page
    await expect(page).toHaveTitle(/Lumara Auto/)
    await expect(page.locator('h1')).toContainText('Car Symptom Check')
    
    // Step 1: Vehicle Information (optional)
    await expect(page.locator('text=Step 1 of 3')).toBeVisible()
    
    // Fill in optional vehicle info
    await page.fill('input[placeholder*="Toyota"]', 'Toyota')
    await page.fill('input[placeholder*="Camry"]', 'Camry')
    await page.fill('input[placeholder*="2020"]', '2020')
    await page.selectOption('select', 'petrol')
    
    // Proceed to step 2
    await page.click('button:has-text("Next: Select Symptoms")')
    
    // Step 2: Select Symptoms
    await expect(page.locator('text=Step 2 of 3')).toBeVisible()
    await expect(page.locator('text=Select All That Apply')).toBeVisible()
    
    // Select some symptoms
    await page.check('input[type="checkbox"]:near(text="Check Engine Light")')
    await page.check('input[type="checkbox"]:near(text="Rough Idle")')
    await page.check('input[type="checkbox"]:near(text="White Smoke")')
    
    // Proceed to step 3
    await page.click('button:has-text("Next: Review & Submit")')
    
    // Step 3: Review and Submit
    await expect(page.locator('text=Step 3 of 3')).toBeVisible()
    await expect(page.locator('text=Review Your Check')).toBeVisible()
    
    // Verify selected symptoms are shown
    await expect(page.locator('text=• Check Engine Light')).toBeVisible()
    await expect(page.locator('text=• Rough Idle')).toBeVisible()
    await expect(page.locator('text=• White Smoke')).toBeVisible()
    
    // Add some notes
    await page.fill('textarea', 'This started happening yesterday morning')
    
    // Submit the check
    await page.click('button:has-text("Submit Check")')
    
    // Wait for submission and redirect to result page
    await page.waitForURL(/\/result\/[a-zA-Z0-9-]+/)
    
    // Verify result page elements
    await expect(page.locator('h1')).toContainText('Your Car Triage Results')
    await expect(page.locator('text=SEVERITY:')).toBeVisible()
    await expect(page.locator('text=Can I Drive?')).toBeVisible()
    await expect(page.locator('text=Likely Causes')).toBeVisible()
    await expect(page.locator('text=Safe Checks You Can Do')).toBeVisible()
    await expect(page.locator('text=What to Tell Your Mechanic')).toBeVisible()
    
    // Verify PDF download button
    await expect(page.locator('text=Download PDF Report')).toBeVisible()
    
    // Verify new check button
    await expect(page.locator('text=Start New Check')).toBeVisible()
  })

  test('should show validation error when no symptoms selected', async ({ page }) => {
    await page.goto('/check')
    
    // Skip to step 2
    await page.click('button:has-text("Next: Select Symptoms")')
    
    // Try to proceed without selecting symptoms
    await page.click('button:has-text("Next: Review & Submit")')
    
    // Should show validation error
    await expect(page.locator('text=Please select at least one symptom')).toBeVisible()
  })

  test('should allow going back and forth between steps', async ({ page }) => {
    await page.goto('/check')
    
    // Step 1 -> Step 2
    await page.click('button:has-text("Next: Select Symptoms")')
    await expect(page.locator('text=Step 2 of 3')).toBeVisible()
    
    // Step 2 -> Step 1
    await page.click('button:has-text("Back")')
    await expect(page.locator('text=Step 1 of 3')).toBeVisible()
    
    // Step 1 -> Step 2 -> Step 3
    await page.click('button:has-text("Next: Select Symptoms")')
    await page.check('input[type="checkbox"]:near(text="Check Engine Light")')
    await page.click('button:has-text("Next: Review & Submit")')
    await expect(page.locator('text=Step 3 of 3')).toBeVisible()
    
    // Step 3 -> Step 2
    await page.click('button:has-text("Back")')
    await expect(page.locator('text=Step 2 of 3')).toBeVisible()
  })

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/check')
    
    // Verify mobile layout
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Car Symptom Check')).toBeVisible()
    
    // Test mobile navigation
    await page.click('button:has-text("Next: Select Symptoms")')
    await expect(page.locator('text=Step 2 of 3')).toBeVisible()
    
    // Select symptoms on mobile
    await page.check('input[type="checkbox"]:near(text="Check Engine Light")')
    await page.click('button:has-text("Next: Review & Submit")')
    
    // Verify mobile result page
    await page.waitForURL(/\/result\/[a-zA-Z0-9-]+/)
    await expect(page.locator('h1')).toBeVisible()
  })
})
