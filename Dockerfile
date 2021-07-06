FROM node:lts-alpine AS ui-build
WORKDIR /root/
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:lts-alpine AS server-build
ENV PORT=5000
WORKDIR /root/
COPY --from=ui-build /root/client/dist ./client/dist
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/src/ ./server/

EXPOSE 5000

CMD ["node", "./server/server.js"]