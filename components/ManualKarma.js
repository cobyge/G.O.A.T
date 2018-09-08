import { Image, Button } from 'semantic-ui-react'

class ManualKarma extends React.Component {
  componentDidMount() {
    document.title = 'Karma'
  }

  render() {
    const { next } = this.props

    return (
      <div style={{ paddingBottom: '20px' }}>
        <center>
          <Image src="static/karma.png" size="large" />
        </center>
        <h1>
          <p>
            Sua participação positiva ou negativa no servidor será medida por
            pontos de karma e conta-se até três (3) pontos positivos ou
            negativos.
          </p>
          <p>
            Com três pontuações positivas, você vira Vault Hero. Com mais três
            pontuações positivas enquanto Vault Hero, você pode ser indicado
            para participar da moderação do servidor.{' '}
          </p>
          <p>
            Com três pontuações negativas, você é banido do servidor
            permanentemente.
          </p>
        </h1>
        <h3>Níveis de Karma adquiríveis:</h3>
        <span style={{ color: 'green' }}>Messiah [+3]</span>
        <br />
        <span style={{ color: 'green' }}>Vault Martyr [+2]</span>
        <br />
        <span style={{ color: 'green' }}>Vault Guardian [+1]</span>
        <br />
        <span style={{ color: 'grey' }}>Vault Renegade [0]</span>
        <br />
        <span style={{ color: 'red' }}>Vault Delinquent [-1]</span>
        <br />
        <span style={{ color: 'red' }}>Vault Outlaw [-2]</span>
        <br />
        <span style={{ color: 'red' }}>Devil [-3]</span>
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

export default ManualKarma
