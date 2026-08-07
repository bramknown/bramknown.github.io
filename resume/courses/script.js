document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const searchInput = document.getElementById('searchInput');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // ----- Section switching -----
  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === id);
    });
    // Clear search highlight when switching
    clearHighlights();
    searchInput.value = '';
    // Close mobile menu
    mainNav.classList.remove('open');
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      showSection(id);
      history.replaceState(null, '', `#${id}`);
    });
  });

  // Handle initial hash
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  }

  // ----- Mobile menu -----
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // ----- Search -----
  let originalContent = new Map();

  function storeOriginals() {
    document.querySelectorAll('.content-section').forEach(section => {
      originalContent.set(section.id, section.innerHTML);
    });
  }

  function clearHighlights() {
    originalContent.forEach((html, id) => {
      const sec = document.getElementById(id);
      if (sec) sec.innerHTML = html;
    });
  }

  function highlightText(root, query) {
    if (!query) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // Skip script/style and empty
        if (!node.parentElement || ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodesToReplace = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
        nodesToReplace.push(node);
      }
    }

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');

    nodesToReplace.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;

      const frag = document.createDocumentFragment();
      let lastIndex = 0;
      const text = textNode.textContent;
      let match;

      // Reset regex
      regex.lastIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const mark = document.createElement('mark');
        mark.className = 'highlight';
        mark.textContent = match[0];
        frag.appendChild(mark);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      parent.replaceChild(frag, textNode);
    });
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  storeOriginals();

  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = searchInput.value.trim();

      // Restore all sections first
      clearHighlights();

      if (!query) return;

      // Highlight in the currently active section
      const active = document.querySelector('.content-section.active');
      if (active) {
        highlightText(active, query);
      }

      // Also search across all sections and auto-switch if current has no matches
      let foundInActive = active && active.textContent.toLowerCase().includes(query.toLowerCase());

      if (!foundInActive) {
        for (const sec of sections) {
          if (sec.textContent.toLowerCase().includes(query.toLowerCase())) {
            showSection(sec.id);
            // Re-highlight after switch (showSection clears, so do it again)
            setTimeout(() => {
              const nowActive = document.querySelector('.content-section.active');
              if (nowActive) highlightText(nowActive, query);
            }, 50);
            break;
          }
        }
      }
    }, 180);
  });

  // Keyboard shortcut: Ctrl/Cmd + K focuses search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
});