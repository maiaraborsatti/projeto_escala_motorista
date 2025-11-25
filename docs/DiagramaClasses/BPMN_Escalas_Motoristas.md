classDiagram
    direction LR

    %% Entidades principais
    class Motorista {
        +String chapa
        +String nome
        +String foto
        +String cnhNumero
        +String cnhClasse
        +Date cnhValidade
        +bool dirigeManual
        +bool dirigeAutomatico
        +listarDisponibilidade():bool
        +registrarFerias(dataInicio, dataFim)
    }

    class Veiculo {
        +String placa
        +String vin
        +String marca
        +String modelo
        +String tipoRota
        +String projetoId
        +bool disponivel
    }

    class Rota {
        +String nome
        +String tipo
        +float distanciaKm
        +bool ativa
    }

    class Projeto {
        +String id
        +String nome
        +bool ativo
    }

    class Usuario {
        +String id
        +String nome
        +String email
        +String senhaHash
        +Perfil perfil
        +login(email,senha)
        +logout()
    }

    class Escala {
        +String id
        +Date data
        +String turno
        +Motorista motorista
        +Veiculo veiculo
        +Rota rota
        +criarManual()
        +gerarAutomatica()
    }

    class FeriasAusencia {
        +Date dataInicio
        +Date dataFim
        +registerAusencia()
    }

    class Log {
        +DateTime timestamp
        +String acao
        +String usuarioId
        +String detalhes
    }

    %% Enum para perfil de usuário
    class Perfil {
        <<Enumeration>>
        Motorista
        Lider
        Administrador
    }

    %% Relacionamentos
    Motorista "1" o-- "*" FeriasAusencia : "possui"
    Motorista "1" -- "*" Escala : "designado"
    Veiculo "1" -- "*" Escala : "alocado"
    Rota "1" -- "*" Escala : "usada"
    Projeto "1" o-- "*" Veiculo : "vincula"
    Usuario "1" -- "*" Log: "gera"
    Usuario <|-- Motorista
    Usuario <|-- Lider
    Usuario <|-- Administrador