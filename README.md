# Estimador de Equipe de Agência

Uma ferramenta para estimar a equipe de agência necessária para atender um cliente com base na carga de trabalho e complexidade, utilizando a API do Google Gemini.

## Configuração Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd agency-team-estimator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione sua chave da API do Google Gemini:
    ```
    VITE_API_KEY=SUA_API_KEY_AQUI
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:5173](http://localhost:5173) (ou a porta indicada no seu terminal) para ver a aplicação.

## Deploy na Vercel

1.  **Envie seu código para o GitHub:**
    Crie um repositório no GitHub e envie seu projeto para ele.

2.  **Crie um novo projeto na Vercel:**
    - Faça login na sua conta Vercel.
    - Clique em "Add New..." -> "Project".
    - Importe o repositório do GitHub que você acabou de criar.

3.  **Configure o projeto:**
    - A Vercel deve detectar automaticamente que é um projeto Vite e preencher as configurações de build corretamente.
    - **Framework Preset:** Vite
    - **Build Command:** `npm run build` ou `vite build`
    - **Output Directory:** `dist`

4.  **Adicione a Variável de Ambiente (Passo Crítico):**
    - Vá para a aba "Settings" -> "Environment Variables".
    - Adicione uma nova variável:
      - **Name:** `VITE_API_KEY`
      - **Value:** `SUA_API_KEY_AQUI` (cole sua chave da API do Google Gemini)
    - Clique em "Save".

5.  **Faça o Deploy:**
    - Volte para a aba "Deployments" e acione um novo deploy (ou ele já terá sido acionado após a configuração inicial).
    - Aguarde a conclusão do build. Sua aplicação estará online!
