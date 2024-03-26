import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import Repository from '../repository/repository'

const Repositories = ({ repositories }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Repositories</Typography>
        {repositories ? (
          <List>
            {repositories.map((repository) => (
              <Box
                key={repository.name}
                sx={{ mb: 3 }}
              >
                <Repository repository={repository} />
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant='body2'>No repositories found.</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Repositories