# Snimke živih stranica za portfelj

Stranice projekata prikazuju snimke cijelih stranica u okviru kroz koji se
može pomicati (`src/components/sections/LiveScroll.tsx`).

## Zašto nije iframe

Webovi koje bismo ugradili šalju `frame-ancestors 'self'` i
`X-Frame-Options: SAMEORIGIN`, pa ih preglednik odbija uokviriti. Tražiti od
klijenta da olabavi sigurnosno zaglavlje kako bi ga portfelj mogao ugraditi
loša je razmjena — snimka radi isti posao bez tog ustupka.

Posljedica koju treba poštovati: **snimka je fotografija trenutka**. Zato uz
svaku stoji datum snimanja, a kad se web vidno promijeni, snimku treba
osvježiti.

## Postupak

Traži Google Chrome na računalu i Pillow (`python3 -c "import PIL"`).

1. Pokrenite Chrome bez sučelja, s otvorenim portom za upravljanje:

   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --headless=new --disable-gpu --hide-scrollbars \
     --remote-debugging-port=9222 --user-data-dir=/tmp/cdp-profile about:blank &
   ```

2. Snimite stranicu skriptom `scripts/snimi-stranicu.mjs`:

   ```bash
   node scripts/snimi-stranicu.mjs https://100smartfood.hr/ /tmp/snimka.png 1280 10000
   ```

   Skripta prolazi kroz stranicu da se učitaju odgođene slike, **sakrije**
   prozor o kolačićima (ne prihvaća ga — privola se ne daje) i zaustavi
   animacije da snimka ne uhvati slider u pola prijelaza.

3. Pretvorite u webp i spremite u `public/projekti/`:

   ```bash
   python3 -c "
   from PIL import Image
   im = Image.open('/tmp/snimka.png').convert('RGB')
   im.save('public/projekti/<ime>.webp', 'WEBP', quality=72, method=6)
   print(im.size)"
   ```

4. Upišite zapis u `src/content/projects.ts` → `liveScreens`, s **stvarnim**
   dimenzijama koje je ispisao prethodni korak i s datumom snimanja.

Chrome nakon snimanja ugasite: `pkill -f "remote-debugging-port=9222"`.
