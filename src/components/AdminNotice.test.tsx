// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AdminPanel } from "./AdminPanel";

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: () => {} }) }));

/**
 * The admin panel's Sign-in notice view (Brandon, 20/10/2026): the master
 * admin writes the title and message, switches it on or off, previews the
 * window and saves; a semi-admin has no such view.
 */
const base = { users: [], estimates: [], monthEstimates: [], logins: [], meId: 1, username: "brandon" };
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("the sign-in notice in the admin panel", () => {
  it("is a view of the master admin's, loaded as saved", () => {
    render(<AdminPanel {...base} master notice={{ enabled: true, title: "T", body: "B", updated_at: "2026-10-20T14:00:00Z", updated_by: "brandon" }} />);
    fireEvent.click(screen.getByTestId("adm-nav-notice"));
    expect((screen.getByTestId("notice-on") as HTMLInputElement).checked).toBe(true);
    expect((screen.getByTestId("notice-title") as HTMLInputElement).value).toBe("T");
    expect((screen.getByTestId("notice-body") as HTMLTextAreaElement).value).toBe("B");
    expect(screen.getByTestId("notice-status").textContent).toMatch(/^On — shows at every sign-in · saved .* by brandon$/);
    expect((screen.getByTestId("notice-save") as HTMLButtonElement).disabled).toBe(true);
  });

  it("is not offered to a semi-admin", () => {
    render(<AdminPanel {...base} master={false} />);
    expect(screen.queryByTestId("adm-nav-notice")).toBeNull();
  });

  it("saves what was typed and the switch, and reads back as saved", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({
      ok: true, notice: { enabled: true, title: "Heads up", body: "Closed Friday.", updated_by: "brandon" },
    }), { status: 200, headers: { "content-type": "application/json" } }));
    render(<AdminPanel {...base} master />);
    fireEvent.click(screen.getByTestId("adm-nav-notice"));
    expect(screen.getByTestId("notice-status").textContent).toBe("Off");
    fireEvent.click(screen.getByTestId("notice-on"));
    fireEvent.change(screen.getByTestId("notice-title"), { target: { value: " Heads up " } });
    fireEvent.change(screen.getByTestId("notice-body"), { target: { value: "Closed Friday. " } });
    expect(screen.getByTestId("notice-status").textContent).toBe("Not saved");
    fireEvent.click(screen.getByTestId("notice-save"));
    await waitFor(() => expect(screen.getByTestId("notice-status").textContent).toMatch(/^On — shows at every sign-in/));
    expect(fetchSpy).toHaveBeenCalledWith("/api/admin/notice", expect.objectContaining({ method: "PUT" }));
    expect(JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string)).toEqual({ enabled: true, title: " Heads up ", body: "Closed Friday. " });
    expect((screen.getByTestId("notice-title") as HTMLInputElement).value).toBe("Heads up");
    expect((screen.getByTestId("notice-save") as HTMLButtonElement).disabled).toBe(true);
  });

  it("previews the window as the sign-in page will show it", () => {
    render(<AdminPanel {...base} master notice={{ enabled: false, title: "T", body: "B" }} />);
    fireEvent.click(screen.getByTestId("adm-nav-notice"));
    fireEvent.click(screen.getByTestId("notice-preview"));
    expect(screen.getByTestId("notice-preview-modal-title").textContent).toBe("T");
    expect(screen.getByTestId("notice-preview-modal-body").textContent).toBe("B");
    fireEvent.click(screen.getByTestId("notice-preview-modal-ok"));
    expect(screen.queryByTestId("notice-preview-modal")).toBeNull();
  });
});
