
### STAGE 1 - BUILD ###
FROM node:14-alpine as BUILD_IMAGE

# Install dependencies for installing dependencies & building app
RUN apk add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Set work directory
WORKDIR /build

# Copying App files
COPY . .

# Set NODE_ENV as production for optimization
ENV NODE_ENV production

# Copying .env
COPY ./.env.prod ./.env

# Setup private dependencies
COPY .npmrc .npmrc
COPY package.json package.json

# Installing node dependencies
RUN yarn install
RUN yarn build

# Removing .npmrc
RUN rm -f .npmrc

# Remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

### STAGE 2 - RUN ###
FROM node:14-alpine

# Create NODE user
# USER node 

WORKDIR /home/node/app
# --chown=node:node
COPY  ./.env.prod ./.env
COPY  --from=BUILD_IMAGE /build/package.json ./
COPY  --from=BUILD_IMAGE /build/dist ./dist
COPY  --from=BUILD_IMAGE /build/node_modules ./node_modules

ENV PORT 80
EXPOSE 80
CMD ["node", "/home/node/app/dist/main"]