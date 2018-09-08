import { Image, Button } from 'semantic-ui-react'

class ManualTags extends React.Component {
  componentDidMount() {
    document.title = 'Tags'
  }

  render() {
    const { next } = this.props

    return (
      <div style={{ paddingBottom: '20px' }}>
        <center>
          <Image src="static/tags.png" size="large" />
          <h1>
            Utilize o sistema de tags oferecido pelo bot para adicionar as tags
            de facções que você apoia na franquia, ou então, a tag Sem
            Especificação. Caso não se identifique, terá apenas 30% do acesso ao
            servidor.
          </h1>
        </center>
        <h3>Tags de identificação do usuário:</h3>
        <span style={{ color: '#1bff80' }}>
          <b>Vault Overseer</b>
        </span>: Administrador do servidor. Cuida das regras, distribui tags aos
        usuários e os policia, além de cuidar dos canais de texto e de voz.{' '}
        <br />
        <span style={{ color: '#ffb641' }}>Vault Manager</span>: Moderador do
        servidor. Distribui tags aos usuários, os policia e cuida dos canais de
        texto e de voz, ajudando também na administração geral do servidor.{' '}
        <br />
        <span style={{ color: '#2ecfff' }}>Vault Technician</span>:
        Sub-moderador do servidor. Cuida dos canais de texto e de voz. <br />
        <span style={{ color: '#e74c3c' }}>Vault Podcaster</span>:
        Streamer/YouTuber do servidor. Basta informar o seu canal do
        YouTube/Twitch a alguém da staff para garantir a tag. Garante acesso ao
        canal Lives e Podcasts do servidor. <br />
        <span style={{ color: '#ffe84e' }}>Vault Entrepreneur</span>: Doador do
        canal Vault 130 (Via Apoia.se, Paypal, Streamlabs ou cryptos). <br />
        <span style={{ color: '#2143f7' }}>Vault Dweller</span>: Usuário comum
        do servidor. <br />
        <span style={{ color: '#798a75' }}>Wastelander</span>: Usuário
        recém-chegado no servidor, ao qual está pendente de identificação.
        Possui somente 30% de acesso ao servidor. <br />
        <span style={{ color: '#ffffff' }}>Lore Master</span>: Mestre da
        história, em português. Dada para aqueles que possuem conhecimento
        profundo sobre a franquia e tudo que nela representa, além de serem
        capazes de debater e explicar aos demais usuários tudo que nela há.<br />
        <span style={{ color: '#5e08cc' }}>Vault Hero</span>: Membro exemplar do
        servidor. Dada para aqueles que conseguem alcançar três tags de
        reconhecimento de comportamento.<br />
        <span>Tags de facções</span>: Usuários que apoiam determinadas facções e
        defendem as suas missões/ideias.<br />
        <span>Not Specified:</span> Usuários aos quais não apoiam as ideias
        de nenhuma facção em particular.
        <br />
        <br />
        <Button
          color="green"
          onClick={next}
          className="loginBtn"
          inverted
          size="medium"
          fluid
        >
          Next
        </Button>
      </div>
    )
  }
}

export default ManualTags
