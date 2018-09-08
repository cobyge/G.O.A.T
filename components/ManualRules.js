import { Image, Button } from 'semantic-ui-react'



class Rules extends React.Component {
  componentDidMount() {
    document.title = 'Rules'
  }

  render() {
    const { next } = this.props

    return (
      <div>
        <div>
          <center>
            <Image
              src="static/intro.png"
              size="large"
              style={{ clear: 'both' }}
            />
          </center>
          <Image src="static/music.png" size="small" floated="left" />

          <br />
          <p>
            Olá, e sejam bem-vindos ao discord oficial do canal Vault 130! Aqui
            é palco para a socialização de tanto inscritos como não-inscritos no
            canal. É, sobretudo, uma maneira da comunidade brasileira de Fallout
            socializar.
          </p>
          <p>
            <b>Moderação:</b> <br />
            <span style={{ color: '#1bff80' }}>Vault Overseer</span> – Músico{' '}
            <br />
            <span style={{ color: '#ffb641' }}>Vault Manager</span> – Neto{' '}
            <br />
            <span style={{ color: '#2ecfff' }}>Vault Technician</span> – Zé, Ipa{' '}
            <br />
          </p>
        </div>
        <div style={{ clear: 'both', paddingBottom: '20px' }}>
          <center>
            <Image src="static/rules.png" size="large" />
            <h1>
              "Age como se a máxima de tua ação devesse tornar-se, através da
              tua vontade, uma lei universal." <small> – Immanuel Kant</small>
            </h1>
          </center>
          <h3>A moderação NÃO</h3>
          -Se importa com sua opinião <br />
          -Vai pegar leve por suas cagadas <br />
          -Se responsabiliza por seus sentimentos <br />
          -Vai criar regras especiais se você for um snowflake <br />
          <h3> Chats de voz </h3>
          -Não atrapalhe conversas <br />
          -Mantenha a conversa no canal de voz sempre limpo. Push-to-talk é
          recomendado <br />
          -Zoeira fora de hora (em momentos de debate, por exemplo) é passivo de
          banimento <br />
          <h3>É reservado à moderação</h3>
          -Arbitragem sobre tags <br />
          -Administração do servidor <br />
          -Deletar mensagens <br />
          -Expulsar usuários do servidor <br />
          -Aplicar punições <br />
          <h3>Chats de texto</h3>
          -Não há como saber se você está sendo sarcástico<br />
          -Use o shitpost para postar seus memes e afins. Qualquer meme
          (QUALQUER) postado em canais de texto que não sejam o shitpost será
          excluido e o usuário punido <br />
          -Conversas sobre jogos que não sejam Fallout ficam no off-topic <br />
          -Não compartilhe conteúdo NSFW. Em lugar nenhum (sim, isso inclui o
          shitpost) <br />
          <h3>Uso do servidor </h3>
          -Este servidor não se responsabiliza por desinformação oriunda de seus
          usuários e/ou danos causados pelos mesmos <br />
          -Pessoas inativas por muito tempo serão kickadas <br />
          -Se tiver alguma ideia relevante ao servidor, mande em sugestões{' '}
          <br />
          -Reclamação sobre algum membro mande para alguém da staff <br />
          -Reclamação sobre a staff mande para o Músico <br />
          -Reclamação sobre o Músico mande para o Zé ou para o Neto <br />
          <br />
          <Button
            color="green"
            onClick={next}
            className="loginBtn"
            inverted
            size="medium"
          >
            Eu concordo com o que está escrito acima; É um contrato explícito
            que tenho com o dono do servidor e caso eu quebre alguma das regras,
            estarei submetido a uma punição proporcional.
          </Button>
        </div>
      </div>
    )
  }
}

export default Rules
