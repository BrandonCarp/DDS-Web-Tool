// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { NoticeModal } from "./NoticeModal";

/**
 * The sign-in notice (Brandon, 20/10/2026): once the account is in, the
 * sign-in page shows the notice the admin panel switched on, in a window, and
 * OK goes on to the tool; with none on, it goes straight on.
 */
const nav = vi.hoisted(() => ({ href: "" }));

beforeEach(() => {
  nav.href = "";
  Object.defineProperty(window, "location", { configurable: true, value: { get href() { return nav.href; }, set href(v: string) { nav.href = v; } } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const signIn = async (reply: unknown) => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(reply), { status: 200, headers: { "content-type": "application/json" } }));
  render(<LoginPage />);
  fireEvent.change(screen.getByLabelText("Username"), { target: { value: "cj" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "pw" } });
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
};

describe("the sign-in notice on the sign-in page", () => {
  it("shows the notice in a window, and OK goes on to the tool", async () => {
    await signIn({ ok: true, notice: { title: "Heads up", body: "Closed Friday.\nOpen Monday." } });
    await waitFor(() => expect(screen.getByTestId("login-notice")).toBeTruthy());
    expect(nav.href).toBe("");
    expect(screen.getByTestId("login-notice-title").textContent).toBe("Heads up");
    expect(screen.getByTestId("login-notice-body").textContent).toBe("Closed Friday.\nOpen Monday.");
    fireEvent.click(screen.getByTestId("login-notice-ok"));
    expect(nav.href).toBe("/");
  });

  it("goes straight on with no notice", async () => {
    await signIn({ ok: true, notice: null });
    await waitFor(() => expect(nav.href).toBe("/"));
    expect(screen.queryByTestId("login-notice")).toBeNull();
  });

  it("has no title line without a title, and Escape goes on too", async () => {
    await signIn({ ok: true, notice: { title: "", body: "Just this." } });
    await waitFor(() => expect(screen.getByTestId("login-notice")).toBeTruthy());
    expect(screen.queryByTestId("login-notice-title")).toBeNull();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(nav.href).toBe("/");
  });

  it("still says so on a wrong password", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status: 401 }));
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => expect(document.querySelector(".err.show")).toBeTruthy());
    expect(nav.href).toBe("");
  });
});

describe("the notice window on its own", () => {
  it("keeps the message's line breaks and names its title for a screen reader", () => {
    render(<NoticeModal title="T" body={"a\n\nb"} onClose={() => {}} testId="n" />);
    const dialog = screen.getByTestId("n");
    expect(dialog.getAttribute("aria-labelledby")).toBe("n-title");
    expect(screen.getByTestId("n-body").textContent).toBe("a\n\nb");
  });
});
