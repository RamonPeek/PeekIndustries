    // Animated ellipsis on the status line
    const dotsEl = document.getElementById('dots');
    let t = 0; setInterval(() => { dotsEl.textContent = '.'.repeat(1 + (t++ % 3)); }, 600);

    // Dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();