# Studio Ivan Henrique — protótipo de site

Proposta não oficial de site para o Studio Ivan Henrique (tatuagem e piercing, Joinville/SC).
Fora dos buscadores (`noindex` + `robots.txt`).

## Rodar

```sh
bun install
bun run dev      # desenvolvimento
bun run build    # build de produção em dist/
```

## Conteúdo

Todo o texto, artistas, serviços e links ficam em `src/data/site.ts`.
Campos `null` (endereço, horários, mapa, fotos) mostram espaços reservados até serem preenchidos.

## Deploy

Push na `main` publica no GitHub Pages via `.github/workflows/deploy.yml`.
