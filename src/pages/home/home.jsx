import Container from '@mui/material/Container'

import SearchForm from '../../containers/search-form'

import styles from './home.styles'

const Home = () => {
  return (
    <Container sx={styles.container}>
      <SearchForm />
    </Container>
  )
}

export default Home