import { makeStyles } from "@material-ui/core"
import { colors } from "_config"

export const useStyles = makeStyles({
    ListItemText: {
        textAlign: 'center',
        color: colors.readOnly.light.black
    },
    listItemSecondaryAction: {
        color: colors.system.light.primary,
        padding: '0px 10px',
        display: 'initial',
        right: 'auto',
        alignItems: 'center'
    }
})