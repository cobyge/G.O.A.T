import { Image, Button } from 'semantic-ui-react'

class ManualNetwork extends React.Component {
  componentDidMount() {
    document.title = 'Server Guide'
  }
  render() {
    const { next } = this.props

    return (
      <div style={{ paddingBottom: '20px' }}>
        <center>
          <Image src="static/network.png" size="large" />
        </center>
        <h1>
          <center>[Canais de texto disponíveis]</center>
        </h1>
        <span style={{ color: 'grey' }}>#fallout:</span> Sala de conversação{' '}
        <br />
        <span style={{ color: 'grey' }}>#anúncios:</span> Anuncios feitos pela
        staff em relação ao servidor. <br />
        <span style={{ color: 'grey' }}>#divulgação:</span> Divulgação de
        canais/vídeos de Fallout. Para ter seu vídeo divulgado, fale com Músico.{' '}
        <br />
        <span style={{ color: 'grey' }}>#ajuda:</span> Canal destinado aos novos
        usuários escreverem suas dúvidas quanto ao servidor. <br />
        <span style={{ color: 'grey' }}>#debate-lore:</span> Debate entre dois
        ou mais usuários sobre ideias diversas. <br />
        <span style={{ color: 'grey' }}>#sugestões:</span> Dedicado para os
        demais usuários do servidor sugerirem coisas para melhorá-lo. <br />
        <span style={{ color: 'grey' }}>#a-porta-corrediça:</span> Canal
        destinado à avisar os demais usuários da chegada de novos usuários ao
        servidor, ou então de suas saídas. <br />
        <span style={{ color: 'grey' }}>#robco-cybernetics:</span> Lugar para
        uso de comandos de bots. Qualquer comando de bot fora desse canal de
        texto é proibido. <br />
        <span style={{ color: 'grey' }}>#mods-recomendados:</span> Recomendações
        de mods dos demais usuários. Vale somente para jogos de Fallout.
        Qualquer outra recomendação de mod para outros jogos, coloque no
        #off-topic. <br />
        <span style={{ color: 'grey' }}>#jukebox:</span> Canal dedicado à
        comandos do bot @Mr. New Vegas. <br />
        <span style={{ color: 'grey' }}>#suporte-técnico:</span> Canal para os
        demais usuários se ajudarem com bugs e troubleshootings sobre o jogo.{' '}
        <br />
        <span style={{ color: 'grey' }}>#artes-do-vault:</span> Todo conteúdo
        produzido pelos fãs de Fallout e usuários do servidor. #off-topic:
        Conversação sobre coisas que não tem a ver com Fallout. <br />
        <span style={{ color: 'grey' }}>#mods:</span> Sala de conversação sobre
        mods de Fallout em geral. #pérolas: Coisas engraçadas/ilógicas ditas
        pelos usuários do servidor ou então em algum lugar distinto sobre a lore
        do jogo. <br />
        <span style={{ color: 'grey' }}>#shitpost:</span> Literalmente tudo que
        não tem a ver com o servidor em geral (menos NSFW, poxa). <br />
        <span style={{ color: 'grey' }}>#irl:</span> Um canal de texto para os
        usuários falarem de coisas pessoais de seu dia-a-dia.<br />
        <span style={{ color: 'grey' }}>#perolas:</span> Canal para exibir as
        mensagens ilógicas ou hilárias faladas pelos fãs de Fallout.<br />
        <span style={{ color: 'grey' }}>#evergreen-mills:</span> Canal reservado
        para os trolls do servidor.<br />
        <h1>
          <center>[Canais de voz disponíveis]</center>
        </h1>
        <span>L.A. Boneyard</span>
        <br />
        <span>Navarro</span>
        <br />
        <span>The Strip</span>
        <br />
        <br />
        <h1>
          <center>[Comandos para bots]</center>
        </h1>
        <b>Comandos do @Pip-boy 3000 (Mee6) </b>
        <br />
        <span style={{ color: 'grey' }}>"!regras"</span> Mostra um pequeno texto
        introdutório, junto com as principais regras do servidor.<br />
        <span style={{ color: 'grey' }}>"!rank"</span> Mostra o seu XP, nível e
        posição na leaderboard do servidor. <br />
        <span style={{ color: 'grey' }}>"!levels"</span> Mostra um link para a
        leaderboard do servidor. <br />
        <span style={{ color: 'grey' }}>"!pipboy"</span> Mostra um pequeno texto
        explicativo do mini-game de XP do servidor. <br />
        <span style={{ color: 'grey' }}>"!karma"</span> Mostra um pequeno texto
        explicativo sobre o sistema de reputação e participação do servidor.{' '}
        <br />
        <br />
        <b>Comandos do @Mr. New Vegas (Rythm) </b>
        <br />
        <span style={{ color: 'grey' }}>
          "!play (insira o nome da sua música aqui)"
        </span>{' '}
        Toca a primeira música que está em primeiro lugar no campo de pesquisa
        do YouTube.<br />
        <span style={{ color: 'grey' }}>
          "!play (insira o link da sua música aqui)"
        </span>{' '}
        Toca a música ao qual pertence o link do YouTube.<br />
        <span style={{ color: 'grey' }}>
          "!search (insira o nome da sua música aqui)"
        </span>{' '}
        Mostra uma lista com as 10 primeiras músicas disponíveis no campo de
        pesquisa do YouTube. Após a lista aparecer, escreva no chat um número da
        lista, que a música tocará logo em seguida." <br />
        <span style={{ color: 'grey' }}>"!skip"</span> Pula a música atual.
        Lembrando que o bot faz playlist das músicas, então podem fazer comandos
        atrás de comandos para música que ela tocará todas em excessão. <br />
        <br />
        <b>Comandos do @Nick Valentine#0997 (NotSoBot) </b>
        <br />
        Bem, são muitos, então aqui vai um site onde mostra todos.{' '}
        <a href="https://mods.nyc/help/" rel="_norefer" target="_blank">
          https://mods.nyc/help/
        </a>
        <br />
        <h1>
          <center>[Sala de música]</center>
        </h1>
        <p>
          -A sala de música atual é o canal de voz The Aces Theatre. O bot @Mr.
          New Vegas só pode ser chamado nesta sala.{' '}
        </p>
        <p>
          - Se o bot for visto em qualquer outro lugar com usuário(s) dentro,
          este(s) serão alertados e se continuarem assim, receberão a tag de
          comportamento indesejável, até sua eventual remoção do servidor.{' '}
        </p>
        <p>
          - Na sala cabe-se até 10 pessoas mais o bot. Caso a sala esteja cheia,
          espere sua vez. - Se houver trollagem, como músicas puladas
          não-desejadamente por outro usuário ou baderna total, a(s) pessoa(s)
          trollando serão kickadas da sala temporariamente e receberão a tag de
          comportamento indesejável, até sua eventual remoção do servidor, se
          continuarem assim.{' '}
        </p>
        <p>
          - Caso aja consenso entre os demais ouvintes, a música pode ser
          pulada.
        </p>
        <br />
        <Button
          color="green"
          onClick={next}
          className="loginBtn"
          inverted
          size="medium"
          fluid
        >
          Continue to GOAT
        </Button>
      </div>
    )
  }
}

export default ManualNetwork
