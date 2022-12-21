### Setup Supabase Project & Prisma

initiate Prisma:
- npm i -D prisma
- npx prisma init

setup .env variables

install Prisma Client
- npm install @prisma/client
- npx prisma generate

create table in Supabase
- npx prisma db push
or
- npx prisma migrate dev