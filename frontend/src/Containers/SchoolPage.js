import { Schools } from '.';
import { Upcoming } from '../Components';
import Grid from '@material-ui/core/Grid';

export default function SchoolPage({ user }) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Schools user={user}/>
                </Grid>
                <Grid item xs={3}>
                    <Upcoming user={user}/>
                </Grid>
            </Grid>
        </div>
    )
}