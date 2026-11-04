CREATE TABLE IF NOT EXISTS usuario(
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE KEY NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(100),
    perfil_id INT NOT NULL,
    motorista_chapa VARCHAR(20) NOT NULL,

    FOREIGN KEY (perfil_id) REFERENCES perfil(perfil_id),
    FOREIGN KEY (motorista_chapa) REFERENCES motorista(chapa)
    
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;