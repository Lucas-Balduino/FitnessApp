# Designs Stitch — KINETIC

Mockups exportados do **Stitch** para referência visual na implementação das telas.

## Como exportar do Stitch

1. Abra cada tela gerada no Stitch
2. Exporte como **PNG**, portrait mobile, **sem moldura de dispositivo**
3. Resolução recomendada: 390×844 ou 2× (780×1688)
4. Salve nesta pasta com o **nome exato** da tabela abaixo

## Mapeamento design → código

| Arquivo (colocar aqui) | Tela React Native | Fase | Prompt Stitch |
|---|---|---|---|
| `01-login.png` | `src/screens/LoginScreen.js` | 4 | Prompt #1 (modo Entrar) |
| `01-login-registro.png` | `src/screens/LoginScreen.js` (estado registro) | 4 | Prompt #1 (modo Criar conta) — opcional |
| `02-perfil.png` | `src/screens/PerfilScreen.js` | 4 | Prompt #2 |
| `03-drawer.png` | `src/components/CustomDrawerContent.js` | 1 | Prompt #3 |
| `04-biblioteca-lista.png` | `src/screens/BibliotecaScreen.js` | 6 | Prompt #4 |
| `05-biblioteca-loading.png` | estado `carregando` em `BibliotecaScreen.js` | 6 | Prompt #5 |
| `06-detalhe-exercicio.png` | `src/screens/DetalheExercicioScreen.js` | 6 | Prompt #6 |

## Telas que NÃO precisam de mockup Stitch

| Tela | Referência |
|---|---|
| Dashboard | `App.js` (já existe) |
| DetalhesTreino | `src/screens/TreinoMusculacao.js` + `DESIGN.md` |
| CriarTreino | `src/screens/CriarTreino.js` (já existe) |

## Como usar na implementação (Cursor / IA)

Ao pedir codificação de uma tela, referencie:

```
Implemente [tela] seguindo @designs/stitch/02-perfil.png,
@DESIGN.md e @PlanejamentoMudancas.md (Fase X)
```

Documentos complementares:

- `DESIGN.md` — design system (cores, tipografia, componentes)
- `PlanejamentoMudancas.md` — ordem de implementação por fases
- `CLAUDE.md` — contexto geral para assistentes de IA

## Checklist de arquivos

Marque quando exportar e salvar cada PNG:

- [ ] `01-login.png`
- [ ] `01-login-registro.png` (opcional)
- [ ] `02-perfil.png`
- [ ] `03-drawer.png`
- [ ] `04-biblioteca-lista.png`
- [ ] `05-biblioteca-loading.png`
- [ ] `06-detalhe-exercicio.png`
