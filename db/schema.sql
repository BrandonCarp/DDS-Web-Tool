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

-- Quote type for the admin dashboard: 'residential' | 'commercial' | 'special' | 'spring'
alter table estimates add column if not exists quote_type text not null default 'residential';

-- Inventory, shelf parts first (25/9/2026). A barcode points at a part, and
-- every scan is one line in stock_moves: what is on hand is the sum of the
-- lines. Keeping each scan (rather than one number per part) is what makes a
-- wrong scan undoable and shows who moved what.
create table if not exists barcodes (
  code      text primary key,                -- exactly what the scanner types
  item_key  text not null,                   -- 'CATEGORY|PART NAME', as the price book spells them
  linked_by text not null,
  linked_at timestamptz not null default now()
);
create index if not exists barcodes_item_idx on barcodes (item_key);

create table if not exists stock_moves (
  id         bigserial primary key,
  item_key   text not null,
  change     integer not null,               -- pull -n, put away +n, count = the difference
  reason     text not null check (reason in ('pull', 'put_away', 'count')),
  code       text,                           -- the barcode scanned
  username   text not null,
  created_at timestamptz not null default now()
);
create index if not exists stock_moves_item_idx on stock_moves (item_key);

-- The first three test barcodes, linked up front so they scan from day one
-- (Brandon, 25/9/2026). More are linked from the Inventory tab. Running this
-- again changes nothing.
insert into barcodes (code, item_key, linked_by) values
  ('12345',   'FASTENERS|1/4" X 3/4" TEK',   'setup'),
  ('123456',  'FASTENERS|TRACK NUTS',        'setup'),
  ('1234567', 'FASTENERS|3/8" FLAT WASHERS', 'setup')
on conflict (code) do nothing;
