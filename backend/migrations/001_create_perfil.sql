CREATE TABLE IF NOT EXISTS perfil(
    perfil_id INT PRIMARY KEY AUTO_INCREMENT,
    perfil ENUM('Motorista', 'Lider', 'Administrador') UNIQUE KEY NOT NULL
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;