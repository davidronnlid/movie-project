import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import smilingDavid from './ConfidentSmile.png'

const AboutProjectCard = () => {
  return (
    <Container>
      <Row
        style={{
          margin: '40px 0',
          borderRadius: '10px',
        }}
      >
        <Col xs={5}>
          <Image
            src={smilingDavid}
            style={{
              width: '100%',
              height: '40%',
              borderRadius: '10px',
              objectFit: 'cover',
              objectPosition: '0px 18%',
            }}
          />
        </Col>
        <Col xs={7}>
          <Card
            style={{
              width: '100%',
              backgroundColor: '#CAFFB9',
              color: 'black',
              fontWeight: '600',
              borderRadius: '10px',
            }}
          >
            <Card.Body>
              <Card.Title>About calculator</Card.Title>
              <Card.Text>
                Inspired by user stories in{' '}
                <a href="https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Calculator-App.md">
                  this repo
                </a>
                , the code was written by David Rönnlid. No help except Google,
                Stack Overflow, blogs, etc. was used.
              </Card.Text>
              <Button
                variant="primary"
                href="https://github.com/davidronnlid/calculator-app"
              >
                Project Github page
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutProjectCard
