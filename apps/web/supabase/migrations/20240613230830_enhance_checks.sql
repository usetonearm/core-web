ALTER TABLE checks ADD COLUMN volume INTEGER;
ALTER TABLE streams ADD COLUMN paused BOOLEAN DEFAULT FALSE;