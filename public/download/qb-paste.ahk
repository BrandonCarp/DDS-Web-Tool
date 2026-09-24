#Requires AutoHotkey v2.0

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
        SendText f
        if (i < fields.Length)
            Send "{Tab}"
        Sleep 60
    }
}

#HotIf