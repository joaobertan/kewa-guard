# 🛡️ Kewa Guard

> **Distributed Rate Limiter for NestJS using Redis & Sliding Window Algorithm.**

[![NPM Version](https://img.shields.io/npm/v/@kewacode/guard.svg)](https://www.npmjs.com/package/@kewacode/guard)
[![License](https://img.shields.io/npm/l/@kewacode/guard.svg)](LICENSE)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)

**Kewa Guard** é uma biblioteca leve e performática para proteção de rotas em aplicações **NestJS**. Diferente de limitadores simples em memória, ele utiliza **Redis** com scripts **Lua** atômicos para garantir precisão absoluta em ambientes distribuídos (cluster/microservices).

## 🚀 Features

- 🕷 **Distributed:** Funciona perfeitamente com múltiplas instâncias da API.
- ⚡ **Atomic:** Usa Lua Scripts para evitar _Race Conditions_.
- 🪟 **Sliding Window Log:** Algoritmo preciso (não reseta todos os limites no minuto cheio).
- 🔌 **Plug & Play:** Configuração simples via Módulo Dinâmico.
- 🛑 **Smart Headers:** Retorna headers padrão (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

---

## 📦 Instalação

```bash
npm install @kewacode/guard ioredis
# ou
pnpm add @kewacode/guard ioredis
# ou
yarn add @kewacode/guard ioredis
```
