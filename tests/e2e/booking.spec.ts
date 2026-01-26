import { test, expect } from '@playwright/test';
import type { APIRequestContext, Page } from '@playwright/test';

test('Smoke E2E: pages and API respond', async ({ request, page, baseURL }: { request: APIRequestContext; page: Page; baseURL?: string }) => {
    // Home
    const home = await request.get('/');
    expect(home.ok()).toBeTruthy();

    // Agendar page
    await page.goto('/agendar');
    await expect(page).toHaveTitle(/Agendar|Agendamento/i);

    // API availability
    const res = await request.get('/api/availability');
    expect(res.status()).toBe(200);
    const json = await res.json();
    const isAvailabilityResponse = (o: unknown): o is { availability: unknown[] } =>
        typeof o === 'object' &&
        o !== null &&
        'availability' in o &&
        Array.isArray((o as { availability?: unknown[] }).availability);
    expect(isAvailabilityResponse(json)).toBeTruthy();
});