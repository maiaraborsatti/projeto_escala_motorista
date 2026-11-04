CREATE TABLE IF NOT EXISTS rota (
    rota_id INT PRIMARY KEY  AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE KEY NOT NULL,
    tipo ENUM('City', 'Dritell', 'Highway') NOT NULL,
    distancia_km DECIMAL(10, 2) CHECK (distancia_km > 0) NOT NULL, 
    status ENUM('Ativo', 'Inativo') NOT NULL
) ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;