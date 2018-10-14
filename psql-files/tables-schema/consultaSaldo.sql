--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: consultaSaldo; Type: TABLE; Schema: public; Owner: gis
--

CREATE TABLE public."consultaSaldo" (
    id integer NOT NULL,
    geom public.geometry(Point,4326),
    "EmpresaId" character varying,
    "Location" character varying,
    lat double precision,
    lgn double precision,
    "Description" character varying,
    "Type" character varying,
    "time" character varying,
    provincia character varying,
    localidad character varying,
    calification character varying,
    "BranchType" character varying,
    field_12 character varying,
    field_13 character varying
);


ALTER TABLE public."consultaSaldo" OWNER TO gis;

--
-- Name: consultaSaldo_id_seq; Type: SEQUENCE; Schema: public; Owner: gis
--

CREATE SEQUENCE public."consultaSaldo_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."consultaSaldo_id_seq" OWNER TO gis;

--
-- Name: consultaSaldo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gis
--

ALTER SEQUENCE public."consultaSaldo_id_seq" OWNED BY public."consultaSaldo".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: gis
--

ALTER TABLE ONLY public."consultaSaldo" ALTER COLUMN id SET DEFAULT nextval('public."consultaSaldo_id_seq"'::regclass);


--
-- Name: consultaSaldo_pkey; Type: CONSTRAINT; Schema: public; Owner: gis
--

ALTER TABLE ONLY public."consultaSaldo"
    ADD CONSTRAINT "consultaSaldo_pkey" PRIMARY KEY (id);


--
-- Name: sidx_consultaSaldo_geom; Type: INDEX; Schema: public; Owner: gis
--

CREATE INDEX "sidx_consultaSaldo_geom" ON public."consultaSaldo" USING gist (geom);


--
-- PostgreSQL database dump complete
--

