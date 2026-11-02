CREATE TABLE IF NOT EXISTS log_auditoria(
  log_id             INT AUTO_INCREMENT PRIMARY KEY,
  data_hora           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  acao_tipo           VARCHAR(50) NOT NULL,
  descricao_detalhada TEXT,
  usuario_id          INT NULL,

  INDEX (data_hora),
  INDEX (acao_tipo),

  FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
)ENGINE = InnoDB, DEFAULT CHARSET = utf8mb4;