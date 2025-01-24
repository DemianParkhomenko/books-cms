-- This migration creates an index on the publication year
-- after converting the TIMESTAMPTZ column to UTC and extracting the year.
CREATE INDEX "idx_book_publicized_year" ON "book"(EXTRACT(YEAR FROM "publicizedAt" AT TIME ZONE 'UTC'));

