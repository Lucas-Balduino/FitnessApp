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

## Deltas dos Mockups vs Plano (Notas para Implementação)

Os mockups possuem pequenas divergências visuais/lógicas do plano original. Durante a codificação, siga estas ressalvas:

- **LoginScreen (`01-login.png`):** O fluxo real terá dois modos (Entrar e Registrar). No mockup base de Login (`01-login.png`), o botão CTA principal (azul) está com texto "REGISTRAR". Na implementação da Fase 4, **corrija o texto do CTA para "ENTRAR"**, pois é a tela de login.
- **PerfilScreen (`02-perfil.png`):** O menu "Hamburger" (☰) no canto superior esquerdo aparece preto no mockup. **Siga a cor `#005CEE`** especificada no `DESIGN.md`.
- **BibliotecaScreen (`04-biblioteca-lista.png`):** Os chips de categorias parecem não caber totalmente na tela. Garanta que a fileira de categorias use um `ScrollView` horizontal para evitar quebra de layout.

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

- [x] `01-login.png`
- [x] `01-login-registro.png` (opcional)
- [x] `02-perfil.png`
- [x] `03-drawer.png`
- [x] `04-biblioteca-lista.png`
- [x] `05-biblioteca-loading.png`
- [x] `06-detalhe-exercicio.png`
