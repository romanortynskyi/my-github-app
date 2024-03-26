import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const Repository = ({ repository }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1} sx={{ flexDirection: 'column' }}>
          <a
            href={repository.html_url}
            style={{ textDecoration: 'none', marginLeft: '8px' }}
          >
            <Typography variant='body2'>
              {repository.name}
            </Typography>
          </a>

          {repository.languages?.map((language) => (
            <Grid item key={language.name}>
              <Typography variant='body2'>{language.name}</Typography>
              <Typography variant='body2'>
                {language.percentage.toFixed(2)}%
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Repository