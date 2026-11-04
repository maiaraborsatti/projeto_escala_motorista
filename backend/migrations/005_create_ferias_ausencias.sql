CREATE TABLE IF NOT EXISTS ferias_ausencias(
    ausencia_id INT PRIMARY KEY AUTO_INCREMENT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    tipo ENUM('Ferias', 'Ausencia Programada') NOT NULL,
    motorista_chapa VARCHAR(20) NOT NULL,

    FOREIGN KEY (motorista_chapa) REFERENCES motorista(chapa)
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;