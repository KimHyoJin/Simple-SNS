-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    password character varying(255) COLLATE pg_catalog."default",
    registered_at timestamp without time zone,
    removed_at timestamp without time zone,
    role character varying(255) COLLATE pg_catalog."default",
    updated_at timestamp without time zone,
    user_name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT uk_lqjrcobrh9jc8wpcar64q1bfh UNIQUE (user_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to sohthnduwbipay;