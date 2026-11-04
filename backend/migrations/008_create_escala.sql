CREATE TABLE IF NOT EXISTS escala (
  escala_id       INT AUTO_INCREMENT PRIMARY KEY,
  data            DATE NOT NULL,
  turno           ENUM('T1','T2') NOT NULL,
  motorista_chapa VARCHAR(20) NOT NULL,
  veiculo_placa   VARCHAR(10) NOT NULL,
  rota_id         INT NOT NULL,

  UNIQUE (Data, turno, motorista_chapa),
  UNIQUE (Data, turno, veiculo_placa),

  FOREIGN KEY (motorista_chapa) REFERENCES motorista (chapa),
  FOREIGN KEY (veiculo_placa)   REFERENCES veiculo (placa),
  FOREIGN KEY (rota_id)         REFERENCES rota (rota_id)
) ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;