create table content_vectors (
  id bigserial primary key,
  content text not null,
  embedding vector(768) not null
);