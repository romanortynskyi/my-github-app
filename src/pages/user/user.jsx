import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { PieChart } from '@mui/x-charts'

import githubService from '../../services/github.service'
import UserInfo from '../../components/user-info'
import Repositories from '../../components/repositories'
import getUniqueNameSums from '../../utils/get-unique-name-sums'

import styles from './user.styles'
import getPercentageByLanguage from '../../utils/get-percentage-by-language'

const User = () => {
  const { username } = useParams()

  const [user, setUser] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [error, setError] = useState('')
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(true)
  const [languagesLoaded, setLanguagesLoaded] = useState(false)

  const getUserByUsername = async (username) => {
    try {
      const user = await githubService.getUserByUsername(username)

      setUser(user)
    }

    catch(error) {
      setError(error.message)
    }

    finally {
      setIsLoadingUser(false)
    }
  }

  const getRepositoriesByUser = async (username) => {
    try {
      const repositories = await githubService.getRepositoriesByUser(username)

      setRepositories(repositories)
    }

    catch(error) {
      setError(error.message)
    }

    finally {
      setIsLoadingRepositories(false)
    }
  }

  const getLanguages = useCallback(() => {
    if (repositories.length && !languagesLoaded) {
      const updatedRepositories = [...repositories]

      const userLanguages = []

      repositories.forEach(async (repository) => {
        const repositoryName = repository.name

        try {
          const languages = await githubService.getLanguagesByUrl(repository.languages_url)
    
          const repositoryIndex = updatedRepositories.findIndex((repository) => repository.name === repositoryName)
          updatedRepositories[repositoryIndex] = {
            ...updatedRepositories[repositoryIndex],
            languages,
          }

          const { languages: repositoryLanguages } = updatedRepositories[repositoryIndex]

          if (Array.isArray(languages)) {
            repositoryLanguages.forEach((language) => {
              userLanguages.push(language)
            })
          }
        }
    
        catch(error) {
          setError(error.message)
        }

        setRepositories(updatedRepositories)
        setLanguagesLoaded(true)

        const uniqueLanguages = getUniqueNameSums(userLanguages)

        setUser((prevUser) => ({
          ...prevUser,
          languages: uniqueLanguages,
        }))
      })
    }
  }, [repositories, languagesLoaded])

  useEffect(() => {
    getUserByUsername(username)
  }, [username])

  useEffect(() => {
    getRepositoriesByUser(username)
  }, [username])

  useEffect(() => {
    getLanguages()
  }, [getLanguages])

  const pieChartData = useMemo(() => {
    if (user && user.languages) {
      const data = Object.keys(user.languages).map((languageName) => {
        const percentage = getPercentageByLanguage(user.languages, languageName)

        return {
          id: languageName,
          value: percentage,
          label: languageName,
        }
        }
      )

      return data
    }

    return []
  }, [user])

  const contentJSX = error ? <Typography>{error}</Typography> : (
    <Container sx={styles.container}>
      <Box sx={styles.userInfoContainer}>
        <UserInfo user={{
          ...user,
          repositoriesCount: repositories.length,
        }} />
      </Box>

      <Box sx={styles.pieChartContainer}>
        <PieChart
          series={[
            {
              data: pieChartData,
            },
          ]}
          width={1000}
          height={500}
        />
      </Box>

      <Repositories repositories={repositories} />
    </Container>
  )

  if (isLoadingUser || isLoadingRepositories) {
    return <CircularProgress />
  }

  return contentJSX
}

export default User