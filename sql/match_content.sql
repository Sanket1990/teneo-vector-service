create or replace function match_content_vectors (
  query_embedding vector(384),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    content_vectors.id,
    content_vectors.content,
    1 - (content_vectors.embedding <=> query_embedding) as similarity
  from content_vectors
  where 1 - (content_vectors.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;