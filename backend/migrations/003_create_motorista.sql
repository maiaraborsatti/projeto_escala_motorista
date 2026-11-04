CREATE TABLE IF NOT EXISTS motorista(
    chapa VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255),
    cnh_numero VARCHAR(20) UNIQUE KEY NOT NULL,
    cnh_classe CHAR(2),
    cnh_validade DATE NOT NULL,
    pode_dirigir ENUM('Manual','Automatico', 'Ambos') NOT NULL,
    status_disponibilidade VARCHAR(15) NOT NULL
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;