import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import styles from './search-form.styles'

const SearchForm = () => {
  const navigate = useNavigate()
  
  const [query, setQuery] = useState('')

  const onQueryChange = (e) => {
    const newQuery = e.target.value

    setQuery(newQuery)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    navigate(`/${query}`)
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>Github user search</Typography>
      <TextField
        value={query}
        onChange={onQueryChange}
        sx={styles.queryTextField}
        placeholder='Github username'
        />
      <Button
        onClick={onSubmit}
        title='Search'
        variant='contained'
      >
        Search
      </Button>
    </Box>
  )
}

export default SearchForm
