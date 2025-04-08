create table content_vectors (
  id bigserial primary key,
  document_id bigint not null references documents(id) on delete cascade,
  content text not null,
  embedding vector(768) not null
);