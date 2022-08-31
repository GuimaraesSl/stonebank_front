import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        "& span": {
            marginTop: "-10px",
        },
    },
})