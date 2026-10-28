# Tactical Hex Occupancy

Módulo autônomo para Foundry VTT que identifica quando dois ou mais tokens visíveis ocupam o mesmo hex e exibe um marcador interativo para acessar rapidamente seus ocupantes.

## Origem e relação com o GUM

Este módulo nasceu como uma funcionalidade inerente ao [GURPS GUM](https://github.com/V3-code/GURPS-GUM), um sistema não oficial de GURPS para Foundry VTT. A implementação foi extraída do GUM e transformada em um módulo independente para que a ocupação tática de hexes possa ser utilizada também por outros sistemas.

O GURPS GUM continua sendo o projeto de origem e a referência principal desta funcionalidade. Se você chegou até aqui procurando uma experiência completa de GURPS no Foundry, conheça o [GURPS GUM](https://github.com/V3-code/GURPS-GUM).

## Funcionalidades

- Detecta dois ou mais tokens no mesmo hex e na mesma elevação.
- Respeita visibilidade, tokens ocultos e permissões do usuário.
- Reconhece tokens que ocupam múltiplos hexes usando a API nativa do Foundry.
- Exibe quantidade, cores de disposição, nome, imagem e estados dos ocupantes.
- Permite controlar, definir como alvo, abrir a ficha do ator ou configurar o token.
- Mantém o painel de ocupantes arrastável, minimizável e atualizado durante o movimento.
- Funciona de forma independente do sistema de jogo.

## Compatibilidade com o GUM

O GUM possui sua própria implementação nativa desta funcionalidade. Quando o módulo detecta que a opção nativa do GUM também está ativa, ele permanece inativo para evitar marcadores duplicados e mostra um aviso amigável. Para usar este módulo com o GUM, desative **Ocupação Tática de Hexes do GURPS** nas configurações do sistema e mantenha **Tactical Hex Occupancy** ativo.

## Instalação

Use este manifesto no instalador de módulos do Foundry VTT:

```text
https://raw.githubusercontent.com/V3-code/tactical-hex-occupancy/main/module.json
```

O módulo pode ser habilitado em **Configurações do módulo → Tactical Hex Occupancy**. Ele atua apenas em cenas com grade hexagonal.

## English

Tactical Hex Occupancy is a standalone Foundry VTT module extracted from the native tactical hex occupancy feature built into [GURPS GUM](https://github.com/V3-code/GURPS-GUM). It displays an interactive marker when multiple visible tokens share a hex, including multi-hex tokens and separate elevations.

GURPS GUM remains the original project and primary home of this feature. When both the GUM-native option and this module are enabled, the standalone module stays inactive and displays a friendly notice to prevent duplicate markers.

## Licença

Distribuído sob a licença [CC BY-NC-ND 4.0](LICENSE.md), seguindo o projeto GURPS GUM de origem.

GURPS é marca registrada da Steve Jackson Games. Este projeto é uma ferramenta não oficial, gratuita, sem fins lucrativos e não é afiliado, endossado ou licenciado pela Steve Jackson Games.
