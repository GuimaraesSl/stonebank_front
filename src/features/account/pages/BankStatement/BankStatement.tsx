import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { DayTransactions } from 'features/account/components/DayTransactions'
import { AccountRoutes } from 'features/account/constants/routes'
import { StoreState } from 'redux/state'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'
import { SearchField } from 'components/SearchField/SearchField'
import { AppBar } from 'components/AppBar'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { closeAlert, getBankStatement } from 'features/account/redux/actions'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountBalance } from 'features/account/components/AccountBalance'
import { useStyles } from './BankStatement.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { PageContainer } from 'components/PageContainer'
import { TransactionTypeFilterButton } from 'features/account/components/TransactionTypeFilterButton'
import { TransactionType } from 'features/account/redux/models/transactionType'
import { EmptyList } from 'components/EmptyList'
import { Icon } from 'components/Icon'

export const BankStatement: React.FC = () => {
  const accountState = useSelector((store: StoreState) => store.account)
  const { loading, bankStatement, errorMessage } = accountState
  const [searchValue, setSearchValue] = React.useState('')
  const [dateFilter, setDateFilter] = React.useState(0)
  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  React.useEffect(() => {
    dispatch(getBankStatement(dateFilter))
  }, [dateFilter])

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          if (!loading) {
            setDateFilter(dateFilter + 30)
            window.scroll(0, window.pageYOffset - 110)
          }
        }
      },
      { threshold: 1 },
    )

    intersectionObserver.observe(document.querySelector('#observer')!)

    return () => intersectionObserver.disconnect()
  }, [bankStatement])

  const displayBankStatement = React.useMemo(() => {
    const normalize = (text: string) => {
      return text
        .replace(/[àáâãäå]/, 'a')
        .replace(/[èéêë]/, 'e')
        .replace(/[íìïî]/, 'i')
        .replace(/[òóôö]/, 'o')
        .replace(/[úùûü]/, 'u')
        .replace(/[ç]/, 'c')
        .toLowerCase()
    }

    const lowerSearchValue = normalize(searchValue)

    const filteredBankStatement = bankStatement
      ?.map(bankStatement => {
        const filteredTransactions = bankStatement.transactions?.filter(
          transaction => {
            return (
              transaction.title.toLowerCase().includes(lowerSearchValue) ||
              normalize(transaction.title).includes(lowerSearchValue) ||
              transaction.tags?.forEach(tag =>
                tag.toLowerCase().includes(lowerSearchValue),
              )
            )
          },
        )
        return {
          ...bankStatement,
          transactions: filteredTransactions,
        }
      })
      .filter(bankStatement => bankStatement.transactions?.length)

    return filteredBankStatement
  }, [bankStatement, searchValue])

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onMoreFiltersButtonClick = () => {
    history.push(AccountRoutes.filter)
  }

  const onAlertClose = () => {
    dispatch(closeAlert())
  }

  const isEmptyList = () => {
    return !displayBankStatement?.length!
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={<AppBar homeRoute={AccountRoutes.home} />}
        header={
          <React.Fragment>
            <ProcessDescriptionHeader
              title="Extrato"
              description="Acompanhe a movimentação da sua conta com todos os detalhes de suas movimentações."
            />
            <Box
              data-test-id="balance"
              display="flex"
              className={styles.balanceSubheader}
            >
              <Typography>Seu saldo&nbsp;</Typography>
              <AccountBalance size="small" variant="body1" show />
            </Box>
          </React.Fragment>
        }
        main={
          <React.Fragment>
            <SearchField
              placeholder="Busque por nome ou Tag"
              onChange={onSearchValueChange}
            />
            <Grid
              container
              justify="space-between"
              spacing={2}
              className={styles.filters}
            >
              <Grid item>
                <Typography data-test-id="filter" variant="subtitle2">
                  Filtrar por:
                </Typography>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item data-test-id="received-button">
                    <TransactionTypeFilterButton
                      transactionType={TransactionType.received}
                    />
                  </Grid>
                  <Grid item data-test-id="sent-button">
                    <TransactionTypeFilterButton
                      transactionType={TransactionType.sent}
                    />
                  </Grid>

                  <Grid item>
                    <ButtonWithFloatingIcon
                      icon={<Icon name="filter" />}
                      onClick={onMoreFiltersButtonClick}
                      data-test-id="more-filters-button"
                    >
                      Mais filtros
                    </ButtonWithFloatingIcon>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {isEmptyList() ? (
              <EmptyList />
            ) : (
              <Box>
                {displayBankStatement?.map((dayTransactions, i) => (
                  <DayTransactions key={i} dayTransactions={dayTransactions} />
                ))}
              </Box>
            )}
            <Box id="observer" style={{ marginTop: 100 }}></Box>
          </React.Fragment>
        }
        footer={<ProcessPageFooter />}
        footerPosition="fixed"
      />

      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
      <Loader open={loading} />
    </PageContainer>
  )
}
