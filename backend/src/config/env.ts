import 'dotenv/config';
import { z } from 'zod';

const esquemaAmbiente = z.object({
    DB_NAME: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_TIMEZONE: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive()
});

const resultadoAmbiente = esquemaAmbiente.safeParse(process.env);

if (!resultadoAmbiente.success) {
    console.error('Variáveis de Ambiente Inválidas.');
    resultadoAmbiente.error.issues.forEach(problema => {
        console.error(`${problema.path.join('.')}: ${problema.message}`)
    });
    process.exit(1);
}

const ambienteValido = resultadoAmbiente.data;

export const ambiente = {
    banco: {
        nome: ambienteValido.DB_NAME,
        usuario: ambienteValido.DB_USER,
        senha: ambienteValido.DB_PASSWORD,
        fusoHorario: ambienteValido.DB_TIMEZONE,
        host: ambienteValido.DB_HOST,
        porta: ambienteValido.DB_PORT,
    }
};