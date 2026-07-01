import { test, expect } from "@playwright/test";

async function configureT50S(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByTestId("series").selectOption("Value Steel Collection");
  await page.getByTestId("model").selectOption("T50S");
  await page.getByTestId("configure").click();
}

test.describe("authenticated", () => {
  test.beforeEach(async ({ page }) => {
    // seeded admin (created by `npm run db:init`)
    await page.request.post("/api/login", { data: { username: "brandon", password: "ChangeMe123!" } });
  });

  test("prices an exact stock size at the stock price", async ({ page }) => {
    await configureT50S(page);
    await page.getByTestId("width-ft").fill("8");
    await page.getByTestId("width-in").fill("0");
    await page.getByTestId("height-ft").fill("7");
    await page.getByTestId("height-in").fill("0");
    await page.getByTestId("style").selectOption("solid");
    await page.getByTestId("get-price").click();
    await expect(page.getByTestId("price")).toHaveText("$560.37");
    await expect(page.getByTestId("source-badge")).toContainText(/stock/i);
  });

  test("adds torsion + lock + track upcharges to the total", async ({ page }) => {
    await configureT50S(page);
    await page.getByTestId("width-ft").fill("9");
    await page.getByTestId("width-in").fill("0");
    await page.getByTestId("height-ft").fill("7");
    await page.getByTestId("height-in").fill("0");
    await page.locator("select").nth(4).selectOption("torsion");
    await page.locator("select").nth(5).selectOption("r32");
    await page.locator("select").nth(6).selectOption("lockbar_installed");
    await page.getByTestId("get-price").click();
    await expect(page.getByTestId("total")).toHaveText("$920.58");
  });
});

test("redirects to /login when signed out", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
});
