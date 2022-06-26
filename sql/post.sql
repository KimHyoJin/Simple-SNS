-- Table: public.post

-- DROP TABLE IF EXISTS public.post;

CREATE TABLE IF NOT EXISTS public.post
(
    id integer NOT NULL DEFAULT nextval('post_id_seq'::regclass),
    body text COLLATE pg_catalog."default",
    registered_at timestamp without time zone,
    removed_at timestamp without time zone,
    title character varying(255) COLLATE pg_catalog."default",
    updated_at timestamp without time zone,
    user_id integer,
    CONSTRAINT post_pkey PRIMARY KEY (id),
    CONSTRAINT fk455dwbntke4dylt74tdbc90s1 FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.post
    OWNER to sohthnduwbipay;