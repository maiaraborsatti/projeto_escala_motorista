import { conexaoMigrations } from "./connection.ts"

export type Conexao = Awaited<ReturnType<typeof conexaoMigrations>>
