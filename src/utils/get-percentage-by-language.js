const getPercentageByLanguage = (languages, language) => {
  const languageBytes = languages[language]
  const totalBytes = Object.values(languages).reduce((prevValue, currValue) => prevValue + currValue)

  const percentage = (languageBytes / totalBytes) * 100

  return percentage
}

export default getPercentageByLanguage
