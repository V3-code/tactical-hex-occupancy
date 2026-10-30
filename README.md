# Tactical Hex Occupancy

Módulo autônomo para Foundry VTT originalmente criado para grades hexagonais e agora também compatível com grades quadradas. Ele identifica quando dois ou mais tokens visíveis ocupam o mesmo espaço e exibe um marcador interativo para acessar rapidamente seus ocupantes.

## Origem e relação com o GUM

Este módulo nasceu como uma funcionalidade inerente ao GURPS GUM, um sistema pessoal e não oficial de GURPS para Foundry VTT. A implementação foi extraída do GUM e transformada em um módulo independente para que a ocupação tática de espaços da grade possa ser utilizada também por outros sistemas.

O GURPS GUM continua sendo o projeto de origem desta funcionalidade.

## Funcionalidades

- Detecta dois ou mais tokens no mesmo espaço de uma grade hexagonal ou quadrada, mesmo quando estão em elevações diferentes.
- Respeita visibilidade, tokens ocultos e permissões do usuário.
- Reconhece tokens que ocupam múltiplos espaços usando a API nativa do Foundry.
- Exibe quantidade, cores de disposição, nome, imagem, elevação e estados dos ocupantes.
- Permite controlar, definir como alvo, abrir a ficha do ator ou configurar o token.
- Mantém o painel de ocupantes arrastável, minimizável e atualizado durante o movimento.
- Funciona de forma independente do sistema de jogo.

## Demonstração

![Painel de ocupantes em uma grade quadrada](https://raw.githubusercontent.com/V3-code/tactical-hex-occupancy/main/docs/media/square-grid-occupant-panel.png)

![Marcadores de ocupação compartilhada em uma grade quadrada](https://raw.githubusercontent.com/V3-code/tactical-hex-occupancy/main/docs/media/square-grid-occupancy.png)

- [Vídeo: ocupação envolvendo um token grande em grade hexagonal](https://github.com/V3-code/tactical-hex-occupancy/blob/main/docs/media/hex-large-token-occupancy.mp4)
- [Vídeo: marcador e painel interativo de ocupantes](https://github.com/V3-code/tactical-hex-occupancy/blob/main/docs/media/hex-occupant-panel.mp4)

## Compatibilidade com o GUM

O GUM possui sua própria implementação nativa desta funcionalidade. Se o módulo for instalado em um mundo com sistema nativo GUM, então o módulo permanecerá inativo para evitar duplicação.

## Compatibilidade com o Foundry VTT

Requer Foundry VTT 13 ou mais recente e foi verificado no Foundry VTT 14. O suporte a tokens que ocupam múltiplos espaços utiliza a API nativa disponível a partir do Foundry VTT 13.

## Instalação

Use este manifesto no instalador de módulos do Foundry VTT:

```text
https://raw.githubusercontent.com/V3-code/tactical-hex-occupancy/main/module.json
```

O módulo pode ser habilitado em **Configurações do módulo → Tactical Hex Occupancy**. Ele atua em cenas com grade hexagonal ou quadrada. Cenas sem grade permanecem fora do escopo desta versão.

## English

Tactical Hex Occupancy is a standalone Foundry VTT module originally designed for hex grids and extracted from the native tactical occupancy feature built into GURPS GUM, a personal and unofficial GURPS system for Foundry VTT. It now also supports square grids and displays an interactive marker when multiple visible tokens share a grid space, including multi-space tokens. Tokens at different elevations remain grouped, and each token's elevation is shown in the occupant panel. Gridless scenes are not supported in this version.

GURPS GUM remains the original project and primary home of this feature. When installed in a world that uses GURPS GUM, the standalone module remains inactive to prevent duplication.

## Licença

Distribuído sob a licença [CC BY-NC-ND 4.0](LICENSE.md), seguindo o projeto GURPS GUM de origem.

GURPS é marca registrada da Steve Jackson Games. Este projeto é uma ferramenta não oficial, gratuita, sem fins lucrativos e não é afiliado, endossado ou licenciado pela Steve Jackson Games.
