# MemoryGame

## Objectivo
Criar o Jogo da Memória usando a lista de "badges" do Codebits num tabuleiro 6x3.

## Indicações
- Inicialmente deve aparecer um botão "Novo Jogo"
- Clicando em "Novo Jogo", é feito um pedido JsonP ao endpoint da API dos "badges" do Codebits
- Devem ser escolhidos 9 "badges" aleatórios para formar os pares e construir o tabuleiro 6x3
- Mostrar um botão "Iniciar Jogo"
- Contador de tempo decorrido após clicar em "Iniciar Jogo" e até terminar o jogo
- Se o par virado não for igual este volta à posição inicial
- Quando terminar o jogo, o jogador deve poder partilhar o tempo do jogo no twitter com a mensagem "Memory JavaScript FTW em: <tempo do jogo>"