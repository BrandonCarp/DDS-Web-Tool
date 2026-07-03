-- DDS pricing app — accounts, sessions, and estimate log.
create table if not exists users (
  id            serial primary key,
  username      text unique not null,
  password_hash text not null,
  role          text not null default 'user',      -- 'admin' | 'semiadmin' | 'user'
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

create table if not exists sessions (
  token      text primary key,
  user_id    integer not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create table if not exists estimates (
  id          serial primary key,
  user_id     integer references users(id) on delete set null,
  username    text not null,
  model       text not null,
  size        text not null,
  style       text,
  color       text,
  unit_price  numeric(10,2) not null,
  qty         integer not null default 1,
  total       numeric(10,2) not null,
  description text,
  created_at  timestamptz not null default now()
);
create index if not exists estimates_created_idx on estimates (created_at desc);
