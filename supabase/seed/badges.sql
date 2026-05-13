insert into badges (id, name, icon, rarity) values
  ('first_step',     'First Step',      'directions_walk',   'common'),
  ('streak_3',       'Three-Day Flame', 'local_fire_department', 'rare'),
  ('streak_7',       'Week One Warrior','military_tech',     'rare'),
  ('pruner',         'The Pruner',      'content_cut',       'rare'),
  ('renewed_mind',   'Renewed Mind',    'psychology',        'rare'),
  ('peacemaker',     'Peacemaker',      'volunteer_activism','rare'),
  ('bold_witness',   'Bold Witness',    'campaign',          'epic'),
  ('full_armor',     'Full Armor',      'shield',            'epic'),
  ('summit_reached', 'Summit Reached',  'workspace_premium', 'legendary'),
  ('mystery_keeper', 'Mystery Keeper',  'card_giftcard',     'rare')
on conflict (id) do update set
  name   = excluded.name,
  icon   = excluded.icon,
  rarity = excluded.rarity;
