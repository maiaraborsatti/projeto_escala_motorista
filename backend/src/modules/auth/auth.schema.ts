import { z } from 'zod';

// Valida os dados recebidos na requisição de login.
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Informe um e-mail válido')
        .toLowerCase(),

    senha: z
        .string()
        .min(1, 'A senha é obrigatória'),
});

// Tipo inferido a partir do schema.
export type LoginInput = z.infer<typeof loginSchema>;