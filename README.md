# >_FTE, draft

Ferramenta de teste para estimar a equipe de agência necessária para atender um cliente, utilizando a API do Google Gemini.

## Configuração Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Passos

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da API do Google Gemini:
    ```
    API_KEY=SUA_API_KEY_AQUI
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra o endereço local indicado no seu terminal (geralmente `http://localhost:5173`) para ver a aplicação.

## Deploy na Vercel

1.  **Envie seu código para o GitHub:**
    Crie um repositório no GitHub e envie seu projeto para ele.

2.  **Crie um novo projeto na Vercel:**
    - Faça login na sua conta Vercel.
    - Clique em "Add New..." -> "Project".
    - Importe o repositório do GitHub que você criou.

3.  **Configure o projeto:**
    - A Vercel deve detectar automaticamente que é um projeto Vite. As configurações de build estarão corretas.
    - **Framework Preset:** Vite
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`

4.  **Adicione a Variável de Ambiente (Passo Crítico):**
    - Vá para a aba "Settings" -> "Environment Variables".
    - Adicione uma nova variável:
      - **Name:** `API_KEY`
      - **Value:** `SUA_API_KEY_AQUI` (cole sua chave da API do Google Gemini)
    - Clique em "Save".

5.  **Faça o Deploy:**
    - Vá para a aba "Deployments" e acione um novo deploy.
    - Aguarde a conclusão do build. Sua aplicação estará online!
