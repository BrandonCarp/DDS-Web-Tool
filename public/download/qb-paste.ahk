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

; Types the clipboard into QuickBooks: one invoice line per clipboard line,
; field by field. F9 with the cursor in the first cell of an invoice line.
; A blank clipboard line leaves a row empty — a door and its vinyl land on rows
; 1 and 3 (Brandon, 25/9/2026).
;
; Scoped to the QuickBooks window only, so F9 behaves normally everywhere else.

#HotIf WinActive("ahk_exe qbw32.exe") or WinActive("ahk_exe qbw.exe")

F9:: {
    text := A_Clipboard
    if (text = "") {
        MsgBox "Clipboard is empty."
        return
    }
    ; The browser may write Windows line endings; `r is dropped from each line.
    lines := StrSplit(Trim(text, " `t`r`n"), "`n", "`r")
    col := 1     ; the column the cursor is in, counting Item as 1
    down := 0    ; rows to move down before the next line is typed
    for n, line in lines {
        if (n > 1)
            down += 1
        if (Trim(line) = "")
            continue
        if (down > 0) {
            ; Down keeps the column, so it is pressed from where the last line
            ; finished (Rate), never from Item, where it would walk the item
            ; list instead. Then Shift+Tab back to Item.
            Loop (down) {
                Send "{Down}"
                Sleep 150
            }
            Loop (col - 1) {
                Send "+{Tab}"
                Sleep 80
            }
            down := 0
        }
        fields := StrSplit(line, "`t")
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
        col := fields.Length
    }
}

#HotIf
