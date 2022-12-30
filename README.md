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


### GRANT access

GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;

GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;

GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;

GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;

GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;

### create policy on Supabase

alter table users enable row level security;
create policy "Can view own user data." on users for select using (next_auth.uid() = id);
create policy "Can update own user data." on users for update using (next_auth.uid() = id);


### This trigger automatically creates a user entry when a new user signs up via NextAuth

CREATE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim.sub', true), ''),
        (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, image)
  values (new.id, new.name, new.email, new.image);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on next_auth.users
  for each row execute procedure public.handle_new_user();