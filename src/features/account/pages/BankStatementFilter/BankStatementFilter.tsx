import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Input,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { AccountRoutes } from "features/account/constants/routes";
import { AppBar } from "components/AppBar";
import { Button } from "components/Button";
import { DateInput } from "components/DateInput";
import { Loader } from "components/Loader";
import { Alert } from "components/Alert";
import { Divider } from "components/Divider";
import { FilterSectionTitleAndDescription } from "features/account/components/FilterSectionTitleAndDescription";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon/ButtonWithFloatingIcon";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { cancelLabel } from "constants/buttons/labels";
import { TransactionType } from "features/account/redux/models/transactionType";
import {
  closeAlert,
  setBankStatementFilters,
} from "features/account/redux/actions";
import { StoreState } from "redux/state";
import { useStyles } from "./BankStatementFilter.style";
import { TagChip } from "features/tags/components/TagChip";
import { Icon } from "components/Icon";
import { OperationType } from "features/account/redux/models/operationType";
const defaultStartDate = new Date();
defaultStartDate.setDate(defaultStartDate.getDate() - 30);

export const BankStatementFilter: React.FC = () => {
  const { loading, bankStatementFilters, errorMessage } = useSelector(
    (state: StoreState) => state.account
  );

  const [startDate, setStartDate] = React.useState<
    MaterialUiPickersDate | undefined
  >(bankStatementFilters?.startDate ?? defaultStartDate);

  const [endDate, setEndDate] = React.useState<
    MaterialUiPickersDate | undefined
  >(bankStatementFilters?.endDate ?? new Date());

  const [transactionType, setTransactionType] = React.useState<
    TransactionType | undefined
  >(bankStatementFilters?.transactionType);

  const [tags, setTags] = React.useState<string[]>([]);
  const [datesAreValid, setDatesAreValid] = React.useState(false);

  const [operationType, setOperationType] = React.useState<
    OperationType | undefined
  >(bankStatementFilters?.operationType ?? 100);

  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();

  React.useEffect(() => {
    setDatesAreValid(startDate!.getTime() <= endDate!.getTime());
  }, [startDate, endDate]);

  const onCancelButtonClick = () => {
    history.goBack();
  };

  const onResetDateChange = () => {
    const date = new Date();
    const startDate = new Date();
    startDate.setDate(date.getDate() - 30);

    setStartDate(startDate);
    setEndDate(date);
  };

  const onStartDateChange = (date: MaterialUiPickersDate) => {
    if (date === undefined) date = new Date();

    setStartDate(date);
  };

  const onEndDateChange = (date: MaterialUiPickersDate) => {
    if (date === undefined) date = new Date();

    setEndDate(date);
  };

  const onTagClick = (tag: string) => {
    let newTags = [...tags];

    if (tags.includes(tag)) newTags = newTags.filter((x) => x !== tag);
    else newTags.push(tag);

    setTags(newTags);
  };

  const onChangeOperationType = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOperationType(event.target.value as number);
  };

  const onApplyButtonClick = () => {
    dispatch(
      setBankStatementFilters({
        startDate: startDate as Date,
        endDate: endDate as Date,
        transactionType,
        tags,
        operationType:
          operationType?.valueOf() != 100 ? operationType : undefined,
      })
    );
    history.goBack();
  };

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Filtrar Extrato"
            description="Selecione as características das transações que deseja visualizar."
          />
        }
        main={
          <React.Fragment>
            <FilterSectionTitleAndDescription
              title="Por Data"
              description="Escolha o período que deseja visualizar"
            />
            <Grid
              container
              spacing={1}
              wrap="nowrap"
              className={styles.datesSection}
            >
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Typography variant="body2">de&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <DateInput
                      maxValue={endDate}
                      value={startDate}
                      onChange={onStartDateChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Typography variant="body2">até&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <DateInput value={endDate} onChange={onEndDateChange} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              {!datesAreValid && (
                <Grid
                  container
                  justifyContent="center"
                  className={styles.errorMessage}
                >
                  <Grid>
                    <Icon name="alert" />
                  </Grid>
                  <Grid>As datas estão inválidas</Grid>
                </Grid>
              )}
            </Box>
            <Box className={styles.clearButton}>
              <ButtonWithFloatingIcon
                onClick={() => {
                  onResetDateChange();
                }}
                size="small"
                data-test-id="date-clear-button"
              >
                Limpar
              </ButtonWithFloatingIcon>
            </Box>
            <Divider spacing={2} />
            <Box component="section">
              <FilterSectionTitleAndDescription
                title="Por Transação"
                description="Filtrar por gastos ou receitas"
              />
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    data-test-id="sent-button"
                    variant={
                      transactionType === TransactionType.sent
                        ? "contained"
                        : "outlined"
                    }
                    size="small"
                    onClick={() =>
                      setTransactionType(
                        transactionType === TransactionType.sent
                          ? undefined
                          : TransactionType.sent
                      )
                    }
                  >
                    Enviados
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    data-test-id="received-button"
                    variant={
                      transactionType === TransactionType.received
                        ? "contained"
                        : "outlined"
                    }
                    size="small"
                    onClick={() =>
                      setTransactionType(
                        transactionType === TransactionType.received
                          ? undefined
                          : TransactionType.received
                      )
                    }
                  >
                    Recebidos
                  </Button>
                </Grid>
              </Grid>
              <Box className={styles.clearButton}>
                <ButtonWithFloatingIcon
                  size="small"
                  onClick={() => setTransactionType(undefined)}
                  data-test-id="transaction-clear-button"
                >
                  Limpar
                </ButtonWithFloatingIcon>
              </Box>
            </Box>
            <Divider spacing={2} />
            <Box component="section">
              <FilterSectionTitleAndDescription
                title="Por tipo"
                description="Filtrar por gastos ou receitas"
              />
              <Box>
                <Select
                  data-test-id="select-button"
                  fullWidth={true}
                  value={operationType}
                  onChange={onChangeOperationType}
                  displayEmpty={true}
                  variant={"outlined"}
                  placeholder="Todas"
                  defaultChecked={true}
                  defaultValue={100}
                >
                  <MenuItem data-test-id="all-button" value={100}>
                    Todas
                  </MenuItem>
                  <MenuItem data-test-id="boleto-button" value={2}>
                    Pagamento de Boleto
                  </MenuItem>
                  <MenuItem data-test-id="Transfer-button" value={3}>
                    Transferência
                  </MenuItem>
                  <MenuItem data-test-id="internalTransfer-button" value={6}>
                    Transferência interna
                  </MenuItem>
                  <MenuItem data-test-id="paymentGare-button" value={8}>
                    Pagamento de GARE
                  </MenuItem>
                  <MenuItem data-test-id="paymentFgts-button" value={11}>
                    Pagamento de FGTS
                  </MenuItem>
                  <MenuItem data-test-id="paymentDarj-button" value={12}>
                    Pagamento de DARJ
                  </MenuItem>
                  <MenuItem data-test-id="smsTransfer-button" value={13}>
                    Transferência por SMS
                  </MenuItem>
                  <MenuItem data-test-id="topUp-button" value={37}>
                    Recarga de Celular
                  </MenuItem>
                  <MenuItem data-test-id="QrCodeTransfer-button" value={44}>
                    Transferência por QR Code
                  </MenuItem>
                </Select>
              </Box>
              <Box className={styles.clearButton}>
                <ButtonWithFloatingIcon
                  size="small"
                  onClick={() => setOperationType(100)}
                  data-test-id="type-clear-button"
                >
                  Limpar
                </ButtonWithFloatingIcon>
              </Box>
            </Box>
            <Divider spacing={2} />
            <Box>
              <FilterSectionTitleAndDescription
                title="Por TAGs"
                description="As tags identificam suas transações, selecione
                            quais deseja visualizar"
              />
              <Box className={styles.customTagButtonsFilter}>
                <TagChip
                  label="Crédito"
                  selected={tags.includes("Crédito")}
                  onClick={() => onTagClick("Crédito")}
                />
                <TagChip
                  label="Débito"
                  selected={tags.includes("Débito")}
                  onClick={() => onTagClick("Débito")}
                />
                <TagChip
                  label="Manutenção"
                  selected={tags.includes("Manutenção")}
                  onClick={() => onTagClick("Manutenção")}
                />
                <TagChip
                  label="Escola"
                  selected={tags.includes("Escola")}
                  onClick={() => onTagClick("Escola")}
                />
              </Box>
            </Box>
            <Divider spacing={2} />
            <Box className={styles.applyButton}>
              <ButtonWithFloatingIcon
                icon={<Icon name="filter" />}
                size="large"
                disabled={!datesAreValid}
                onClick={onApplyButtonClick}
                data-test-id="apply-button"
              >
                Aplicar Filtros
              </ButtonWithFloatingIcon>
            </Box>
          </React.Fragment>
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert
          message={errorMessage}
          title="Erro"
          severity="error"
          onClose={() => dispatch(closeAlert())}
        />
      )}
    </PageContainer>
  );
};
