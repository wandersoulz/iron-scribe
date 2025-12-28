-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tables
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    stats JSONB NOT NULL -- { staminaBase, staminaPerLevel, recoveries }
);

CREATE TABLE IF NOT EXISTS heroes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    class_id UUID REFERENCES classes(id),
    name TEXT NOT NULL,
    level INTEGER DEFAULT 1,
    state JSONB DEFAULT '{}'::jsonb, -- { staminaDamage, recoveriesUsed, victories }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Seed Data: Root User
INSERT INTO profiles (id, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'void@iron-scribe.local')
ON CONFLICT (email) DO NOTHING;

-- 3. Seed Data: Classes
INSERT INTO classes (name, stats)
VALUES 
    ('Shadow', '{"staminaBase": 18, "staminaPerLevel": 6, "recoveries": 8}'),
    ('Tactician', '{"staminaBase": 21, "staminaPerLevel": 7, "recoveries": 10}')
ON CONFLICT (name) DO NOTHING;

-- 4. Seed Data: Initial Hero for Root User
-- We need to fetch the class IDs dynamically or hardcode them if we knew them. 
-- For simplicity in this script, we'll do a subquery insert.
INSERT INTO heroes (user_id, class_id, name, level, state)
SELECT 
    '00000000-0000-0000-0000-000000000000',
    c.id,
    'Kaelthas',
    1,
    '{"staminaDamage": 0, "recoveriesUsed": 0, "victories": 0}'
FROM classes c
WHERE c.name = 'Shadow'
AND NOT EXISTS (
    SELECT 1 FROM heroes 
    WHERE user_id = '00000000-0000-0000-0000-000000000000' 
    AND name = 'Kaelthas'
);
