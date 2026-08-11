# Acompanhamento periódico de SEO

Este documento registra o desempenho orgânico de `https://www.dramayramartins.com.br/` no Google Search Console e preserva o contexto das decisões futuras de SEO. Ele não contém estimativas nem dados inventados: todos os valores devem ser copiados do Search Console e identificados pelo período, filtros e data da coleta.

## Fonte e configuração da análise

- Fonte principal: relatório **Desempenho nos resultados da pesquisa** do Google Search Console.
- Propriedade analisada: registrar se foi usada a propriedade de domínio ou de prefixo de URL.
- Tipo de pesquisa: normalmente `Web`; registrar quando outro tipo for utilizado.
- Comparação recomendada: período atual contra o período imediatamente anterior de mesma duração e, quando houver histórico suficiente, contra o mesmo período do ano anterior.
- Antes de comparar, confirmar que tipo de pesquisa, filtros, país, dispositivo e aparência na pesquisa são iguais nos dois períodos.
- Anotar deploys, indisponibilidades, mudanças sazonais e alterações de conteúdo que possam explicar oscilações.

## Métricas que devem ser acompanhadas

### Cliques

Quantidade de acessos ao site originados nos resultados orgânicos do Google. Avaliar o total, a variação absoluta e percentual, além das consultas e páginas responsáveis pelo ganho ou pela queda.

### Impressões

Quantidade de vezes em que uma URL do site apareceu nos resultados. Crescimento de impressões pode indicar maior cobertura ou visibilidade, mas deve ser analisado junto com posição e CTR.

### CTR

Relação entre cliques e impressões. Comparar consultas e páginas em posições semelhantes antes de atribuir mudanças de CTR a title ou description. Recursos da SERP, intenção de busca, dispositivo e marca também influenciam o resultado.

### Posição média

Média da melhor posição observada para o site em cada impressão. Não interpretar isoladamente: mudanças no conjunto de consultas ou páginas podem alterar a média sem representar ganho ou perda uniforme.

### Consultas

Registrar as principais consultas por cliques e impressões, além das que tiveram maiores ganhos ou perdas. Separar, quando útil:

- termos de marca e nome profissional;
- especialidade e serviços;
- buscas locais com cidade ou região;
- dúvidas e condições pesquisadas pelas famílias.

Não criar conteúdo médico somente com base em volume: qualquer expansão clínica deve ser útil, original e revisada profissionalmente.

## Metodologia para análise de consultas

Esta metodologia deve ser aplicada somente às consultas realmente exportadas do Google Search Console. Não completar lacunas com estimativas, sugestões de ferramentas ou palavras-chave que não apareçam nos dados.

### Escopo prioritário

Nas consultas exportadas, identificar resultados relacionados aos seguintes temas:

- nome profissional da Dra. Mayra Martins;
- neuropediatra;
- neuropediatria;
- contexto local;
- condições efetivamente abordadas no site.

Os temas servem para organizar os dados existentes, não para criar previamente uma lista de palavras-chave. Quando uma consulta não se enquadrar com segurança, classificá-la como `Não determinada` e preservar o texto original para revisão.

### Dimensões de classificação

As classificações não são todas mutuamente exclusivas. Uma mesma consulta pode ser, por exemplo, `Branded`, `Local` e ter intenção de `Consulta/agendamento`. Para evitar dupla contagem, usar uma categoria principal de tema e manter as demais como colunas independentes.

#### Branded

Consulta que identifica claramente a Dra. Mayra Martins, sua marca profissional ou uma variação inequívoca encontrada no próprio arquivo exportado. Não presumir que uma consulta ambígua ou apenas relacionada à especialidade seja branded.

Registrar como:

- `Sim`: referência inequívoca à profissional ou marca;
- `Não`: nenhuma referência à profissional ou marca;
- `Não determinada`: texto insuficiente ou ambíguo.

#### Não branded

Consulta relacionada à especialidade, atuação, localidade ou conteúdo do site, mas sem referência inequívoca à Dra. Mayra Martins ou à marca profissional. Deve ser o complemento da classificação branded: uma linha não pode ser simultaneamente `Branded = Sim` e `Não branded = Sim`.

#### Local

Consulta com indicação geográfica explícita ou intenção local inequívoca observável no texto exportado. Usar somente localidades realmente presentes na consulta. Não inferir cidade pelo dispositivo, país, DDD ou página de destino.

Registrar separadamente:

- `Local = Sim/Não/Não determinada`;
- localidade exatamente como apareceu na consulta;
- forma normalizada da localidade, apenas quando a equivalência for segura.

#### Informacional

Consulta cuja formulação indica busca por explicação, compreensão, sinais, acompanhamento ou informação sobre um tema. Não concluir que toda consulta sobre uma condição é informacional: avaliar a formulação completa e marcar como `Não determinada` quando a intenção não estiver clara.

#### Intenção de consulta/agendamento

Consulta cuja formulação demonstra procura por atendimento, contato, disponibilidade, consulta ou agendamento. A intenção deve estar explícita no texto; não classificar automaticamente toda busca por nome, especialidade ou cidade como agendamento.

Quando necessário, usar uma destas classificações de intenção:

- `Informacional`;
- `Consulta/agendamento`;
- `Navegacional` — procura pelo site ou perfil específico da profissional;
- `Não determinada`.

### Categoria principal de tema

Para consolidação sem dupla contagem, atribuir uma única categoria principal a cada consulta:

1. `Nome profissional`;
2. `Neuropediatra`;
3. `Neuropediatria`;
4. `Busca local`;
5. `Condição abordada no site`;
6. `Outro tema relevante`;
7. `Não determinada`.

Quando uma consulta se enquadrar em mais de um tema, escolher como principal o elemento mais específico para a intenção observada e registrar os demais em `Temas secundários`. Documentar qualquer regra adicional adotada no período e mantê-la nas comparações futuras.

### Processo de análise

1. Exportar as consultas do Search Console com período, tipo de pesquisa e filtros registrados.
2. Preservar uma cópia do arquivo original sem alterações.
3. Importar as linhas para a tabela de classificação sem modificar o texto da consulta.
4. Classificar marca, localidade, intenção e tema principal separadamente.
5. Marcar casos ambíguos como `Não determinada`, sem forçar uma categoria.
6. Consolidar cliques e impressões por categoria.
7. Calcular o CTR consolidado como `cliques totais ÷ impressões totais`, e não como média simples dos CTRs das linhas.
8. Interpretar posição média com cautela e manter a metodologia de ponderação da fonte exportada; não tirar média simples sem registrar a limitação.
9. Comparar períodos equivalentes usando as mesmas regras de classificação.
10. Registrar consultas novas, consultas que deixaram de aparecer e mudanças relevantes de página associada.

### Tabela para dados reais exportados

| Consulta original | Cliques | Impressões | CTR | Posição média | Página principal associada | Branded | Não branded | Local | Localidade observada | Intenção | Tema principal | Temas secundários | Observações |
|---|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — | — | — | — | — |

### Consolidação por categoria

| Dimensão | Categoria | Número de consultas visíveis | Cliques | Impressões | CTR consolidado | Posição média da fonte | Período comparado | Variação | Observações |
|---|---|---:|---:|---:|---:|---:|---|---|---|
| Marca | Branded | — | — | — | — | — | — | — | — |
| Marca | Não branded | — | — | — | — | — | — | — | — |
| Contexto | Local | — | — | — | — | — | — | — | — |
| Intenção | Informacional | — | — | — | — | — | — | — | — |
| Intenção | Consulta/agendamento | — | — | — | — | — | — | — | — |

### Acompanhamento dos temas prioritários

| Tema principal | Consultas do período | Cliques | Impressões | CTR consolidado | Posição média da fonte | Página mais associada | Variação versus período anterior | Decisão ou investigação |
|---|---:|---:|---:|---:|---:|---|---|---|
| Nome profissional | — | — | — | — | — | — | — | — |
| Neuropediatra | — | — | — | — | — | — | — | — |
| Neuropediatria | — | — | — | — | — | — | — | — |
| Busca local | — | — | — | — | — | — | — | — |
| Condição abordada no site | — | — | — | — | — | — | — | — |

## Metodologia para acompanhamento de CTR orgânico

O CTR deve ser analisado com dados reais do Google Search Console e dentro do contexto de cada consulta. Não existe um benchmark universal que determine sozinho se o CTR é bom ou ruim: posição, intenção, dispositivo, presença de recursos na página de resultados, reconhecimento da marca e período podem alterar o comportamento esperado.

### Registro por consulta e período

Manter o texto original da consulta e registrar os filtros usados na exportação. Comparações devem usar períodos equivalentes e, sempre que possível, o mesmo dispositivo, país, tipo de pesquisa e página associada.

| Período | Consulta original | Impressões | Cliques | CTR | Posição média | Página associada | Dispositivo/filtros | Período comparado | Observações |
|---|---|---:|---:|---:|---:|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — |

O CTR informado pelo Search Console deve ser preservado. Quando for necessário conferir o cálculo consolidado, usar `cliques totais ÷ impressões totais`; não calcular a média simples dos CTRs de várias consultas.

### Critérios de diagnóstico

Os critérios abaixo são relativos ao histórico do site e a grupos comparáveis. Antes de classificar uma consulta, verificar se o volume observado é suficiente para evitar conclusões baseadas em poucas impressões.

#### 1. Muitas impressões e CTR baixo

Classificar como oportunidade de investigação quando a consulta estiver entre as que mais geram impressões no período e seu CTR estiver abaixo:

- do próprio histórico da consulta em posição semelhante;
- de consultas com intenção e posição comparáveis;
- do desempenho da mesma consulta em outro período equivalente, quando não houver mudança relevante de posição.

Antes de propor alterações, conferir intenção da consulta, página exibida, dispositivo, recursos da SERP, sazonalidade e possível mistura de URLs. Um CTR relativamente baixo pode ser esperado quando a consulta é ampla ou quando a posição média ainda varia muito.

#### 2. CTR bom

Considerar o CTR saudável quando ele estiver estável ou em crescimento em comparação com o histórico da mesma consulta e com consultas de intenção e posição semelhantes. O resultado deve ser acompanhado de volume suficiente e não pode ser atribuído automaticamente a title ou description.

Registrar também quando um CTR bom ocorre com poucas impressões, pois o resultado ainda pode não ser representativo.

#### 3. Posição boa e CTR ruim

Tratar como prioridade de diagnóstico quando a consulta mantém posição favorável em relação ao próprio histórico, recebe impressões relevantes e apresenta CTR inferior ao esperado para consultas comparáveis.

Investigar, nesta ordem:

1. se a página exibida corresponde à intenção da consulta;
2. se há outra URL do site concorrendo pela mesma consulta;
3. como title e description aparecem no resultado real;
4. se recursos da SERP reduzem a necessidade de clique;
5. diferenças por dispositivo e período.

Somente depois dessa análise considerar um teste de title ou description.

#### 4. Posição ruim em crescimento

Registrar como tendência promissora quando a consulta ainda apresenta posição desfavorável, mas mostra evolução consistente entre períodos comparáveis, como aumento de impressões, melhora de posição ou surgimento de cliques.

Nesse cenário, priorizar a avaliação da relevância e qualidade da página, cobertura da intenção, indexação e ligações internas. Não alterar o snippet apenas para elevar CTR enquanto a principal limitação ainda for visibilidade ou posição.

### Matriz de acompanhamento

| Período | Consulta | Impressões relevantes? | Tendência de posição | Tendência de CTR | Classificação | Evidência usada | Investigação necessária | Decisão |
|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — |

Usar, quando sustentada pelos dados, uma destas classificações:

- `Muitas impressões + CTR baixo`;
- `CTR bom`;
- `Posição boa + CTR ruim`;
- `Posição ruim em crescimento`;
- `Sem dados suficientes`;
- `Não determinada`.

### Regras para alterações de title e description

- Não alterar title ou description com base em uma leitura isolada ou benchmark genérico.
- Usar consultas, impressões, cliques, CTR, posição e período reais do Search Console.
- Confirmar que a página e o snippet atendem à intenção predominante da consulta.
- Formular uma hipótese específica antes da mudança e registrar a métrica que será observada.
- Alterar uma variável por vez quando for necessário atribuir resultado ao teste.
- Registrar data da publicação, período de observação e possíveis fatores externos.
- Preservar a precisão clínica e a identidade profissional; CTR não justifica promessa exagerada, informação não confirmada ou keyword stuffing.
- Se os dados não sustentarem uma mudança, registrar a decisão de manter o snippet atual.

## Metodologia para acompanhamento de posição média

A posição média do Google Search Console é uma métrica agregada das posições observadas nas impressões. Ela não representa um ranking absoluto, único ou fixo para todas as pessoas. Deve ser usada para acompanhar tendências em conjuntos comparáveis de dados.

### Dimensões de acompanhamento

Analisar a evolução combinando:

- `Consulta`: manter o texto original exportado;
- `Página`: registrar a URL que recebeu as impressões;
- `Período`: usar intervalos de mesma duração nas comparações;
- `Dispositivo`: separar celular, desktop e tablet quando houver dados suficientes.

Sempre registrar os demais filtros aplicados, como país, tipo de pesquisa e aparência na pesquisa. Uma comparação deixa de ser diretamente equivalente quando os filtros ou o conjunto de consultas e páginas mudam de maneira relevante.

### Limitações da posição média

- A posição pode variar por consulta, dispositivo, localização, momento da pesquisa e composição da página de resultados.
- Recursos da SERP podem alterar a disposição visual dos resultados e a relação entre posição, visibilidade e clique.
- A média pode mudar porque novas consultas começaram a gerar impressões ou porque consultas antigas deixaram de aparecer, mesmo sem mudança uniforme nas consultas já acompanhadas.
- A posição de uma página pode ser diferente quando a mesma consulta exibe mais de uma URL do site.
- Poucas impressões podem produzir oscilações grandes e pouco representativas.
- Uma média geral do site mistura consultas, páginas e intenções diferentes; ela não deve ser interpretada como “a posição do site no Google”.
- O valor deve ser relacionado a impressões, cliques e CTR. Melhora de posição sem impressões relevantes pode não representar impacto material.
- Comparações manuais não devem usar média simples de posições de linhas diferentes sem documentar a limitação e a forma de ponderação.

### Convenção para registrar a variação

Como posições numericamente menores representam posições mais altas, registrar a variação de forma explícita para evitar ambiguidade:

- `Melhora`: a posição média passou para um número menor;
- `Piora`: a posição média passou para um número maior;
- `Estável`: a diferença não é material dentro do contexto observado;
- `Sem comparação`: não há dados equivalentes no período anterior.

Além do rótulo, registrar os dois valores comparados. Não definir uma diferença mínima universal: avaliar volume, estabilidade e duração do período.

### Modelo principal de registro

| Período atual | Período anterior | Consulta | Página | Dispositivo | Impressões | Cliques | CTR | Posição média atual | Posição média anterior | Variação em relação ao período anterior | Tendência | Observações |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|---|---|
| — | — | — | — | — | — | — | — | — | — | — | — | — |

Este modelo contém os campos mínimos solicitados — consulta, impressões, cliques, CTR, posição média e variação — e adiciona página, período e dispositivo para permitir comparações tecnicamente válidas.

### Resumo por página

| Período | Página | Dispositivo/filtros | Consultas acompanhadas | Impressões | Cliques | CTR | Posição média da fonte | Variação | Observações |
|---|---|---|---:|---:|---:|---:|---:|---|---|
| — | — | — | — | — | — | — | — | — | — |

### Resumo por dispositivo

| Período | Dispositivo | Consulta ou grupo analisado | Página | Impressões | Cliques | CTR | Posição média | Variação | Observações |
|---|---|---|---|---:|---:|---:|---:|---|---|
| — | — | — | — | — | — | — | — | — | — |

### Processo de leitura

1. Confirmar que períodos e filtros são comparáveis.
2. Analisar primeiro consulta e página, evitando conclusões baseadas somente na média geral.
3. Verificar se a tendência permanece quando os dispositivos são separados.
4. Relacionar posição com impressões, cliques e CTR.
5. Identificar mudanças no conjunto de consultas ou URLs que possam alterar a média.
6. Registrar `Sem dados suficientes` quando o volume ou a estabilidade não permitirem conclusão.
7. Documentar a hipótese e aguardar um novo período comparável antes de atribuir resultado a uma mudança de SEO.

## Metodologia para identificar os termos que geram tráfego orgânico

Esta metodologia deve ser aplicada quando houver uma exportação real do Google Search Console para a propriedade correspondente a `https://www.dramayramartins.com.br/` ou ao domínio `dramayramartins.com.br`. O relatório deve registrar qual propriedade foi usada para que os períodos continuem comparáveis.

O objetivo é descobrir quais consultas efetivamente geram cliques e visibilidade, como elas evoluem e onde existem oportunidades sustentadas pelos dados. Não adicionar consultas sugeridas por ferramentas externas nem preencher linhas que não existam na exportação.

### Dados de entrada

Para cada exportação, preservar:

- arquivo original sem alterações;
- período atual e período comparado;
- data da exportação;
- propriedade do Search Console;
- tipo de pesquisa;
- filtros de página, país, dispositivo e aparência na pesquisa;
- dimensões exportadas, especialmente consulta e página.

Sempre que possível, exportar períodos consecutivos de mesma duração. Para análises sazonais, registrar também a comparação com o mesmo período do ano anterior, sem substituir a comparação principal.

### Preparação dos dados

1. Manter a consulta original em uma coluna imutável.
2. Criar uma versão normalizada somente para agrupamento, preservando o original.
3. Não unir grafias, nomes ou intenções diferentes sem documentar a regra.
4. Associar consulta e página quando essa dimensão estiver disponível.
5. Aplicar as classificações já definidas neste documento: branded, não branded, local, intenção e tema principal.
6. Manter separação por dispositivo quando houver diferenças relevantes ou quando o relatório for usado para decidir mudanças de snippet.
7. Marcar consultas anonimizadas ou ausentes como limitação; não tentar reconstruí-las.

### Tabela-base para importação e comparação

| Consulta original | Consulta normalizada | Página | Dispositivo | Cliques atuais | Cliques anteriores | Variação de cliques | Impressões atuais | Impressões anteriores | Variação de impressões | CTR atual | CTR anterior | Posição atual | Posição anterior | Branded | Tema principal | Local | Intenção | Observações |
|---|---|---|---|---:|---:|---|---:|---:|---|---:|---:|---:|---:|---|---|---|---|---|
| — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

Quando não existir valor no período anterior, classificar a consulta como `Nova no período` em vez de calcular crescimento percentual infinito ou artificial.

### 1. Consultas com mais cliques

Ordenar os dados reais por cliques do período atual, do maior para o menor. Para cada consulta, analisar:

- participação nos cliques visíveis exportados;
- página associada;
- CTR e posição média;
- classificação de marca, tema, localidade e intenção;
- estabilidade ou variação em relação ao período anterior.

Não concluir que a consulta com mais cliques é automaticamente a melhor oportunidade de alteração. Ela pode já estar atendendo bem à intenção e precisar apenas de monitoramento.

### 2. Consultas com mais impressões

Ordenar por impressões do período atual. Separar consultas que também geram cliques das que possuem visibilidade relevante, mas poucos ou nenhum clique. Antes de considerar uma oportunidade, avaliar posição, intenção, dispositivo e página exibida.

### 3. Consultas em crescimento

Comparar períodos equivalentes e registrar separadamente:

- crescimento absoluto de cliques;
- crescimento absoluto de impressões;
- evolução de CTR;
- evolução da posição média;
- consultas novas no período.

Usar variação percentual somente quando a base anterior for suficiente e diferente de zero. Consultas com volume muito pequeno devem ser marcadas como evidência insuficiente, mesmo quando a variação percentual parecer elevada.

### 4. Termos relacionados à marca

Filtrar `Branded = Sim` conforme a metodologia de consultas deste documento. Avaliar se a marca mantém visibilidade, se a página oficial recebe as impressões e se existem consultas de marca apontando para URLs inesperadas. Não criar previamente variações do nome: classificar apenas as formas realmente exportadas.

### 5. Termos relacionados à especialidade

Usar os temas `Neuropediatra` e `Neuropediatria` já definidos, além de outros termos de especialidade somente quando aparecerem nos dados e forem confirmados como semanticamente adequados. Separar consultas branded das não branded para não confundir procura pela profissional com descoberta pela especialidade.

### 6. Buscas locais

Filtrar `Local = Sim` e preservar a localidade escrita na consulta. Relacionar cliques, impressões, CTR, posição, página e intenção. Não inferir localidade por DDD, país, endereço da página ou dispositivo quando ela não estiver explícita na consulta.

### 7. Boa posição com CTR baixo

Aplicar a metodologia de CTR já documentada. A oportunidade existe somente quando:

- há impressões suficientes para comparação;
- a posição é favorável em relação ao histórico e a consultas comparáveis;
- o CTR está abaixo do comportamento histórico ou do grupo comparável;
- a página exibida e a intenção foram verificadas.

Antes de sugerir title ou description, conferir a SERP real, recursos de resultado, dispositivo, possíveis URLs concorrentes e aderência da página à intenção.

### 8. Oportunidades próximas da primeira página

Não usar posição média como prova de que uma consulta ocupa uma posição fixa ou uma página específica dos resultados. Definir, em cada análise, uma faixa operacional de proximidade e registrar o critério antes de filtrar os dados.

Priorizar para investigação consultas que, em períodos comparáveis:

- apresentem impressões reais e recorrentes;
- demonstrem posição média em evolução ou próxima da faixa definida;
- sejam relevantes para o conteúdo e a atuação confirmada;
- apontem para uma página adequada à intenção;
- não dependam da criação de informação médica não aprovada.

| Período | Critério operacional adotado para “próxima da primeira página” | Motivo | Filtros utilizados | Responsável pela análise |
|---|---|---|---|---|
| — | — | — | — | — |

### Listas de saída

Gerar as listas abaixo a partir da tabela-base, mantendo os números reais e a página associada:

| Lista | Consulta | Página | Cliques | Impressões | CTR | Posição média | Variação principal | Classificação | Próxima ação |
|---|---|---|---:|---:|---:|---:|---|---|---|
| Mais cliques | — | — | — | — | — | — | — | — | — |
| Mais impressões | — | — | — | — | — | — | — | — | — |
| Em crescimento | — | — | — | — | — | — | — | — | — |
| Branded | — | — | — | — | — | — | — | — | — |
| Especialidade | — | — | — | — | — | — | — | — | — |
| Local | — | — | — | — | — | — | — | — | — |
| Boa posição + CTR baixo | — | — | — | — | — | — | — | — | — |
| Próxima da primeira página | — | — | — | — | — | — | — | — | — |

Uma consulta pode aparecer em mais de uma lista. Para totais consolidados sem dupla contagem, usar a categoria principal definida anteriormente.

### Priorização de oportunidades

Não aplicar pontuações ou pesos inventados. Registrar uma prioridade somente depois de avaliar em conjunto:

- volume real e estabilidade das impressões;
- cliques e tendência;
- CTR no contexto da posição;
- relevância para a atuação e para o conteúdo existente;
- adequação da página à intenção;
- esforço e risco da possível alteração;
- necessidade de revisão clínica.

| Consulta | Evidência | Oportunidade identificada | Hipótese | Ação proposta | Revisão clínica necessária? | Prioridade justificada | Período de reavaliação |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

Nenhuma oportunidade deve resultar automaticamente em mudança de conteúdo. Primeiro registrar a evidência, a hipótese, a página afetada e a métrica que será acompanhada após eventual aprovação.

### Controle de qualidade da classificação

- Registrar quem classificou os dados e a data da revisão.
- Revisar manualmente consultas ambíguas ou com maior impacto antes de decidir alterações.
- Manter as mesmas regras entre períodos; se uma regra mudar, documentar e, quando possível, reclassificar o período comparado.
- Não interpretar a soma das consultas exportadas como o total integral de desempenho, pois o Search Console pode omitir consultas anonimizadas.
- Não publicar consultas que possam expor informações pessoais ou sensíveis.

### Páginas

Comparar as URLs por cliques, impressões, CTR e posição. Verificar se a URL canônica esperada recebe as impressões, se houve surgimento de URLs duplicadas e quais páginas perderam ou ganharam visibilidade.

### Dispositivos

Comparar desktop, celular e tablet. Observar diferenças relevantes de CTR, posição e cliques, especialmente em celular, sem concluir que uma diferença de desempenho é necessariamente um problema técnico.

### Países

Verificar se o tráfego permanece coerente com o público esperado. Para análise local, observar principalmente o Brasil, sem inferir cidade a partir deste relatório, pois o Search Console apresenta a dimensão por país.

## Rotina recomendada

1. Fazer uma leitura mensal para acompanhar tendência sem reagir excessivamente a variações diárias.
2. Usar períodos de mesma duração e filtros equivalentes.
3. Registrar os totais e depois investigar consultas, páginas, dispositivos e países.
4. Relacionar mudanças com deploys e ações documentadas no histórico.
5. Priorizar hipóteses apoiadas por mais de uma métrica.
6. Registrar a decisão mesmo quando a conclusão for não alterar o site.
7. Após uma mudança, definir a data a partir da qual o impacto será observado e evitar atribuir causalidade antes de acumular dados suficientes.

## Histórico por período

Copiar o bloco abaixo para cada nova análise. Não substituir registros anteriores.

### Período: AAAA-MM-DD a AAAA-MM-DD

**Contexto da coleta**

- Data da coleta:
- Propriedade do Search Console:
- Tipo de pesquisa:
- Comparação utilizada:
- Filtros aplicados:
- Deploys ou eventos relevantes:

**Resumo de desempenho**

| Métrica | Período atual | Período comparado | Variação absoluta | Variação percentual | Observações |
|---|---:|---:|---:|---:|---|
| Cliques | — | — | — | — | — |
| Impressões | — | — | — | — | — |
| CTR | — | — | — | — | — |
| Posição média | — | — | — | — | — |

**Consultas**

| Consulta | Cliques | Impressões | CTR | Posição média | Tipo/intenção | Variação e observações |
|---|---:|---:|---:|---:|---|---|
| — | — | — | — | — | — | — |

**Páginas**

| URL | Cliques | Impressões | CTR | Posição média | Variação e observações |
|---|---:|---:|---:|---:|---|
| — | — | — | — | — | — |

**Dispositivos**

| Dispositivo | Cliques | Impressões | CTR | Posição média | Variação e observações |
|---|---:|---:|---:|---:|---|
| Celular | — | — | — | — | — |
| Desktop | — | — | — | — | — |
| Tablet | — | — | — | — | — |

**Países**

| País | Cliques | Impressões | CTR | Posição média | Variação e observações |
|---|---:|---:|---:|---:|---|
| — | — | — | — | — | — |

**Conclusões e decisões**

- Principais ganhos:
- Principais quedas:
- Hipóteses sustentadas pelos dados:
- Verificações adicionais necessárias:
- Ação decidida:
- Responsável:
- Data prevista para revisão:
- Resultado esperado e métrica que será observada:

## Registro consolidado de decisões

Esta tabela permite localizar decisões sem reler todos os períodos. Cada decisão deve apontar para o período que a motivou.

| Data | Período analisado | Evidência | Decisão | Alteração realizada | Data de revisão | Resultado observado |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

## Cuidados de interpretação

- Não somar linhas de consultas esperando reproduzir o total geral; o Search Console pode omitir consultas anonimizadas.
- Não comparar períodos com filtros diferentes sem registrar a diferença.
- Não tratar correlação temporal como prova de causalidade.
- Não otimizar apenas para posição média; considerar cliques, impressões, CTR, intenção e qualidade do tráfego em conjunto.
- Não transformar variações pequenas ou de curto prazo em mudanças imediatas de conteúdo.
- Preservar os registros anteriores para manter um histórico auditável das decisões.
