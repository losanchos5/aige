# Painting credits

All paintings are by Claude Monet (1840 to 1926). Every file in this folder is public domain: the
painter died in 1926, and each Wikimedia Commons file page below carries a public domain or CC0
licence tag (checked through the Commons API, `extmetadata.LicenseShortName`, on 2026-11-15). The
originals were downloaded from Commons at full resolution and encoded to WebP by
`scripts/paintings-build.mjs` (sharp; metadata stripped; never wider than the original). Nothing is
fetched at runtime. The same records, with the intrinsic size of every file, live in
`src/data/paintings.ts`.

| Files (`monet-<slug>-<year>-<width>.webp`) | Painting | Year | Original | Commons file page | Licence (Commons) |
|---|---|---|---|---|---|
| `monet-morning-seine-giverny-1897-{640,1280}`, `-crop-byline-{320,640}`, `-crop-cite-{320,640}` | Morning on the Seine near Giverny | 1897 | 3791 x 3345, The Metropolitan Museum of Art | https://commons.wikimedia.org/wiki/File:Morning_on_the_Seine_near_Giverny_MET_DT1903.jpg | CC0 (The Met Open Access) |
| `monet-ice-floes-1893-{1200,1600,2400}` | Ice Floes | 1893 | 3811 x 2522, The Metropolitan Museum of Art | https://commons.wikimedia.org/wiki/File:Ice_Floes_MET_DT2158.jpg | CC0 (The Met Open Access) |
| `monet-charing-cross-bridge-1899-{1200,1600,2000}` | Charing Cross Bridge | 1899 | 2000 x 1625, Museo Thyssen-Bornemisza | https://commons.wikimedia.org/wiki/File:Charing_Cross_Bridge,_Monet.jpg | Public domain |
| `monet-pourville-cliff-morning-1897-{640,1280}` | A Cliff at Pourville in the Morning | 1897 | 3836 x 2483, Montreal Museum of Fine Arts (photo by Pymouss) | https://commons.wikimedia.org/wiki/File:MBAM_Monet_-_Falaise_de_Pourville,_le_matin.jpg | Public domain |
| `monet-pourville-misty-morning-1882-{1200,1600,2400}` | Misty Morning at Pourville | 1882 | 2400 x 1955, Birmingham Museum of Art | https://commons.wikimedia.org/wiki/File:Le_Matin_temps_brumeux_Pourville_(1882)_Claude_Monet_-_Birmingham_Museum_of_Art_(W_711).jpg | Public domain |
| `monet-vetheuil-fog-1879-{640,1280}` | Vétheuil in the Fog | 1879 | 1500 x 1256, via WikiArt | https://commons.wikimedia.org/wiki/File:Monet,_Claude_-_Vetheuil_in_the_Fog.jpg | Public domain |
| `monet-vernon-church-fog-1894-{640,1275}` | The Church at Vernon, Fog | 1894 | 1275 x 912, copied from an art book | https://commons.wikimedia.org/wiki/File:Monet_-_Kirche_von_Vernon_im_Nebel_-_1894.jpg | Public domain |
| `monet-antibes-morning-1888-{640,1280}` | Morning at Antibes | 1888 | 1500 x 1201, Philadelphia Museum of Art | https://commons.wikimedia.org/wiki/File:Morning_at_Antibes_(Claude_Monet,_1888).jpg | Public domain |

The closing band reuses the hero painting in `public/hero/` (The Seine at Giverny, 1897, National
Gallery of Art, Washington, Open Access, public domain; Commons file page
https://commons.wikimedia.org/wiki/File:Claude_Monet,_The_Seine_at_Giverny,_1897,_NGA_46655.jpg).

Notes:

- The "Public domain" files are faithful photographs of two-dimensional public domain works
  (Commons PD-Art); the photograph adds no new copyright in the EU (Directive 2019/790, Art. 14) or
  the US. The Met files are additionally dedicated CC0 by the museum.
- The two crops of Morning on the Seine near Giverny serve the thin frames: `byline` is the
  blue-green water with yellow and rose flecks (34% to 80% across, 44% to 60% down the original),
  `cite` the upper river and trees (24% to 79% across, 7% to 84% down).
- Misty Morning at Pourville and Vétheuil in the Fog carry heavy scan grain; the script applies a
  0.7 px gaussian before encoding, which halves their bytes without touching the brushwork.
