import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyle = makeStyles({
  TagButtonFilter: {
    height: '15px',
    fontSize: '8px',
    border: `1px solif ${colors.system.light.primary}`,
    padding: '3px 8px',
    color: colors.system.light.primary,
    borderRadius: '15px',
    boxShadow: 'initial',
  },
  tagEditHeader: {
    height: '100px',
    background: colors.system.light.surface,
    padding: '3px 15px',
  },
  tagsEditBody: {
    height: '62vh',
    background: colors.system.light.surface,
    padding: '5px 15px',
  },
  elementsFormTags: {
    marginTop: '10%',
  },
  addTagButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },
  finishTagButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 20,
    '& .MuiButton-root': {
      borderRadius: 10,
      fontWeight: 400,
    },
  },
  tagsButtonStyle: {
    paddingRight: '11%',
  },
  scrollTags: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'scroll',
    height: '60px',
    paddingTop: '6px',
  },
  errorMessage: {
    '& .MuiSnackbar-anchorOriginBottomCenter': {
      bottom: 'none',
      display: 'contents',
    },
  },
})
