-- Catalog of daily upgrades. min_day = earliest day this can appear in a pick.
-- Week 1 (John): base avatar + simple gear.
-- Week 2 (Romans): face customization.
-- Week 3 (Ephesians): armor of God pieces.

insert into upgrades_catalog (id, category, name, icon, min_day) values
  -- Week 1
  ('w1_base_red',      'base_avatar', 'Crimson Hoodie',  'person',      1),
  ('w1_base_blue',     'base_avatar', 'Tactical Jacket', 'person',      1),
  ('w1_base_green',    'base_avatar', 'Forest Cloak',    'person',      1),
  ('w1_weapon_sword',  'weapon',      'Steel Sword',     'swords',      2),
  ('w1_weapon_dagger', 'weapon',      'Iron Dagger',     'cut',         2),
  ('w1_weapon_staff',  'weapon',      'Wooden Staff',    'sports_martial_arts', 2),
  ('w1_armor_jacket',  'armor',       'Starter Jacket',  'apparel',     3),
  ('w1_armor_vest',    'armor',       'Padded Vest',     'security',    3),
  ('w1_armor_cloak',   'armor',       'Linen Cloak',     'umbrella',    3),
  ('w1_comp_dog',      'companion',   'Loyal Dog',       'pets',        5),
  ('w1_comp_cat',      'companion',   'Watchful Cat',    'pets',        5),
  ('w1_comp_bird',     'companion',   'Brave Sparrow',   'flutter_dash',5),
  -- Week 2 (face)
  ('w2_face_visor',    'face',        'Glowing Visor',   'visibility',  8),
  ('w2_face_shades',   'face',        'Stealth Shades',  'sunny',       8),
  ('w2_face_mask',     'face',        'Battle Mask',     'masks',       8),
  ('w2_face_crown',    'face',        'Crown of Zeal',   'crown',      11),
  ('w2_face_halo',     'face',        'Halo of Light',   'sunny',      11),
  ('w2_face_paint',    'face',        'War Paint',       'palette',    11),
  -- Week 3 (armor of God)
  ('w3_belt_truth',    'armor',  'Belt of Truth',           'redeem',         15),
  ('w3_breastplate',   'armor',  'Breastplate of Righteousness','shield_lock',16),
  ('w3_shoes_peace',   'armor',  'Shoes of Peace',          'footprint',      18),
  ('w3_shield_faith',  'armor',  'Shield of Faith',         'shield',         19),
  ('w3_helmet_salv',   'armor',  'Helmet of Salvation',     'sports_motorsports', 19),
  ('w3_sword_spirit',  'weapon', 'Sword of the Spirit',     'auto_awesome',   20)
on conflict (id) do update set
  category = excluded.category,
  name     = excluded.name,
  icon     = excluded.icon,
  min_day  = excluded.min_day;
