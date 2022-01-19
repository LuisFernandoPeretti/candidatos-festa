CREATE DATABASE cadastro_candidatos;

CREATE TABLE candidatos(
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    CPF BIGINT NOT NULL,
    data_criacao TIMESTAMPTZ DEFAULT NOW(),
    data_atualizacao TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_changetimestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.data_atualizacao = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_register_changetimestamp BEFORE UPDATE
    ON candidatos FOR EACH ROW EXECUTE PROCEDURE 
    update_changetimestamp_column();