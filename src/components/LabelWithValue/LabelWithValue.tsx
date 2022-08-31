import { CurrencyFormatter, DateFormatter } from "_translate";
import React from "react";
import { useStyles } from "components/LabelWithValue/LabelWithValue.style";
import { DateTimePickerView } from "@material-ui/pickers";
interface LabelWithValueProps {
  bank?: string;
  name?: string;
  taxPayer?: string;
  datePix?: string;
  keypix?: string;
  totalValue: number;
  description: string;
}
export const LabelWithValue: React.FC<LabelWithValueProps> = ({
  bank,
  name,
  taxPayer,
  datePix,
  keypix,
  totalValue,
  description,
}: LabelWithValueProps) => {
  const styles = useStyles();
  return (
    <div className={styles.summaryContent}>
      <div>PIX no valor de</div>
      <strong>{CurrencyFormatter.format(totalValue)}</strong> 
      <div>Para a conta de</div>
      <strong>{name}</strong>
      <div>com CPF</div>
      <strong>{taxPayer}</strong>
      <div>Instituição</div>
      <strong>{bank}</strong>
      <div>Chave PIX</div>
      <strong>{keypix}</strong>
      <div>no dia</div>
      <strong>{datePix}</strong>
      <div>decrição da transferência</div>
      <strong>{description}</strong>
    </div>
  );
};
