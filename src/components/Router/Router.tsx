import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from 'components/ProtectedRoute'
import { SignIn } from 'features/authentication/pages/SignIn'
import { Welcome } from 'features/onboarding/pages/Welcome'
import { Terms } from 'features/onboarding/pages/Terms'
import { ActivateAccount } from 'features/onboarding/pages/ActivateAccount'
import { AccountActivationCompleted } from 'features/onboarding/pages/AccountActivationCompleted'
import { AccountActivationCompletedForCard } from 'features/onboarding/pages/AccountActivationCompletedForCard'
import { CreatePassword } from 'features/onboarding/pages/ActivateBySMS/CreatePasswordForSMS'
import { ConfirmPassword } from 'features/onboarding/pages/ActivateBySMS/ConfirmPasswordForSMS'
import { ActivationToken } from 'features/onboarding/pages/ActivateBySMS/ActivationTokenForSMS'
import { EnterTaxPayer } from 'features/onboarding/pages/ActivateBySMS/EnterTaxPayerForSMS'
import { EnterTaxPayerForCard } from 'features/onboarding/pages/ActivateByCard/EnterTaxPayerForCard'
import { EnterIdentifierForCard } from 'features/onboarding/pages/ActivateByCard/EnterIdentifierForCard'
import { EnterDigitsForCard } from 'features/onboarding/pages/ActivateByCard/EnterDigitsForCard'
import { EnterPhoneForCard } from 'features/onboarding/pages/ActivateByCard/EnterPhoneForCard'
import { CreatePasswordForCard } from 'features/onboarding/pages/ActivateByCard/CreatePasswordForCard'
import { ConfirmPasswordForCard } from 'features/onboarding/pages/ActivateByCard/ConfirmPasswordForCard'
import { InvalidDataForCard } from 'features/onboarding/pages/ActivateByCard/InvalidDataForCard'
import { EnterBirthDateForCard } from 'features/onboarding/pages/ActivateByCard/EnterBirthDateForCard'
import { AccountEmail } from 'features/onboarding/pages/AccountEmail'
import { BankStatement } from 'features/account/pages/BankStatement'
import { Home } from 'features/account/pages/Home'
import { AllAccounts } from 'features/account/pages/AllAccounts'
import { SignOut } from 'features/authentication/pages/SignOut'
import { AccountSettings } from 'features/account/pages/AccountSettings'
import { BankStatementFilter } from 'features/account/pages/BankStatementFilter'
import { Details } from 'features/account/pages/Details'
import { Receipt } from 'features/account/pages/Receipt'
import { OnboardingRoutes } from 'features/onboarding/constants/routes'
import { AuthenticationRoutes } from 'features/authentication/constants/routes'
import { AccountRoutes } from 'features/account/constants/routes'
import { AttachDocuments } from 'features/transference/pages/AttachDocuments'
import { FavoredAccountSelection } from 'features/transference/pages/FavoredAccountSelection'
import { ScheduleTransfer } from 'features/transference/pages/ScheduleTransfer'
import { Summary } from 'features/transference/pages/Summary/Summary'
import { TransferDescription } from 'features/transference/pages/TransferDescription'
import { Transference } from 'features/transference/pages/Transference/Transference'
import { TransferReceipt } from 'features/transference/pages/TransferReceipt/'
import { TransferValue } from 'features/transference/pages/TransferValue'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { FavoredIdentification } from 'features/transference/pages/FavoredIdentification'
import { UserRoutes } from 'features/user/constants/routes'
import { UserInformation } from 'features/user/pages/UserInformation'
import { ChangeEmail } from 'features/user/pages/ChangeEmail'
import { ChangePhone } from 'features/user/pages/ChangePhone'
import { ChangeNickname } from 'features/user/pages/ChangeNickname'
import { ChangePassword } from 'features/user/pages/ChangePassword'
import { ChooseNewPassword } from 'features/user/pages/ChooseNewPassword'
import { ConfirmNewPasswordUserInformation } from 'features/user/pages/ConfirmNewPassword'
import { CurrentAddress } from 'features/user/pages/CurrentAddress'
import { ChangeAddress } from 'features/user/pages/ChangeAddress'
import { ChangeConclude } from 'features/user/pages/ChangeConclude'
import { FavoredName } from 'features/transference/pages/FavoredName'
import { SelectBank } from 'features/transference/pages/SelectBank'
import { SelectAccountType } from 'features/transference/pages/SelectAccountType'
import { BankBranch } from 'features/transference/pages/BankBranch'
import { AccountNumber } from 'features/transference/pages/AccountNumber'
import { EditAccount } from 'features/account/pages/EditAccount'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { QrCodeTransfer } from 'features/qrCodeTransfer/pages/QrCodeTransfer/QrCodeTransfer'
import { GenerateQrCodeTransfer } from 'features/qrCodeTransfer/pages/GenerateQrCodeTransfer/GenerateQrCodeTransfer'
import { ShowQrCodeTransfer } from 'features/qrCodeTransfer/pages/ShowQrCodeTransfer'
import { ReadQrCodeTransfer } from 'features/qrCodeTransfer/pages/ReadQrCodeTransfer'
import { QrCodeTransferSendingDetails } from 'features/qrCodeTransfer/pages/QrCodeTransferSendingDetails'
import { ValidatePhone } from 'features/onboarding/pages/ActivateBySMS/ValidatePhoneForSMS/ValidatePhoneForSMS'
import { BirthDate } from 'features/onboarding/pages/ActivateBySMS/BirthDateForSMS'
import { CreateName } from 'features/onboarding/pages/ActivateBySMS/CreateNameForSMS'
import { CardRoutes } from 'features/card/constants/routes'
import { CardManagement } from 'features/card/pages/CardManagement'
import { CardOption } from 'features/card/pages/CardOption'
import { EnterCurrentPassword } from 'features/card/pages/ChangePassword/EnterCurrentPassword'
import { EnterNewPassword } from 'features/card/pages/ChangePassword/EnterNewPassword'
import { ConfirmNewPassword } from 'features/card/pages/ChangePassword/ConfirmNewPassword'
import { CancellationReplacementCard } from 'features/card/pages/CancellationReplacementCard'
import { CancelReason } from 'features/card/pages/Cancellation/CancelReason'
import { CancelCardAlert } from 'features/card/pages/Cancellation/CancelCardAlert'
import { BlockingReason } from 'features/card/pages/RequestDuplicate/BlockingReason'
import { BlockCardAlert } from 'features/card/pages/RequestDuplicate/BlockCardAlert'
import { AddressConfirmation } from 'features/card/pages/RequestDuplicate/AddressConfirmation'
import { ReplacementDetails } from 'features/card/pages/RequestDuplicate/ReplacementDetails'
import { UpdateAddress } from 'features/card/pages/RequestDuplicate/UpdateAddress'
import { AssociateNewCard } from 'features/card/pages/AssociateNewCard/AssociateNewCard'
import { AssociateFourDigits } from 'features/card/pages/AssociateNewCard/AssociateFourDigits'
import { AssociateNewCardCheckData } from 'features/card/pages/AssociateNewCard/AssociateNewCardCheck'
import { LandingPage } from 'features/onboarding/pages/LandingPage'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { PaymentDarj } from 'features/taxpayment/pages/Darj/PaymentDarj'
import { PaymentDarjType } from 'features/taxPayment/pages/Darj/PaymentDarjType'
import { PaymentDarjValues } from 'features/taxPayment/pages/Darj/PaymentDarjValues'
import { PaymentDarjDueDate } from 'features/taxPayment/pages/Darj/PaymentDarjDueDate'
import { PaymentDarjDescription } from 'features/taxpayment/pages/Darj/PaymentDarjDescription'
import { PaymentDarjSummary } from 'features/taxpayment/pages/Darj/PaymentDarjSummary'
import { PaymentDarjCodeNumber } from 'features/taxpayment/pages/Darj/PaymentDarjCodeNumber'
import { PaymentGare } from 'features/taxPayment/pages/Gare/PaymentGare'
import { PaymentGareDateType } from 'features/taxPayment/pages/Gare/PaymentGareDateType'
import { PaymentGareValues } from 'features/taxPayment/pages/Gare/PaymentGareValues/PaymentGareValues'
import { PaymentGareDueDate } from 'features/taxPayment/pages/Gare/PaymentGareDueDate'
import { PaymentGareDescription } from 'features/taxPayment/pages/Gare/PaymentGareDescription'
import { PaymentGareSummary } from 'features/taxPayment/pages/Gare/PaymentGareSummary'
import { PaymentGareCodeNumber } from 'features/taxPayment/pages/Gare/PaymentGareCodeNumber'
import { PaymentFgts } from 'features/taxPayment/pages/Fgts/PaymentFgts'
import { PaymentFgtsValues } from 'features/taxPayment/pages/Fgts/PaymentFgtsValues'
import { PaymentFgtsIdentifier } from 'features/taxPayment/pages/Fgts/PaymentFgtsIdentifier'
import { PaymentFgtsDate } from 'features/taxPayment/pages/Fgts/PaymentFgtsDate'
import { PaymentFgtsDescription } from 'features/taxPayment/pages/Fgts/PaymentFgtsDescription'
import { PaymentFgtsSummary } from 'features/taxPayment/pages/Fgts/PaymentFgtsSummary'
import { PaymentFgtsBarCode } from 'features/taxPayment/pages/Fgts/PaymentFgtsBarCode'
import { PaymentFgtsCodeRevenue } from 'features/taxPayment/pages/Fgts/PaymentFgtsCodeRevenue'
import { TopUpSchedule } from 'features/topUp/pages/TopUpSchedule'
import { TopUpNumber } from 'features/topUp/pages/TopUpNumber'
import { Help } from 'features/account/pages/Help'
import { TopUp } from 'features/topUp/pages/TopUp'
import { PeriodicRepetition } from 'features/topUp/pages/PeriodicRepetition'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import { TopUpValue } from 'features/topUp/pages/TopUpValue'
import { CheckDataTopUp } from 'features/topUp/pages/CheckDataTopUp'
import { CompleteTopUp } from 'features/topUp/pages/CompleteTopUp'
import { ActivateCard } from 'features/card/pages/ActivateCard/ActivateCard'
import { ActivateCardConclude } from 'features/card/pages/ActivateCard/ActivateCardConclude'
import { PasswordCard } from 'features/card/pages/ActivateCard/PasswordCard'
import { ConfirmPasswordCard } from 'features/card/pages/ActivateCard/ConfirmPasswordCard'
import { ConfirmationActivate } from 'features/card/pages/ActivateCard/ConfirmationActivate'
import { TaxPaymentHome } from 'features/taxPayment/pages/taxPaymentHome'
import { SmsTransferRoutes } from 'features/smsTransfer/constants/routes'
import { SmsTransferNumber } from 'features/smsTransfer/pages/SmsTransferNumber'
import { SmsTransferValue } from 'features/smsTransfer/pages/SmsTransferValue'
import { SmsTransferSummary } from 'features/smsTransfer/pages/SmsTransferSummary'
import { TransferProcess } from 'features/transference/pages/TransferProcess'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { ScheduleTransactions } from 'features/schedulePayments/pages/ScheduleTransactions'
import { FutureTransactions } from 'features/schedulePayments/pages/FutureTransactions'
import { ScheduleTransactionsList } from 'features/schedulePayments/pages/ScheduleTransactionsList'
import { SheduleTransactionsFilter } from 'features/schedulePayments/pages/SheduleTransactionsFilter'
import { ChangePasswordFirstAccess } from 'features/authentication/pages/FirstAccess/ChangePasswordFirstAccess'
import { ConfirmPasswordFirstAccess } from 'features/authentication/pages/FirstAccess/ConfirmPasswordFirstAccess'
import { ChangePasswordCompleted } from 'features/authentication/pages/FirstAccess/ChangePasswordCompleted'
import { RecoverPassword } from 'features/authentication/pages/RecoverPassword/RecoverPassword'
import { ConfirmRecoverPwd } from 'features/authentication/pages/ConfirmRecoverPwd'
import { TemporaryPassword } from 'features/authentication/pages/TemporaryPassword'
import { SmsAccountsExibition } from 'features/smsTransfer/pages/SmsAccountsExibition'
import { SmsTransferName } from 'features/smsTransfer/pages/SmsTransferName'
import { AssociateNameUserCard } from 'features/card/pages/AssociateNewCard/AssociateNameUserCard'
import { AssociateNationalityCard } from 'features/card/pages/AssociateNewCard/AssociateNationalityCard'
import { AssociateMotherNameCard } from 'features/card/pages/AssociateNewCard/AssociateMotherNameCard'
import { AssociateBirthDateCard } from 'features/card/pages/AssociateNewCard/AssociateBirthDateCard'
import { AssociateGenderUserCard } from 'features/card/pages/AssociateNewCard/AssociateGenderUserCard/AssociateGenderUserCard'
import { AssociateMaritalStatusCard } from 'features/card/pages/AssociateNewCard/AssociateMaritalStatusCard/AssociateMaritalStatusCard'
import { ConcludeAssociateCard } from 'features/card/pages/AssociateNewCard/ConcludeAssociateCard'
import { InvalidDataForAssociateCard } from 'features/card/pages/AssociateNewCard/InvalidDataForAssociateCard'
import { ConclusionFlow } from 'components/ConclusionFlow'
import {
  ChangeValue,
  PaymentAttach,
  PaymentData,
  PaymentDescription,
  PaymentHome,
  PaymentReceipt,
  PaymentRoutes,
  PaymentSummary,
  ScanBarcode,
  PaymentProcess,
} from 'features/payment'
import { EnterMailForSms } from 'features/onboarding/pages/ActivateBySMS/EnterMailForSms'
import {
  DigitalWithdrawalStart,
  DigitalWithdrawalSuccess,
  DigitalWithdrawalReceipt,
  DigitalWithdrawalRoutes,
  MoneyCount,
  SelectValue,
  ReadQrCodeDigitalWithdrawal,
  DigitalWithdrawalSummary,
} from 'features/digitalWithdrawal'
import { WithFirstAccessControl } from 'components/WithFirstAccessControl'
import { CancelPeriodicRepetition } from 'features/topUp/pages/CancelPeriodicTopUp'

//------------------------------------------
import { PixRoutes } from 'features/pix/constants/routes'
import {
  PixArea,
  PixKeyList,
  ConfirmEmailPixKey,
  ConfirmPhoneNumberPixKey,
  CreateRandomPixKey,
  CreateTaxIdPixKey,
  CreatePhoneNumberPixKey,
  CreateEmailPixKey,
  PixTransferHome,
  KeyPixTransfer,
  KeyPixTransferPayeeInfo,
  KeyPixTransferValue,
  KeyPixTransferDescription,
  KeyPixTransferSummary,
  PixTransferProcess,
  QrCodePixTransferScanner,
  QrCodePixTransferDescription,
  QrCodePixTransferValue,
  QrCodePixTransferSummary,
  BankPixTransferPayeeName,
  BankPixTransferPayeeTaxId,
  BankPixTransferSelectBank,
  BankPixTransferAccountType,
  BankDataPixTransferBranch,
  BankDataPixTransferAccount,
  BankPixTransferValue,
  BankPixTransferDescription,
  BankPixTransferSummary,
  FirstAccess,
  FirstAccessPixKeyList,
  ReceivePixTransferQrCode,
  ReceivePixTransferQrCodeValue,
  ReceivePixTransferQrCodeCheck,
} from 'features/pix/pages'
//------------------------------------------

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={OnboardingRoutes.welcome} component={Welcome} />
        <Route path={OnboardingRoutes.terms} component={Terms} />
        <Route
          exact
          path={OnboardingRoutes.activateAccount}
          component={ActivateAccount}
        />
        <Route
          path={OnboardingRoutes.activationTokenForSMS}
          component={ActivationToken}
        />
        <Route
          path={OnboardingRoutes.enterTaxPayerForSMS}
          component={EnterTaxPayer}
        />
        <Route
          path={OnboardingRoutes.enterMailForSms}
          component={EnterMailForSms}
        />
        <Route
          path={OnboardingRoutes.createPasswordForSMS}
          component={CreatePassword}
        />
        <Route
          path={OnboardingRoutes.confirmPasswordForSMS}
          component={ConfirmPassword}
        />
        <Route
          path={OnboardingRoutes.accountActivationCompletedForSMS}
          component={AccountActivationCompleted}
        />
        <Route path={OnboardingRoutes.birthDateForSMS} component={BirthDate} />
        <Route
          path={OnboardingRoutes.createNameForSMS}
          component={CreateName}
        />

        <Route
          path={OnboardingRoutes.validatePhoneForSMS}
          component={ValidatePhone}
        />

        <Route path={OnboardingRoutes.accountEmail} component={AccountEmail} />

        <Route
          path={OnboardingRoutes.accountActivationCompletedForCard}
          component={AccountActivationCompletedForCard}
        />
        <Route
          path={OnboardingRoutes.enterTaxPayerForCard}
          component={EnterTaxPayerForCard}
        />
        <Route
          path={OnboardingRoutes.enterIdentifierForCard}
          component={EnterIdentifierForCard}
        />
        <Route
          path={OnboardingRoutes.enterDigitsForCard}
          component={EnterDigitsForCard}
        />
        <Route
          path={OnboardingRoutes.enterPhoneForCard}
          component={EnterPhoneForCard}
        />
        <Route
          path={OnboardingRoutes.createPasswordForCard}
          component={CreatePasswordForCard}
        />
        <Route
          path={OnboardingRoutes.confirmPasswordForCard}
          component={ConfirmPasswordForCard}
        />
        <Route
          path={OnboardingRoutes.invalidDataForCard}
          component={InvalidDataForCard}
        />
        <Route
          path={OnboardingRoutes.enterBirthdayForCard}
          component={EnterBirthDateForCard}
        />
        <Route
          path={AuthenticationRoutes.recoverPassword}
          component={RecoverPassword}
        />
        <Route path={OnboardingRoutes.landingPage} component={LandingPage} />
        <Route
          exact
          path={AuthenticationRoutes.confirmRecoverPwd}
          component={ConfirmRecoverPwd}
        />

        {/* #### QRCODE-TRANSFER ROUTES ##### */}
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.qrCodeTransfer}
          component={QrCodeTransfer}
        />
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.generateQrCodeTransfer}
          component={GenerateQrCodeTransfer}
        />
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.viewQrCodeTransfer}
          component={ShowQrCodeTransfer}
        />
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.readQrCodeTransfer}
          component={ReadQrCodeTransfer}
        />
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.sendQrCodeTransfer}
          component={QrCodeTransferSendingDetails}
        />
        <ProtectedRoute
          exact
          path={QrCodeTransferRoutes.completedTransfer}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={SchedulePayments.ScheduleTransactions}
          component={ScheduleTransactions}
        />
        <ProtectedRoute
          exact
          path={SchedulePayments.FutureTransactions}
          component={FutureTransactions}
        />
        <ProtectedRoute
          exact
          path={SchedulePayments.ScheduleTransactionsList}
          component={ScheduleTransactionsList}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.smsTransferNumber}
          component={SmsTransferNumber}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.smsTransferValue}
          component={SmsTransferValue}
        />
        <ProtectedRoute
          exact
          path={SchedulePayments.ScheduleTransactionsList}
          component={ScheduleTransactionsList}
        />
        <ProtectedRoute
          exact
          path={SchedulePayments.SheduleTransactionsFilter}
          component={SheduleTransactionsFilter}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.smsTransferSummary}
          component={SmsTransferSummary}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.completedSmsTransfer}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.SmsAccountsExibition}
          component={SmsAccountsExibition}
        />
        <ProtectedRoute
          exact
          path={SmsTransferRoutes.SmsTransferName}
          component={SmsTransferName}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.home}
          component={UserInformation}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changeEmail}
          component={ChangeEmail}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changePhone}
          component={ChangePhone}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changeChangeNickname}
          component={ChangeNickname}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changeEmail}
          component={ChangeEmail}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changePassword}
          component={ChangePassword}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.chooseNewPassword}
          component={ChooseNewPassword}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.confirmNewPassword}
          component={ConfirmNewPasswordUserInformation}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.currentAddress}
          component={CurrentAddress}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changeAddress}
          component={ChangeAddress}
        />
        <ProtectedRoute
          exact
          path={UserRoutes.changeConclude}
          component={ChangeConclude}
        />
        <Route path={OnboardingRoutes.accountActivationCompletedForCard}>
          <AccountActivationCompletedForCard activeTwoButtons={true} />
        </Route>
        <Route path={AuthenticationRoutes.signIn} component={SignIn} />
        <Route path={AuthenticationRoutes.signOut} component={SignOut} />
        <ProtectedRoute
          path={AuthenticationRoutes.temporaryPassword}
          component={TemporaryPassword}
        />
        <ProtectedRoute
          path={AuthenticationRoutes.changePasswordFirstAccess}
          component={ChangePasswordFirstAccess}
        />
        <ProtectedRoute
          path={AuthenticationRoutes.confirmPasswordFirstAccess}
          component={ConfirmPasswordFirstAccess}
        />
        <ProtectedRoute
          path={AuthenticationRoutes.changePasswordCompleted}
          component={ChangePasswordCompleted}
        />

        <ProtectedRoute
          exact
          path={AccountRoutes.filter}
          component={BankStatementFilter}
        />
        <ProtectedRoute exact path={AccountRoutes.detail} component={Details} />

        <ProtectedRoute exact path={AccountRoutes.home} component={Home} />
        
        <ProtectedRoute
          exact
          path={AccountRoutes.bankStatement}
          component={BankStatement}
        />
        <ProtectedRoute
          exact
          path={AccountRoutes.settings}
          component={AccountSettings}
        />
        <ProtectedRoute exact path={AccountRoutes.help} component={Help} />
        <ProtectedRoute
          exact
          path={PaymentRoutes.barcodeScanner}
          component={ScanBarcode}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.details}
          component={PaymentData}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.changeValue}
          component={ChangeValue}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.paymentProcess}
          component={PaymentProcess}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.paymentEmptyDescription}
          component={PaymentDescription}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.completedPayment}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.paymentReceipt}
          component={PaymentReceipt}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.paymentAttach}
          component={PaymentAttach}
        />

        <ProtectedRoute
          exact
          path={PaymentRoutes.summary}
          component={PaymentSummary}
        />
        <ProtectedRoute
          exact
          path={AccountRoutes.allAccounts}
          component={AllAccounts}
        />
        <ProtectedRoute
          exact
          path={AccountRoutes.receipt}
          component={Receipt}
        />
        <ProtectedRoute exact path={AccountRoutes.detail} component={Details} />
        <ProtectedRoute
          exact
          path={AccountRoutes.editAccount}
          component={EditAccount}
        />
        <ProtectedRoute
          exact
          path={PaymentRoutes.barcodePayment}
          component={PaymentHome}
        />
        <ProtectedRoute exact path={AccountRoutes.home} component={Home} />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.favoredIdentification}
          component={FavoredIdentification}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.favoredName}
          component={FavoredName}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.selectBank}
          component={SelectBank}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.selectAccountType}
          component={SelectAccountType}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.bankBranch}
          component={BankBranch}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.accountNumber}
          component={AccountNumber}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.attachDocuments}
          component={AttachDocuments}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.processTransfer}
          component={TransferProcess}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.favoredAccountSelection}
          component={FavoredAccountSelection}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.schedule}
          component={ScheduleTransfer}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.summary}
          component={Summary}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.description}
          component={TransferDescription}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.voucherTransfer}
          component={TransferReceipt}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.value}
          component={TransferValue}
        />
        <ProtectedRoute
          exact
          path={TransferenceRoutes.transference}
          component={Transference}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.cardManagement}
          component={CardManagement}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.cardOption}
          component={CardOption}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.enterCurrentPassword}
          component={EnterCurrentPassword}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.enterNewPassword}
          component={EnterNewPassword}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.confirmNewPassword}
          component={ConfirmNewPassword}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.cancel}
          component={CancellationReplacementCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.cancelReason}
          component={CancelReason}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.cancelWarning}
          component={CancelCardAlert}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.reissueReason}
          component={BlockingReason}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.reissueWarning}
          component={BlockCardAlert}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.address}
          component={AddressConfirmation}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.reissueDetails}
          component={ReplacementDetails}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.updateAddress}
          component={UpdateAddress}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateNewCard}
          component={AssociateNewCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.activeFourDigits}
          component={AssociateFourDigits}
        />
        <ProtectedRoute
          path={CardRoutes.invalidDataForCard}
          component={InvalidDataForAssociateCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateNewCardCheck}
          component={AssociateNewCardCheckData}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateMotherNameCard}
          component={AssociateMotherNameCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateNationalityCard}
          component={AssociateNationalityCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateNameUserCard}
          component={AssociateNameUserCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateBirthDateCard}
          component={AssociateBirthDateCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateGenderUserCard}
          component={AssociateGenderUserCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.associateMaritalStatusCard}
          component={AssociateMaritalStatusCard}
        />

        <ProtectedRoute
          exact
          path={CardRoutes.concludeAssociateCard}
          component={ConcludeAssociateCard}
        />

        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.otherPayment}
          component={TaxPaymentHome}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarj}
          component={PaymentDarj}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjType}
          component={PaymentDarjType}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjCodeNumber}
          component={PaymentDarjCodeNumber}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjValues}
          component={PaymentDarjValues}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjDueDate}
          component={PaymentDarjDueDate}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjDescription}
          component={PaymentDarjDescription}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjSummary}
          component={PaymentDarjSummary}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentDarjConclude}
          component={ConclusionFlow}
        />

        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGare}
          component={PaymentGare}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareType}
          component={PaymentGareDateType}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareCodeNumber}
          component={PaymentGareCodeNumber}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareValues}
          component={PaymentGareValues}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareDueDate}
          component={PaymentGareDueDate}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareDescription}
          component={PaymentGareDescription}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareSummary}
          component={PaymentGareSummary}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentGareConclude}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgts}
          component={PaymentFgts}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsBarCode}
          component={PaymentFgtsBarCode}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsCodeRevenue}
          component={PaymentFgtsCodeRevenue}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsValues}
          component={PaymentFgtsValues}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsIdentifier}
          component={PaymentFgtsIdentifier}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsDate}
          component={PaymentFgtsDate}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsDescription}
          component={PaymentFgtsDescription}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsSummary}
          component={PaymentFgtsSummary}
        />
        <ProtectedRoute
          exact
          path={TaxPaymentRoutes.paymentFgtsConclude}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.topUpSchedule}
          component={TopUpSchedule}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.topUpNumber}
          component={TopUpNumber}
        />
        <ProtectedRoute exact path={TopUpRoutes.topUp} component={TopUp} />
        <ProtectedRoute
          exact
          path={TopUpRoutes.periodicRepetition}
          component={PeriodicRepetition}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.completeTopUp}
          component={CompleteTopUp}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.checkDataTopUp}
          component={CheckDataTopUp}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.topUpValue}
          component={TopUpValue}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.concludeTopUp}
          component={ConclusionFlow}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.activateCard}
          component={ActivateCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.activateCardConclude}
          component={ActivateCardConclude}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.passwordCard}
          component={PasswordCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.confirmPasswordCard}
          component={ConfirmPasswordCard}
        />
        <ProtectedRoute
          exact
          path={CardRoutes.confirmationActivate}
          component={ConfirmationActivate}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalStart}
          component={DigitalWithdrawalStart}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.selectValue}
          component={SelectValue}
        />
        <ProtectedRoute
          path={DigitalWithdrawalRoutes.moneyCount}
          component={MoneyCount}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalSuccess}
          component={DigitalWithdrawalSuccess}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawReceipt}
          component={DigitalWithdrawalReceipt}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.digitalWithdrawalSummary}
          component={DigitalWithdrawalSummary}
        />
        <ProtectedRoute
          exact
          path={DigitalWithdrawalRoutes.readQrCodeDigitalWithdrawal}
          component={ReadQrCodeDigitalWithdrawal}
        />
        <ProtectedRoute
          exact
          path={TopUpRoutes.cancelPeriodicTopUp}
          component={CancelPeriodicRepetition}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.firstAccess}
          component={FirstAccess}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.pixArea}
          component={WithFirstAccessControl(PixArea, PixRoutes.firstAccess)}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.firstAccessMyKeys}
          component={FirstAccessPixKeyList}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.pixKeyList}
          component={WithFirstAccessControl(
            PixKeyList,
            PixRoutes.firstAccessMyKeys,
          )}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.confirmEmailPixKeyToken}
          component={ConfirmEmailPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.confirmPhoneNumberPixKeyToken}
          component={ConfirmPhoneNumberPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.createTaxIdPixKey}
          component={CreateTaxIdPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.createEmailPixKey}
          component={CreateEmailPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.createPhoneNumberPixKey}
          component={CreatePhoneNumberPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.createRandomPixKey}
          component={CreateRandomPixKey}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.pixTransferHome}
          component={PixTransferHome}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.keyPixTransfer}
          component={KeyPixTransfer}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.keyPixTransferPayeeInfo}
          component={KeyPixTransferPayeeInfo}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.keyPixTransferValue}
          component={KeyPixTransferValue}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.keyPixTransferDescription}
          component={KeyPixTransferDescription}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.keyPixTransferSummary}
          component={KeyPixTransferSummary}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.pixTransferProcess}
          component={PixTransferProcess}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferPayeeName}
          component={BankPixTransferPayeeName}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferPayeeTaxId}
          component={BankPixTransferPayeeTaxId}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferSelectBank}
          component={BankPixTransferSelectBank}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferAccountType}
          component={BankPixTransferAccountType}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankDataPixTransferBranch}
          component={BankDataPixTransferBranch}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankDataPixTransferAccount}
          component={BankDataPixTransferAccount}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferValue}
          component={BankPixTransferValue}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferDescription}
          component={BankPixTransferDescription}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.bankPixTransferSummary}
          component={BankPixTransferSummary}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.qrCodePixTransferScanner}
          component={QrCodePixTransferScanner}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.qrCodePixTransferValue}
          component={QrCodePixTransferValue}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.qrCodePixTransferDescription}
          component={QrCodePixTransferDescription}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.qrCodePixTransferSummary}
          component={QrCodePixTransferSummary}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.receivePixTransferQrCode}
          component={ReceivePixTransferQrCode}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.receivePixTransferQrCodeValue}
          component={ReceivePixTransferQrCodeValue}
        />
        <ProtectedRoute
          exact
          path={PixRoutes.receivePixTransferQrCodeCheck}
          component={ReceivePixTransferQrCodeCheck}
        />
      </Switch>
    </BrowserRouter>
  )
}
