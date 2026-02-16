# 🛡️ Kewa Guard (Monorepo)

Ambiente de desenvolvimento da biblioteca **@kewacode/guard** (Rate Limiter Distribuído).

## 📂 Onde estão as coisas?

* **`libs/kewa-guard`**: O código fonte da biblioteca.
* **`src/`**: Aplicação de exemplo para testar a lib.
* **`docker-compose.yml`**: Infraestrutura (Redis + Commander).

---

## 🚀 Como Rodar Localmente

1.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

2.  **Suba o Redis (Docker):**
    ```bash
    docker-compose up -d
    ```

3.  **Inicie o App de Teste:**
    ```bash
    pnpm run start:dev
    ```

A API estará rodando em `http://localhost:3000`.

---

## 📖 Documentação de Uso

Para Utilizar no projeto:
👉 **[Leia a documentação oficial aqui](libs/kewa-guard/Readme.md)**
