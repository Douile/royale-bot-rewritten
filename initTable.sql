CREATE TABLE server_data (
  server_id text NOT NULL,
  server_name text,
  last_help_msg text,
  last_help_channel text,
  last_status_msg text,
  last_status_channel text,
  locale text NOT NULL DEFAULT 'en',
  prefix text NOT NULL DEFAULT '.rb ',
  priority smallint,
  premium boolean NOT NULL DEFAULT false,
  last_seen int,
  next_shop int,
  latest_shop text
);
CREATE TABLE server_backgrounds (
  server_id text NOT NULL,
  background_url text NOT NULL,
  background_type text NOT NULL
);
CREATE TABLE server_channels (
  server_id text NOT NULL,
  channel_id text NOT NULL,
  channel_type text NOT NULL
);
CREATE TABLE user_links (
  user_id text NOT NULL,
  user_nickname text NOT NULL,
  user_platform text NOT NULL
);
CREATE TABLE cache_data (
  type text NOT NULL,
  value text
);
