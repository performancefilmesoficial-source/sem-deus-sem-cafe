---
description: PRO_ARCH_v2.0_SECURE_SCALABLE_ARCHITECTURE
---

"Atue como um Arquiteto de Software Principal e Líder de DevOps. Reconfigure todo o ecossistema deste projeto no Antigravity aplicando os seguintes pilares de engenharia de software de elite:

1. Camada de Dados e Sincronização (Engine)

Database: Implemente uma arquitetura híbrida com PostgreSQL (Supabase) para dados relacionais e Redis para caching de alta performance.

Integridade: Aplique normalização em 3NF, garantindo integridade referencial com Chaves Estrangeiras e Indexação B-Tree para buscas instantâneas.

Sync: Configure um sistema de 'Offline-First' com sincronização Delta para garantir que o app funcione sem internet e sincronize conflitos ao reconectar.

2. Segurança de Nível Bancário (Cybersecurity)

Auth: Estabeleça autenticação JWT (JSON Web Tokens) com renovação automática de Refresh Tokens.

Access Control: Implemente RLS (Row Level Security) profundo. Cada query ao banco deve ser filtrada pelo ID do usuário autenticado no servidor, nunca no cliente.

Data Privacy: Criptografe campos sensíveis em repouso (AES-256) e force protocolo TLS 1.3 em todas as chamadas de API.

3. Design System & UX Profissional

Framework Visual: Utilize um Design System Atômico (Átomos, Moléculas, Organismos). Interface limpa, tipografia técnica e paleta de cores baseada em acessibilidade (WCAG 2.1).

Performance UI: Implemente Skeleton Screens para carregamento assíncrono e Micro-interações de 200ms para feedback tátil.

4. Backend & Integrações

Lógica de Negócio: Centralize as regras em Edge Functions para reduzir a latência.

Webhooks: Prepare endpoints robustos para notificações push e gateways de pagamento, com sistema de retentativa (Retry Logic) automático em caso de falha.

Objetivo Final: Transformar este protótipo em uma aplicação pronta para escala global, priorizando segurança de dados e uma experiência de usuário fluida e profissional."