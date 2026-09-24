"use client";

/**
 * The QuickBooks paste helper, and how to install it.
 *
 * Copy for QuickBooks puts a whole invoice line on the clipboard —
 * ITEM, DESCRIPTION, QTY, RATE, tab separated. QuickBooks will not spread a
 * multi-column paste across a row, and its own Copy Line uses a private
 * clipboard format a browser cannot write, so a small AutoHotkey script does
 * the spreading: it reads the clipboard, splits on the tabs, and types each
 * field with a Tab between.
 *
 * Written for someone who has never installed anything like this. The step
 * people miss is that downloading the script does nothing — it has to be
 * double-clicked to start, and it stops at the next restart unless a shortcut
 * goes in the startup folder.
 */
export function QuickBooksSetup() {
  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel qbsetup" data-testid="qb-setup">
          <div className="ghdr">QuickBooks paste helper — one-time setup</div>
          <div className="qbsetup-body">
            <p>
              This lets <strong>Copy for QuickBooks</strong> fill an entire invoice
              line — item, description, quantity and rate — instead of typing each
              box. Set it up once on this computer and it works from then on.
              About five minutes.
            </p>

            <h4 className="qbstep-h">Step 1 — Install AutoHotkey</h4>
            <p>
              This is the program that does the typing. Download it, run the
              installer, and choose <strong>Express Installation</strong> if asked.
            </p>
            <div className="qbdl">
              <a className="btn primary" href="/download/AutoHotkey_2_0_28_setup.exe"
                 download data-testid="dl-ahk">Download AutoHotkey v2.0.28</a>
            </div>
            <p className="muted-note">
              Windows may warn that the file is not commonly downloaded. Choose{" "}
              <strong>Keep</strong>, then <strong>More info</strong> and{" "}
              <strong>Run anyway</strong>. It is the official AutoHotkey installer.
            </p>

            <h4 className="qbstep-h">Step 2 — Download the script</h4>
            <p>
              Save it somewhere you will not delete by accident — Documents is fine.
              The folder does not matter, as long as it stays there.
            </p>
            <div className="qbdl">
              <a className="btn primary" href="/download/qb-paste.ahk"
                 download data-testid="dl-script">Download qb-paste.ahk</a>
            </div>

            <h4 className="qbstep-h">Step 3 — Start it</h4>
            <p>
              <strong>Double-click the file you just saved.</strong> Nothing appears
              to happen, and that is correct — it runs in the background and puts a
              green <strong>H</strong> icon in the system tray near the clock. You
              may need to click the <strong>^</strong> arrow to see it.
            </p>
            <p className="muted-note">
              Downloading the file is not enough. If it has never been
              double-clicked, F9 will do nothing.
            </p>

            <h4 className="qbstep-h">Step 4 — Make it start every morning</h4>
            <p>Otherwise it stops when the computer restarts.</p>
            <ol className="qbsteps">
              <li>
                Right-click the script file, then <strong>Show more options</strong>{" "}
                and <strong>Create shortcut</strong>
              </li>
              <li>
                Press <kbd>Win</kbd>+<kbd>R</kbd>, type <code>shell:startup</code>,
                press Enter — a folder opens
              </li>
              <li>Drag the shortcut into that folder</li>
            </ol>

            <h4 className="qbstep-h">How to use it</h4>
            <ol className="qbsteps">
              <li>Build the quote here and press <strong>Copy for QuickBooks</strong></li>
              <li>
                In QuickBooks, click the <strong>first box</strong> of an invoice
                line — the Item column
              </li>
              <li>Press <kbd>F9</kbd></li>
            </ol>
            <p>
              The whole row fills in. F9 only does anything while QuickBooks is the
              active window, so it behaves normally everywhere else.
            </p>

            <h4 className="qbstep-h">If something goes wrong</h4>
            <ul className="qbsteps">
              <li>
                <strong>F9 does nothing</strong> — look for the green H in the tray.
                No icon means the script is not running; double-click it again.
              </li>
             
              <li>
                <strong>Only the first box fills</strong> — the clipboard lost the
                tabs between fields. Press Copy for QuickBooks again and retry.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
