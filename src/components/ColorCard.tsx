/**
 * Component to render a color item
 * deletes it and sets its rating
 */
import React, { FunctionComponent } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { getColors } from './ColorsStateProvider';

/**
 * Props of the ColorCard component
 */
interface ColorCardProps {
    id: string;
    title: string;
    color: string;
    rating: number;
}

/**
 * Styles for the ColorCard component
 */
const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    deleteButton: {
        marginRight: -theme.spacing(3),
    },
    paper: {
        height: theme.spacing(12),
        backgroundColor: ({ color }: ColorCardProps) => color,
    },
    rating: {
        paddingTop: theme.spacing(2),
    },
}));

export const ColorCard: FunctionComponent<ColorCardProps> = (
    props: ColorCardProps
) => {
    const { id, title, rating } = props;

    // Get state's API
    const { deleteColor, rateColor } = getColors();

    // Create event handlers
    const onDelete = () => deleteColor(id);
    const onRate = (rate: number) => rateColor(id, rate);

    const classes = useStyles(props);

    return (
        <Card>
            <CardContent>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        className={classes.deleteButton}
                        onClick={onDelete}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Toolbar>
                <Paper elevation={4} className={classes.paper} />
                <Rating
                    size="large"
                    value={rating}
                    className={classes.rating}
                    onChange={(e, v) => onRate(Number(v))}
                />
            </CardContent>
        </Card>
    );
};

export default ColorCard;
