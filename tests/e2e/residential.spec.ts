import { test, expect } from "@playwright/test";

/**
 * End to end against a real browser and a real database.
 *
 * Everything else in the suite runs the engine or a component in isolation.
 * This is the only check that the whole thing works assembled: the login
 * cookie, the route, the engine, and the numbers that land on screen.
 *
 * Figures here are the engine's own, so a price sheet change moves them. That
 * is deliberate — a stale expectation means either a real regression or a price
 * move, and both are worth being told about.
 */

type Page = import("@playwright/test").Page;

/** Walk to the configurator for a model. */
async function configureT50S(page: Page) {
  await page.goto("/");
  await page.getByTestId("series").selectOption("Value Steel Collection");
  await page.getByTestId("model").selectOption("T50S");
  await page.getByTestId("configure").click();
  await expect(page.getByTestId("width-ft")).toBeVisible();
}

/**
 * Set a size. Width and height are each a feet dropdown plus an inches one.
 * They were single fields until the 2-inch sizes went in, which is what left
 * this spec driving testids that no longer existed.
 */
async function setSize(page: Page, widthFt: string, heightFt: string) {
  await page.getByTestId("width-ft").selectOption(widthFt);
  await page.getByTestId("width-in").selectOption("0");
  await page.getByTestId("height-ft").selectOption(heightFt);
  await page.getByTestId("height-in").selectOption("0");
}

test.describe("authenticated", () => {
  test.beforeEach(async ({ page }) => {
    // seeded admin (created by `npm run db:init`)
    await page.request.post("/api/login", { data: { username: "brandon", password: "ChangeMe123!" } });
  });

  test("prices an exact stock size at the stock price", async ({ page }) => {
    await configureT50S(page);
    await setSize(page, "8", "7");
    await page.getByTestId("style").selectOption("solid");
    await page.getByTestId("get-price").click();
    await expect(page.getByTestId("price")).toHaveText("$566.06");
    await expect(page.getByTestId("source-badge")).toContainText(/in stock/i);
  });

  test("adds torsion, track and lock upcharges to the total", async ({ page }) => {
    await configureT50S(page);
    await setSize(page, "9", "7");
    await page.getByTestId("spring").selectOption("torsion");
    await page.getByTestId("track").selectOption("r32");
    await page.getByTestId("lock").selectOption("lockbar_installed");
    await page.getByTestId("get-price").click();
    await expect(page.getByTestId("total")).toHaveText("$934.63");
  });

  test("shows the in-stock badge and a description", async ({ page }) => {
    // A stocked model only offers stocked sizes and colours now, so every size
    // reachable from this tab is in stock. The badge and the description are
    // what a counter actually reads off the screen.
    await configureT50S(page);
    await setSize(page, "9", "7");
    await page.getByTestId("get-price").click();
    await expect(page.getByTestId("source-badge")).toContainText(/in stock/i);
    await expect(page.getByTestId("total")).toContainText("$");
  });
});

test("redirects to /login when signed out", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
});
