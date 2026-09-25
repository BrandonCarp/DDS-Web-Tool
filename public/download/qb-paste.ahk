#Requires AutoHotkey v2.0
#SingleInstance Force   ; running it again swaps in the new copy, with no "already running?" box

; Start with Windows. The first double-click is the only one ever needed: the
; script puts a shortcut to itself in the Startup folder, and repoints it if the
; file has moved since. Keep this file somewhere it will stay (Documents, not
; Downloads) — the shortcut points at wherever it is.
startupLink := A_Startup "\DDS QuickBooks paste.lnk"
current := ""
if FileExist(startupLink)
    FileGetShortcut startupLink, &current
if (current != A_ScriptFullPath) {
    try FileDelete startupLink
    FileCreateShortcut A_ScriptFullPath, startupLink
}

; Types a tab-separated clipboard line into QuickBooks, field by field.
; F9 with the cursor in the first cell of an invoice line.
;
; Scoped to the QuickBooks window only, so F9 behaves normally everywhere else.

#HotIf WinActive("ahk_exe qbw32.exe") or WinActive("ahk_exe qbw.exe")

F9:: {
    line := A_Clipboard
    if (line = "") {
        MsgBox "Clipboard is empty."
        return
    }
    fields := StrSplit(Trim(line, " `t`r`n"), "`t")
    for i, f in fields {
        ; QuickBooks fills Description from the item's own default as soon as
        ; you Tab out of the Item column. Clear whatever it put there before
        ; typing the real description, or the two run together.
        ; End, shift+Home, Backspace is cell-scoped — Ctrl+A would reach wider.
        if (i > 1) {
            Send "{End}+{Home}{BackSpace}"
            Sleep 40
        }
        SendText f
        if (i < fields.Length)
            Send "{Tab}"
        ; Raise this if fields still land in the wrong column — QuickBooks drops
        ; keystrokes that arrive faster than its grid redraws.
        Sleep 120
    }
}

#HotIf
