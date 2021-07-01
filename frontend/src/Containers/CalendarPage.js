import { Calendar } from '.';
import { Upcoming } from '../Components';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

export default function CalendarPage() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Calendar />
                </Grid>
                {/* <Divider orientation="vertical" variant="middle"/> */}
                <Grid item xs={3}>
                    <Upcoming />
                </Grid>
            </Grid>
        </div>
    )
}