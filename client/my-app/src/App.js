import logo from './logo.svg';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import memories from './images/memories.png';
import Form from './componets/Form/Form'
import Posts from './componets/Posts/Posts';
import useStyles from './styles';
import './App.css';


function App() {
 
  const classes = useStyles();
  return (
    <Container maxidth="lg">

    <AppBar className={classes.appBar} position="static" color="inherit">

      <Typography className={classes.heading} variant="h2" align="center">FrontPage</Typography>
      <img className={classes.image} src={memories} alt="memories" height="60"/>
    </AppBar>

    <Grow in>
      <Container>

        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={4}>

          <Form/>

          </Grid>

          <Grid item xs={12} sm={7}>

            <Posts />

          </Grid>
        </Grid>
      </Container>
    </Grow>

  </Container>
  );
}

export default App;
