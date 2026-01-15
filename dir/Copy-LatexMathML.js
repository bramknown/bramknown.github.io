// ==UserScript==
// @name         Grokipedia - Click Equation to Copy LaTeX/MathML
// @namespace    https://github.com/yourname/userscripts
// @version      0.1
// @description  Copy LaTeX or MathML equation
// @author       Brum
// @match        https://grokipedia.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    let preferredFormat = localStorage.getItem('grok-math-format') || 'latex';

    GM_addStyle(`
        /* Global format selector styling */
        .grok-global-format {
            font-size: 0.9em;
            margin-right: 4px;
        }
        .format-dropdown {
            position: relative;
            user-select: none;
        }
        .format-btn {
            background: transparent;
            border: 1px solid var(--border, #444);
            border-radius: 9999px;
            padding: 6px 10px;
            cursor: pointer;
            font-size: 0.85em;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: background 0.15s;
            color: inherit;
        }
        .format-btn:hover {
            background: rgba(255,255,255,0.08);
        }
        .format-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--bg, #1e1e1e);
            border: 1px solid var(--border, #444);
            border-radius: 8px;
            box-shadow: 0 6px 16px rgba(0,0,0,0.4);
            min-width: 110px;
            z-index: 9999;
            display: none;
            margin-top: 6px;
            overflow: hidden;
        }
        .format-menu.show {
            display: block;
        }
        .format-item {
            padding: 6px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9em;
        }
        .format-item:hover {
            background: rgba(100,100,100,0.3);
        }
        .format-item .check {
            visibility: hidden;
            color: #34d058;
        }
        .format-item.active .check {
            visibility: visible;
        }

        /* Click-to-copy feedback */
        .katex {
            cursor: pointer;
            transition: all 0.18s ease;
            position: relative;
        }
        .katex:hover {
            background: rgba(80, 140, 255, 0.08);
        }
        .katex.copied-flash {
            box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.6);
            animation: flash 0.6s ease-out;
        }
        @keyframes flash {
            0%   { box-shadow: 0 0 0 3px rgba(40,167,69,0.6); }
            100% { box-shadow: 0 0 0 3px transparent; }
        }
        .copy-tooltip {
            position: absolute;
            top: -36px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.85);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.85em;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 100;
        }
        .copy-tooltip.show {
            opacity: 1;
        }
    `);

    // ── Global format selector (before theme button) ──
    function tryInjectFormatSelector() {
        const themeBtn = document.querySelector(
            'button[aria-haspopup="menu"][class*="inline-flex"][class*="items-center"][class*="rounded-full"][class*="focus-visible:ring"]'
        );
        if (!themeBtn || document.getElementById('grok-global-format')) return false;

        const container = document.createElement('div');
        container.id = 'grok-global-format';
        container.className = 'grok-global-format inline-flex items-center';

        container.innerHTML = `
            <div class="format-dropdown">
                <button class="format-btn" title="Click equation to copy as...">
                    <span class="current">${preferredFormat === 'latex' ? 'LaTeX' : 'MathML'}</span>
                    <span>▼</span>
                </button>
                <div class="format-menu">
                    <div class="format-item ${preferredFormat === 'latex' ? 'active' : ''}" data-value="latex">
                        LaTeX <span class="check">✔</span>
                    </div>
                    <div class="format-item ${preferredFormat === 'mathml' ? 'active' : ''}" data-value="mathml">
                        MathML <span class="check">✔</span>
                    </div>
                </div>
            </div>
        `;

        themeBtn.parentNode.insertBefore(container, themeBtn);

        const btn  = container.querySelector('.format-btn');
        const menu = container.querySelector('.format-menu');
        const curr = container.querySelector('.current');

        btn.addEventListener('click', e => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });

        document.addEventListener('click', e => {
            if (!container.contains(e.target)) menu.classList.remove('show');
        });

        menu.addEventListener('click', e => {
            const item = e.target.closest('.format-item');
            if (!item) return;
            preferredFormat = item.dataset.value;
            localStorage.setItem('grok-math-format', preferredFormat);
            curr.textContent = preferredFormat === 'latex' ? 'LaTeX' : 'MathML';
            menu.querySelectorAll('.format-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            menu.classList.remove('show');
        });

        return true;
    }

    // ── Click equation → copy ──
    function enableClickToCopy() {
        document.querySelectorAll('.katex:not([data-grok-click-copy])').forEach(kEl => {
            kEl.dataset.grokClickCopy = "true";

            const ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
            if (!ann) return;
            const latex = ann.textContent.trim();
            if (!latex) return;

            let mathML = kEl.querySelector('math')?.outerHTML || '';
            if (window.temml) {
                try {
                    mathML = temml.renderToString(latex, {
                        displayMode: kEl.closest('.katex-display, .block-math') !== null,
                        throwOnError: false
                    }) || mathML;
                } catch {}
            }

            // Create floating tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            kEl.appendChild(tooltip);

            kEl.addEventListener('click', async (e) => {
                // Prevent click from bubbling if inside links etc.
                e.stopPropagation();

                const text = preferredFormat === 'latex'
                    ? latex
                    : (mathML ? mathML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim() : '<!-- no MathML -->');

                try {
                    await navigator.clipboard.writeText(text);

                    // Visual feedback
                    kEl.classList.add('copied-flash');
                    tooltip.textContent = `Copied ${preferredFormat.toUpperCase()}`;
                    tooltip.classList.add('show');

                    setTimeout(() => {
                        kEl.classList.remove('copied-flash');
                        tooltip.classList.remove('show');
                    }, 1400);
                } catch (err) {
                    tooltip.textContent = 'Copy failed';
                    tooltip.classList.add('show');
                    setTimeout(() => tooltip.classList.remove('show'), 1800);
                    console.error('Clipboard error', err);
                }
            });
        });
    }

    // ── Initialization ──
    const observer = new MutationObserver(() => {
        if (tryInjectFormatSelector()) {
            // Can disconnect if you want, but keeping it alive is fine
        }
        enableClickToCopy();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    tryInjectFormatSelector();
    enableClickToCopy();

    // Extra pass for very late-rendered math
    setTimeout(enableClickToCopy, 4000);
})();