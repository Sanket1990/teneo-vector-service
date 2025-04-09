create table content_vectors (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  chunk_index int not null,
  content text not null,
  embedding vector(768) not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);