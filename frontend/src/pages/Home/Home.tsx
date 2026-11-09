import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { api, ApiError } from '../../services/api';

interface HealthResponse {
  status: string;
  message: string;
}

function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await api.get<HealthResponse>('/health');
        setHealth(response);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro inesperado.');
        }
      } finally {
        setLoading(false);
      }
    }

    void checkApi();
  }, []);

  return (
    <main>
      <h1>Rota 360</h1>
      <h2>Bem-vindo!</h2>
      <p>Página inicial do sistema.</p>

      <section>
        <h3>Comunicação com a API</h3>

        {loading && <p>Verificando comunicação...</p>}

        {health && (
          <p>
            Status: {health.status} — {health.message}
          </p>
        )}

        {error && <p>Erro: {error}</p>}
      </section>

      <Link to="/login">Ir para Login</Link>
    </main>
  );
}

export default Home;