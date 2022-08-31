import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useStyles } from './ShowMoreButton.style'
import { Icon } from 'components/Icon'

interface ShowMoreButtonProps {
  showMore: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

enum ShowMoreLabel {
  SHOW_MORE = 'Mostrar mais',
  SHOW_LESS = 'Mostrar menos',
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  showMore,
  onClick,
}) => {
  const styles = useStyles()

  const [label, setLabel] = useState<ShowMoreLabel>(ShowMoreLabel.SHOW_MORE)

  useEffect(() => {
    showMore
      ? setLabel(ShowMoreLabel.SHOW_LESS)
      : setLabel(ShowMoreLabel.SHOW_MORE)
  }, [showMore])

  return (
    <Button
      className={styles.componentShowMore}
      onClick={onClick}
      data-test-id="show-more-button"
    >
          <Icon name={showMore ? 'arrowDown' : 'arrowUp'} />
      <text className={styles.label}>{label}</text>
    </Button>
  )
}
