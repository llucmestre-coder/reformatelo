# Web de REFORMATELO (Alex Vela) — maqueta

Web estàtica (obre `index.html` al navegador, sense build). Feta amb el playbook
`../PLANTILLA-NOVA-WEB.md`; les decisions de disseny estan justificades a `PLA.md`.

## Estructura

| Fitxer | Què és |
|---|---|
| `index.html` | Portada: hero, tria particular/comunitat, **edifici interactiu** (element signatura), stats, valors, CTA |
| `reformas.html` | Serveis per a particulars + procés + FAQ |
| `comunidades.html` | Serveis per a comunitats/administradors + FAQ |
| `contacto.html` | Formulari (per sobre del fold), dades, mapa |
| `aviso-legal.html` · `politica-privacidad.html` · `politica-cookies.html` | Esquelets legals amb camps `[...]` per omplir |
| `css/styles.css` | Tot l'estil (tokens a `:root`) |
| `js/main.js` | Menú, edifici interactiu, comptadors, reveals, formulari, loader de ressenyes |
| `data/reviews.json` | Valoració de Google (l'actualitza el workflow) |
| `.github/workflows/update-reviews.yml` | Auto-actualització de la valoració 2×/dia (cal PLACE_ID + API key) |
| `assets/` | Logo (descarregat de la seva web) i favicon (derivat del logo) |

## Placeholders pendents (cercables)

| Cerca | Què cal fer |
|---|---|
| `XXXXXXXX` | ID de Formspree a `contacto.html` (instruccions al comentari del formulari) + activar el fetch real a `js/main.js` |
| `[FECHA]`, `[NIF]`, `[DATOS DEL REGISTRO...]`, `[CONFIRMAR...]`, `[PROVEEDOR...]` | Camps de les 3 pàgines legals |
| `FOTO REAL PENDENT` | Comentaris HTML sobre cada placeholder de foto |
| `PENDENT_DE_CONFIGURAR` | Place ID al workflow de ressenyes |
| `CONFIRMAR A LA REUNIÓ` | Franja de San Juan de Dios a `index.html` |

## Inventari de fotos que cal demanar al client

Format ideal: JPG horitzontal 4:3, mínim 1200×900, ben il·luminades.

1. **Bany reformat** (1) — `reformas.html`. Si tenen abans/després, millor.
2. **Cuina reformada** (1) — `reformas.html`.
3. **Reforma integral** (1 — saló o distribució nova) — `reformas.html`.
4. ~~**Terrat impermeabilitzat**~~ ✔ posada (provisional, de l'Instagram — vegeu sota).
5. **Façana rehabilitada** o bastida treballant (1) — `comunidades.html`.
6. **Baixant de PVC nou** o camió cuba treballant (1) — `comunidades.html`.
7. ~~*(Opcional)* Foto d'Alex Vela o de l'equip en obra~~ ✔ posada (provisional, de l'Instagram).

En substituir un placeholder: canviar el `<div class="foto-pendent">` per
`<img src="assets/….jpg" alt="…" width="1200" height="900" loading="lazy">`
i esborrar el comentari `FOTO REAL PENDENT`.

### Fotos importades de l'Instagram del client (2026-07-13)

De @reformateloservicios (material propi del client, 10 publicacions revisades):

| Fitxer | Origen | On és | Nota |
|---|---|---|---|
| `assets/ig-terrado-poliuretano.jpg` | Reel jul. 2023 «Impermeabilización de terrado comunitario…» | `comunidades.html` (Trabajos recientes) | És la miniatura del vídeo (540×960, vertical). Demanar al client fotos originals del terrat en més resolució. |
| `assets/ig-equipo-camiseta.webp` | Post juny 2023 «Trabajando con buenas vistas!!» | `index.html` (Por qué Reformatelo) | 1440×1440. D'esquena amb samarreta de marca; no confirmem al peu que sigui l'Alex. |
| `assets/ig-furgoneta-rotulada.webp` | Post maig 2023 «Ya esta aqui!!!» | `contacto.html` (sota el mapa) | 1440×1440. Matrícula ja difuminada a l'original. |

No hi ha més fotos d'obra a l'Instagram (la resta són gràfics promocionals,
eines Bosch, targetes i la furgo blanca sense retolar). **Confirmar amb el
client a la reunió que podem usar aquestes fotos a la web.**

## Notes tècniques

- Els números de prova social (5,0 / 6 ressenyes) es llegeixen de `data/reviews.json`
  quan la web se serveix per http; amb `file://` queden els valors de l'HTML.
- Canonicals i JSON-LD apunten a `https://www.reformatelo.net/` (el seu domini
  actual). Si es publica a un altre domini, cercar-hi `reformatelo.net` i canviar-ho.
- El codi postal 08028 de l'adreça és el del barri; **confirmar-lo** (vegeu REUNION-CLIENTE).
- Fonts: Google Fonts (Fraunces + Karla). Mapa: embed públic de Google Maps per adreça
  (sense coordenades falsificades, sense API key).
