// Full-page screenshot over the DevTools protocol.
// The consent banner is hidden for the capture, not accepted: no consent is
// given to the site either way, and the dimming backdrop would otherwise grey
// out the whole screenshot.
const [,, url, out, width, waitMs] = process.argv;
const W = Number(width || 1280);

const list = await (await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent("about:blank")}`, { method: "PUT" })).json();
const ws = new WebSocket(list.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Emulation.setDeviceMetricsOverride", { width: W, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, Number(waitMs || 9000)));

// Scroll through once so lazy images load, then return to the top.
await send("Runtime.evaluate", {
  awaitPromise: true,
  expression: `(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 900));
  })()`,
});

// Hide consent UI and stop carousels so the capture is not mid-transition.
await send("Runtime.evaluate", {
  expression: `(() => {
    const kill = [];
    document.querySelectorAll('div,section,aside').forEach(el => {
      const t = (el.textContent || '').toLowerCase();
      const s = getComputedStyle(el);
      if ((s.position === 'fixed' || s.position === 'sticky') &&
          (t.includes('kolači') || t.includes('cookie') || t.includes('privolu'))) kill.push(el);
      if (s.position === 'fixed' && s.zIndex > 100 && el.offsetHeight > 400 &&
          s.backgroundColor.startsWith('rgba(0, 0, 0')) kill.push(el);
    });
    kill.forEach(el => el.remove());
    document.querySelectorAll('*').forEach(el => {
      el.style.animationPlayState = 'paused';
      el.style.transitionDuration = '0s';
    });
    return kill.length;
  })()`,
});
await new Promise((r) => setTimeout(r, 1200));

const { data } = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  fromSurface: true,
});
const { writeFileSync } = await import("node:fs");
writeFileSync(out, Buffer.from(data, "base64"));
console.log("saved", out);
ws.close();
process.exit(0);
