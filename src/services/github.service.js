import axios from 'axios'
import getPercentageByLanguage from '../utils/get-percentage-by-language'

const githubService = {
  getUserByUsername: async (username) => {
    const { data: user, status } = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      },
    })

    if (status === 200) {
      return user
    }

    if (status === 404) {
      throw new Error(`User ${username} not found`) 
    }
  },

  getRepositoriesByUser: async (username) => {
    const { data: repositories, status } = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      },
    })

    if (status === 200) {
      return repositories
    }

    if (status === 404) {
      throw new Error(`User ${username} not found`) 
    }
  },
  getLanguagesByUrl: async (languagesUrl) => {
    const { data: languages, status } = await axios.get(languagesUrl, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      },
    })

    if (status === 200) {
      return Object.keys(languages).map((languageName) => ({
        name: languageName,
        percentage: getPercentageByLanguage(languages, languageName),
        bytes: languages[languageName]
      }))
    }

    if (status === 404) {
      throw new Error(`Repository not found`) 
    }
  }
}

export default githubService