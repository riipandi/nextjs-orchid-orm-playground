# -----------------------------------------------------------------------------
# Build dependencies
# -----------------------------------------------------------------------------
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# -----------------------------------------------------------------------------
# Rebuild the source code only when needed
# -----------------------------------------------------------------------------
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# -----------------------------------------------------------------------------
# Production image, copy all the files and run next
# -----------------------------------------------------------------------------
FROM node:18-alpine AS runner
LABEL org.opencontainers.image.source="https://github.com/riipandi/nextjs-orchid-orm-playground"

ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG SPOTIFY_CLIENT_ID
ARG SPOTIFY_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG SMTP_SECURE
ARG SMTP_MAIL_FROM

ENV DATABASE_URL $DATABASE_URL
ENV NEXTAUTH_SECRET $NEXTAUTH_SECRET
ENV SPOTIFY_CLIENT_ID $SPOTIFY_CLIENT_ID
ENV SPOTIFY_CLIENT_SECRET $SPOTIFY_CLIENT_SECRET
ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET
ENV SMTP_HOST $SMTP_HOST
ENV SMTP_PORT $SMTP_PORT
ENV SMTP_USERNAME $SMTP_USERNAME
ENV SMTP_PASSWORD $SMTP_PASSWORD
ENV SMTP_SECURE $SMTP_SECURE
ENV SMTP_MAIL_FROM $SMTP_MAIL_FROM

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]
