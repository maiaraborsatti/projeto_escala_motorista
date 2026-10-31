CREATE TABLE IF NOT EXISTS veiculo(
    placa VARCHAR(10) PRIMARY KEY,
    vin VARCHAR(17) UNIQUE KEY NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    tipo_rota_exigido ENUM('City', 'Dritell', 'Highway') NOT NULL,
    projeto_id INT NOT NULL,

    FOREIGN KEY (projeto_id) REFERENCES projeto(projeto_id)
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;