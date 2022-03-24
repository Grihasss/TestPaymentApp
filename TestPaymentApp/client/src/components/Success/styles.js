import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    
    padding: theme.spacing(2),
  },
  number: {
    marginLeft: theme.spacing(2),
  }

}));