@startuml
' PlantUML Use Case Diagram - Sistema de Gerenciamento de Escala de Motoristas
' Autor: ChatGPT (gerado)


left to right direction
skinparam packageStyle rect
skinparam handwritten false


actor Motorista
actor Lider as "Líder"
actor Administrador as "Administrador do Sistema"


package "Cadastros" {
usecase UC_CadastroMotoristas as "Cadastro de Motoristas\n(CNH, Foto, Disponibilidade)"
usecase UC_CadastroVeiculos as "Cadastro de Veículos\n(Placa, VIN, Projeto)"
usecase UC_CadastroRotas as "Cadastro de Rotas\n(Tipo, Distância, Status)"
}


package "Operações" {
usecase UC_GeracaoEscalas as "Geração de Escalas\n(Manual / Automática)"
usecase UC_RelatoriosLogs as "Relatórios e Logs\n(PDF / XLSX, Auditoria)"
}


package "Segurança & Acesso" {
usecase UC_ControleAcesso as "Controle de Acesso\n(Login, Perfis, Permissões)"
}


package "Interface" {
usecase UC_InterfaceResponsiva as "Interface Responsiva\n(Desktop / Mobile)"
usecase UC_ConsultaEscala as "Consulta de Escala"
}


' Relações
Motorista --> UC_ConsultaEscala
Lider --> UC_CadastroMotoristas
Lider --> UC_CadastroVeiculos
Lider --> UC_CadastroRotas
Lider --> UC_GeracaoEscalas
Lider --> UC_RelatoriosLogs
Lider --> UC_InterfaceResponsiva


Administrador --> UC_ControleAcesso
Administrador --> UC_RelatoriosLogs
Administrador --> UC_GeracaoEscalas
Administrador --> UC_CadastroMotoristas
Administrador --> UC_CadastroVeiculos
Administrador --> UC_CadastroRotas
Administrador --> UC_InterfaceResponsiva


' Regras e restrições (notas)
note right of UC_CadastroMotoristas
Prioridade: MUST HAVE
Validações: Campos obrigatórios, alerta CNH (<30 dias)
end note


note right of UC_GeracaoEscalas
Prioridade: SHOULD HAVE
Regras: evitar alocar mesmo motorista/rota em dias consecutivos;
respeitar férias, ausências e CNH válida
end note


note left of UC_RelatoriosLogs
Export: PDF e XLSX
Logs: login, cadastro, edição, exclusão (com usuário e timestamp)
end note


' Agrupamentos opcionais para visual
UC_CadastroMotoristas .. UC_ControleAcesso : "Requer autenticação"
UC_GeracaoEscalas .. UC_CadastroRotas : "Depende de rotas ativas"
UC_GeracaoEscalas .. UC_CadastroVeiculos : "Depende de veículos disponíveis"
UC_GeracaoEscalas .. UC_CadastroMotoristas : "Depende de motoristas disponíveis"


' Legend
legend right
|= Símbolos =| Descrição |
|Actor|Usuário ou sistema externo|
|Use Case|Funcionalidade oferecida pelo sistema|
endlegend


@enduml