--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: pav_id_seq; Type: SEQUENCE; Schema: public; Owner: user3d
--

CREATE SEQUENCE pav_id_seq
    START WITH 4
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pav_id_seq OWNER TO user3d;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: pavimentos; Type: TABLE; Schema: public; Owner: user3d
--

CREATE TABLE pavimentos (
    id integer DEFAULT nextval('pav_id_seq'::regclass) NOT NULL,
    modelo character varying(50),
    archivo character varying(60),
    serie character varying(50)
);


ALTER TABLE pavimentos OWNER TO user3d;

--
-- Name: rev_id_seq; Type: SEQUENCE; Schema: public; Owner: user3d
--

CREATE SEQUENCE rev_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rev_id_seq OWNER TO user3d;

--
-- Name: revestimientos; Type: TABLE; Schema: public; Owner: user3d
--

CREATE TABLE revestimientos (
    id integer DEFAULT nextval('rev_id_seq'::regclass) NOT NULL,
    modelo character varying(50),
    archivo character varying(50),
    serie character varying(50)
);


ALTER TABLE revestimientos OWNER TO user3d;

--
-- Name: pav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user3d
--

SELECT pg_catalog.setval('pav_id_seq', 939, true);


--
-- Data for Name: pavimentos; Type: TABLE DATA; Schema: public; Owner: user3d
--

COPY pavimentos (id, modelo, archivo, serie) FROM stdin;
938	BOIS	bois.jpg	\N
939	CARRERA JAUNE	carrera_jaune.jpg	\N
932	ARIS MARRON	aris_marron.jpg	hola tu
937	ATLAS CLAIR	atlas_clair.jpg	eeeee
\.


--
-- Name: rev_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user3d
--

SELECT pg_catalog.setval('rev_id_seq', 101, true);


--
-- Data for Name: revestimientos; Type: TABLE DATA; Schema: public; Owner: user3d
--

COPY revestimientos (id, modelo, archivo, serie) FROM stdin;
100	JASMIN BEIGE	jasmin_beige.jpg	\N
101	MIRAGE CLAIR	mirage_clair.jpg	\N
96	ESMERALDA VERT	esmeralda_vert.jpg	que
99	GRANITE FORCE	granite_force.jpg	pasa
\.


--
-- Name: pavimentos_pkey; Type: CONSTRAINT; Schema: public; Owner: user3d
--

ALTER TABLE ONLY pavimentos
    ADD CONSTRAINT pavimentos_pkey PRIMARY KEY (id);


--
-- Name: revestimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: user3d
--

ALTER TABLE ONLY revestimientos
    ADD CONSTRAINT revestimientos_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

