CREATE TABLE app_user (
    app_user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE UNIQUE INDEX email_lower_idx ON app_user (LOWER(email));

CREATE TABLE template (
    template_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    raw JSON NOT NULL
);

CREATE TABLE answer (
    answer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    template_id INTEGER NOT NULL,
    responder_id INTEGER NOT NULL,
    raw JSON NOT NULL
);

CREATE UNIQUE INDEX answer_template_id_responder_id_idx ON answer (template_id, responder_id);