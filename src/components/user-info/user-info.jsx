import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const UserInfo = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user.avatar_url} alt={user.login} sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{user.login}</Typography>
            <Typography variant="body2">{user.name}</Typography>
            <Typography variant="body2">{user.repositoriesCount} public repositories</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserInfo