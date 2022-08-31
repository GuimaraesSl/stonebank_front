import React from 'react'
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
interface BadgeButtonExtractProps {
  imagePath: string
  title: string
  redirectRoute: string
}

export const BadgeButtonExtract: React.FC<BadgeButtonExtractProps> = ({
  title,
  imagePath,
  redirectRoute,
}: BadgeButtonExtractProps) => {
  const [redirect, setRedirect] = React.useState(false)

  const handleOnClick = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? <Redirect to={redirectRoute} /> : null}
      <Button
        className="bgButton"
        variant="outlined"
        color="primary"
        onClick={handleOnClick}
        fullWidth
        data-test-id="extract-button"
      >
        <div className="propButton">
          <img src={imagePath} className="iconBgButton" alt="bgButton" />
          <div className="label">{title}</div>
        </div>
      </Button>
    </>
  )
}
