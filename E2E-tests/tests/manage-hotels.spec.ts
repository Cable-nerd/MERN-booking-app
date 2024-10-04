import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("huzasinn@gmail.com");
  await page.locator("[name=password]").fill("intNum");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign In Success!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name='name']").fill("Test Hotel");
  await page.locator("[name='city']").fill("Test City");
  await page.locator("[name='country']").fill("Test Country");
  await page
    .locator("[name='descrioption']")
    .fill("This is a description for the test hotel");
  await page.locator("[name='pricePerNight']").fill("100");
  await page.selectOption("select[name='starRating']", "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator("[name='adultCount']").fill("2");
  await page.locator("[name='childCount']").fill("4");

  await page.setInputFiles("[name='imageFiles']", [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should dispay hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("marinara")).toBeVisible();
  await expect(page.getByText("Where does it come from?")).toBeVisible();
  await expect(page.getByText("marine, Israel")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$67 per night")).toBeVisible();
  await expect(page.getByText("4 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).click();

  await page.waitForSelector('[name="name"]', { state: "attached" });

  await expect(page.locator('[name="name"]')).toHaveValue("marinara");
  await page.locator('[name="name"]').fill("marinara edit");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("marinara edit");
  await page.locator('[name="name"]').fill("marinara");
  await page.getByRole("button", { name: "Save" }).click();
});


// 9:01:30 added edit hotel succesffuly now need to push it to github