# Production image for the Pinko site.
#
# Build context is this directory (pinko/), not the repository root:
#   docker build -t pinko-web .
#
# `NEXT_PUBLIC_*` values are inlined into the client bundle by `next build`,
# so they are build arguments. Everything secret (the mailbox password above
# all) is passed at run time and never as a build argument — build arguments
# stay readable in the image history.

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_ALLOW_INDEXING
ARG NEXT_PUBLIC_CONTACT_EMAIL
# An argument that is not passed still produces a variable — an empty one.
# The config reads these with `||` so an empty value falls back to the
# default instead of winning; see the comment in src/config/site.ts.
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ALLOW_INDEXING=$NEXT_PUBLIC_ALLOW_INDEXING
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# The standalone server does not serve `public/` or `.next/static` itself,
# so both are copied in next to it.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# `public/` only exists once the portrait or other assets are added, so the
# glob keeps the build working while the directory is still absent.
COPY --from=build /app/publi[c] ./public

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
USER nextjs

EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1
CMD ["node", "server.js"]
