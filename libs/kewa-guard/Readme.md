# 🛡️ Kewa Guard

> **Distributed Rate Limiter for NestJS using Redis & Sliding Window Algorithm.**

[![NPM Version](https://img.shields.io/npm/v/@kewa/guard.svg)](https://www.npmjs.com/package/@kewa/guard)
[![License](https://img.shields.io/npm/l/@kewa/guard.svg)](LICENSE)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)

**Kewa Guard** é uma biblioteca leve e performática para proteção de rotas em aplicações **NestJS**. Diferente de limitadores simples em memória, ele utiliza **Redis** com scripts **Lua** atômicos para garantir precisão absoluta em ambientes distribuídos (cluster/microservices).

## 🚀 Features

- 🕷 **Distributed:** Funciona perfeitamente com múltiplas instâncias da API.
- ⚡ **Atomic:** Usa Lua Scripts para evitar _Race Conditions_.
- ⛶ **Sliding Window Log:** Algoritmo preciso (não reseta todos os limites no minuto cheio).
- 🔌 **Plug & Play:** Configuração simples via Módulo Dinâmico.
- 🛑 **Smart Headers:** Retorna headers padrão (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).

---

## 📦 Instalação

```bash
npm install @kewa/guard ioredis
# ou
pnpm add @kewa/guard ioredis
# ou
yarn add @kewa/guard ioredis
```

## ⚙️ Configuração

No seu `AppModule` (ou no módulo onde deseja usar o Rate Limiter), importe o `KewaGuardModule`.

```typescript
import { Module } from '@nestjs/common';
import { KewaGuardModule } from '@kewa/guard';

@Module({
  imports: [
    // Configure a conexão com o Redis aqui
    KewaGuardModule.register({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      // password: '...', // Opcional
    }),
  ],
})
export class AppModule {}
```

## 🛡️ Como Usar

Para proteger uma rota, utilize o guard `KewaRateLimitGuard` e o decorator `@KewaRateLimit`.

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { KewaRateLimit, KewaRateLimitGuard } from '@kewa/guard';

@Controller('cats')
export class CatsController {

  @Get()
  @UseGuards(KewaRateLimitGuard) // 1. Ativa a proteção
  @KewaRateLimit({ limit: 10, ttl: 60 }) // 2. Regra: Max 10 requests em 60 segundos
  findAll() {
    return 'This action returns all cats';
  }
}
```

## 📡 Headers de Resposta

O Kewa Guard injeta headers automáticos para informar o cliente sobre o consumo da API:

| Header | Descrição |
| :--- | :--- |
| `X-RateLimit-Limit` | O limite total permitido na janela atual. |
| `X-RateLimit-Remaining` | Quantas requisições ainda restam. |
| `X-RateLimit-Reset` | Timestamp (Unix) de quando o limite será resetado. |

