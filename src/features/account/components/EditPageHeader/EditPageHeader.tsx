import React from 'react'
import { Box, CardContent, Toolbar } from '@material-ui/core'
//import { CancelButton } from "components/CancelButton";
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'

import { useStyle } from './EditPageHeader.style'
import { AccountRoutes } from 'features/account/constants/routes'

export const EditPageHeader: React.FC = () => {
  const style = useStyle()

  return (
    <Box className={style.mainHeader}>
      <CardContent>
        <Toolbar className={style.toolbar}>
          <ProcessDescriptionHeader
            title="Editar Conta"
            data-test-id="edit-page-button"
          />
          <div className={style.button}>
            {/* <CancelButton redirectRoute={AccountRoutes.home} /> */}
          </div>
        </Toolbar>
      </CardContent>
    </Box>
  )
}
