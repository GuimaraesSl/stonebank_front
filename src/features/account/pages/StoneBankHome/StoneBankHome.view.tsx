import { PageContainer } from "components";
import { StoneBankHomePageHeader } from "features/account/components/StoneBankHomePageHeader";
import { useStyles } from "./StoneBankHome.style";

export const StoneBankHomeView: React.FC = () => {
  const styles = useStyles();

  return (
    <PageContainer className={styles.pageContainer}>
      <StoneBankHomePageHeader className={styles.header} />
    </PageContainer>
  );
};
