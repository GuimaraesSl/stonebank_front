import React from 'react'
import { Typography, FormControlLabel, Checkbox, Box } from '@material-ui/core'
import { useStyles } from './TermsText.style'

interface TermsTextProps {
  termsAcceptCheckBox: (event: any) => void
  valueCheckBox: boolean
}

export const TermsText = ({
  valueCheckBox,
  termsAcceptCheckBox,
}: TermsTextProps) => {
  const styles = useStyles()

  return (
    <Box
      className={styles.wrapper}
      flexDirection={'column'}
      alignItems="center"
    >
      <Box>
        <Typography
          data-test-id="terms"
          variant="caption"
          className={styles.text}
        >
          {terms}
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            data-test-id="checkbox"
            checked={valueCheckBox}
            onChange={termsAcceptCheckBox}
            name="check"
            color="primary"
          />
        }
        label="Concordo com os termos"
      />
    </Box>
  )
}

const terms = `Pelo presente Termo de Adesão, o Titular, devidamente identificado conforme descrito neste instrumento, ao realizar e enviar seu cadastro para abertura da Conta de Pagamentos, por meio eletrônico, adere, aceita e se obriga, de forma expressa e irrevogável a observar e submeter-se os termos e condições deste instrumento relativos ao uso da Conta de Pagamentos e da Plataforma Fitbank.

DEFINIÇÕES:

Partes: são as partes deste termo de adesão, a saber, de um lado:

A) FITBANK PAGAMENTOS ELETRÔNICOS S.A., inscrito no CNPJ/ME sob o nº 13.203.354/0001-85 e registrada na Junta Comercial do Estado de São Paulo sob o nº. 35.300.543.467, com endereço na Av. Cidade Jardim, 400, 20º andar, conjunto 206 – Jardim Paulistano, São Paulo – SP, CEP 01454-901, representada de acordo com seus atos constitutivos, doravante denominada simplesmente por “Fitbank”; e de outro lado

B) Titular, a pessoa, natural ou jurídica cujo pedido de abertura de uma Conta de Pagamento tenha sido devidamente aprovada pelo Fitbank com base em seus critérios e procedimentos próprios de checagem e autorização, em nome de quem o Conta é emitido; e

Cartão: o Cartão físico de emissão do Fitbank que representa um meio de pagamento eletrônico pré-pago de uso pessoal e intransferível, que habilita o seu titular a, observadas as funcionalidades disponíveis, o limite de recursos disponíveis e os Termos de Uso em vigor: (i) realizar pagamentos por compras ou despesas na rede credenciada de aceitação Elo; (ii) realizar saques na rede credenciada ao arranjo Fitbank/Elo;

Conta de Pagamentos: Conta de Pagamentos de livre movimentação aprovada e aberta no Fitbank em nome do Titular, mantida conforme regulamentação da Lei 12.865/2013 e Resoluções e Circulares do Conselho Monetário Nacional e Banco Central do Brasil (“BCB”), aplicáveis às Instituições de Pagamento e arranjos de pagamentos que integram o Sistema da Pagamento Brasileiro (SPB); e

Parceiros: São as empresas vinculadas ao Fitbank, afiliadas ou não, cuja atuação é necessária à prestação dos serviços ora contratadas junto ao Fitbank;

Plataforma Fitbank: significa a plataforma de tecnologia de propriedade e operação do Fitbank utilizada para a prestação dos serviços aqui previstos.
I. OBJETO

1.1 O presente Termo tem por objeto regular a prestação de serviços de gestão de cobranças e pagamentos, bem como a abertura e administração de Contas de Pagamento participantes do arranjo Fitbank (“Serviços”).

II. OBRIGAÇÕES E DECLARAÇÕES DO TITULAR

II.1 Ao enviar o seu cadastro para abertura da Conta, o Titular, declara expressamente que:

(i) ter lido e aceito integralmente e sem reservas todas as cláusulas do presente Termo, do Código de Ética, Conduta e Integridade e das políticas de compliance, Prevenção à Lavagem de Dinheiro - PLDFT e Conheça seu Cliente - know-your-customer (KYC) do Fitbank disponíveis na URL do Fitbank (www.fitbank.com.br) (“Políticas Fitbank”);

(ii) Todas as informações fornecidas por meio da Plataforma Fitbank são verdadeiras, corretas e completas;

(iii) Não estar em violação a qualquer legislação de prevenção à lavagem de dinheiro e financiamento ao terrorismo, ao Código de Ética, Conduta e Integridade e às Políticas Fitbank, em especial a política de Prevenção à Lavagem de Dinheiro – PLDFT; 

(iv) Não estar incurso ou incluso em qualquer lista restritiva de operações financeiras, quer seja do BCB, COAF, OFAC, Nações Unidas ou de outros órgãos ou autoridades afins, domésticos ou internacionais, ou ainda com qualquer tipo de restrição por instituições financeiras com quem o Fitbank opere;

(v) Concordar e anuir expressamente com a obtenção e utilização de dados pessoais do Titular pelo Fitbank e/ou por seus Parceiros para os fins exclusivos de prestação dos serviços ora contratados pelo Titular na medida que sejam necessários à correta ao uso da Plataforma Fitbank e dos serviços a ele relacionados, sempre de acordo com este instrumento e com os demais instrumentos e Políticas Fitbank, conforme previsto na Cláusula III abaixo; e

(vi) Concordar e anuir expressamente com as Regras de Conta de Pagamento presentes no ANEXO I deste Termo.

II.2 O Titular reconhece que, caso haja, a critério do Fitbank, suspeita de violação ou descumprimento de quaisquer cláusulas deste Termo, das Políticas Fitbank ou da legislação em vigor, o Fitbank poderá, a qualquer tempo, suspender ou cancelar o uso de sua Conta de Pagamentos, bem como de seu Cartão, sem que isso implique qualquer penalidade ou sanção ao Fitbank, pelo tempo necessário para as checagens e averiguações devidas e necessárias.

2.3.	O presente Termo é celebrado por prazo indeterminado, entrando em vigor na data de seu aceite pelo Fitbank.

III. TRATAMENTO DE DADOS E CONFIDENCIALIDADE

III.1 O Titular consente expressamente a guarda e tratamento de seus dados pessoais pelo Fitbank e seus prestadores de serviços, exclusivamente para os objetivos ligados à prestação dos Serviços, nos termos da Lei 13.709, de 14 de agosto de 2018, Lei Geral de Proteção de Dados - LGPD.

III.2 O Titular, o Fitbank e os Parceiros comprometem-se a manter em absoluto sigilo as informações a que venham a ter acesso em razão ou decorrência do presente Termo. 

III.3 O Titular desde já reconhece que o Fitbank poderá compartilhar informações confidenciais caso a revelação seja exigida por autoridade governamental ou ordem de tribunal competente, sob pena de ser caracterizada desobediência ou outra penalidade.

IV. DISPOSIÇÕES GERAIS

IV.1 O Fitbank não será responsabilizado caso os Serviços sejam interrompidos para: 

(i) Manutenções técnicas e/ou operacionais que exijam o desligamento temporário do sistema ou impossibilitem o acesso a ele;

(ii) Casos fortuitos e de força maior;

(iii) Ações e omissões de terceiros que impeçam a prestação dos serviços;

(iv) Interrupção ou suspensão da prestação dos serviços de telecomunicações; e

(v) Ocorrências de falhas no sistema de transmissão e/ou roteamento no acesso à Internet.

IV.2 O Fitbank poderá, a qualquer momento, revisar, confirmar e solicitar informações cadastrais adicionais do Titular para fins de atendimento da Circular 3.680 e da Resolução 96/2021 do BCB e das Políticas Fitbank. A falha na prestação de tais informações acarretará, a critério do Fitbank, a suspensão dos serviços ou a rescisão deste e de todos os demais contratos com o Titular, sem a aplicação de qualquer penalidade ao Fitbank, a qualquer tempo.

IV.3 Os termos e condições de uso da Conta de Pagamento e/ou da Plataforma Fitbank poderão ser alterados a qualquer momento pelo Fitbank e serão devidamente informados ao Titular e mantidos atualizados na URL www.fitbank.com.br. A utilização da Conta de Pagamento ou da Plataforma Fitbank após uma alteração implicará a expressa anuência do Titular aos novos termos e condições de uso em vigor.

IV.4 O presente Termo é regido pelas leis da República Federativa do Brasil. 

IV.5 Fica eleito o foro da Comarca de São Paulo – SP para serem dirimidas quaisquer controvérsias relacionadas com a execução do presente Termo, com expressa exclusão de qualquer outro, por mais privilegiado que seja.

Este Termo de Adesão aos Termos de Uso foi registrado perante o ____º Cartório de Títulos e documentos sob o nº _______________, para todos os fins de direito.


Fitbank Pagamentos Eletrônicos S.A.


ANEXO I – Regras da Conta de Pagamento 


Ao celebrar este Termo, o Titular concorda com a abertura de uma Conta de Pagamento individual e exclusiva, de sua exclusiva titularidade, a qual poderá ser movimentada por meio das funcionalidades disponibilizadas pelo Fitbank.

1.1 O carregamento da Conta de Pagamento se dará por um dos meios disponibilizados pelo Fitbank, de livre escolha do Titular, dentre os quais:  

(i) Pagamento de boleto bancário, pelo Titular ou terceiros em seu favor, com identificação única que permita o carregamento do valor pago na Conta de Pagamento;

(ii) Transferência bancária realizada pelo Titular ou terceiros em seu favor, mediante operações de TEF, DOC ou TED;

(iii) Recebimento por meio de transferências realizadas por outros usuários ou por outros meios de pagamento disponíveis; e

(iv) Recebimento de recursos por meio de pagamentos instantâneos realizados no âmbito do Pix.

2.1 O Fitbank poderá, a qualquer momento, acrescentar, restringir ou excluir as formas de carregamento disponíveis.

3.1 Com o carregamento da Conta de Pagamento, por uma das modalidades permitidas, os recursos estarão disponíveis em até 01 (um) dia útil; sendo possível ao Titular, a partir de então, realizar as transações por meio das funcionalidades.

4.1 Os recursos depositados na Conta de Pagamento poderão ser utilizados para pagamento das tarifas acordadas e transferência ou resgate, por um dos meios disponíveis, dentre os quais: 

(i) Realização de transações de transferência para a Conta de Pagamento de outros usuários;

(ii) Pagamento de boletos bancários e contas de consumo;

(iii) Realização de recargas de serviços pré-pagos disponíveis;

(iv) Realização de saques em caixas eletrônicos;

(v) Resgate de recursos, mediante transferência para a conta bancária de titularidade do usuário; ou, caso disponível, para a conta bancária de terceiros que não se encontram cadastrados no Sistema; e

(vi) Pagamentos instantâneos realizados no âmbito do Pix.
5.1 A transferência dos recursos entre Contas de Pagamento no âmbito do Fitbank será realizada no mesmo dia da realização da transação.

6.1 O resgate de recursos e ordens de pagamento serão realizados em até 01 (um) dia útil, contados da realização da transação.

7.1 As transações realizadas por meio das funcionalidades deixarão de ser acatadas pelo Fitbank quando: (i) não houver recursos suficientes na Conta de Pagamento; (ii) o Titular deixar de fornecer as informações suficientes ou fornecer informações incorretas para realização da transação; e/ou (iii) houver indícios de fraude ou suspeita ou ato ilícito, de acordo com os termos previstos neste Termo e na legislação vigente.

8.1 Os recursos creditados na Conta de Pagamento do Titular serão custodiados pelo Fitbank seguindo ao previsto na regulamentação do BCB, especialmente no que se relaciona às regras relativas ao risco de liquidez, e, nos termos do art. 12 da Lei 12.865/2013, (i) constituem patrimônio separado, que não se confunde com o patrimônio do Fitbank; (ii) não respondem direta ou indiretamente por nenhuma obrigação do Fitbank, nem podem ser objeto de arresto, sequestro, busca e apreensão ou qualquer outro ato de constrição judicial em função de débitos de responsabilidade da Instituição de Pagamento; (iii) não podem ser dados em garantia de débitos assumidos pela Instituição de Pagamento; e (iv) não compõem o ativo da Instituição de Pagamento, para efeito de falência ou liquidação judicial ou extrajudicial.

9.1 Os recursos mantidos na Conta de Pagamento, salvo se expressamente pactuado de modo diverso, não sofrerão qualquer tipo de acréscimo ou alteração, tais como correção monetária e juros; e nem haverá o pagamento de qualquer remuneração ao Titular, independentemente do período que ficarem depositados.

10.1 O Titular terá acesso às transações realizadas ou pendentes de pagamento pelo acesso ao extrato de sua Conta de Pagamento, podendo visualizar o saldo e histórico das movimentações. A disponibilização do saldo e do extrato das movimentações caracteriza-se como prestação de contas, para todos os fins legais.
11.1 Será disponibilizado o acesso às transações realizadas nos últimos 24 (vinte e quatro) meses, cabendo ao usuário o controle e arquivo, inclusive com a possibilidade de impressão do extrato disponibilizado.

Hipóteses de Retenção e Compensação de Recursos

12.1 O Titular concorda que o Fitbank, em determinadas situações e em conformidade com as disposições deste Termo, terá o direito de reter os valores mantidos na Conta de Pagamento do Titular para garantir, de forma integral, quaisquer pagamentos que sejam devidos ou para o resguardo contra riscos financeiros relacionados às obrigações do Titular diretamente relacionados ao uso da Conta de Pagamento.

13.1 Será realizada a retenção dos valores, existentes ou futuros, mantidos na Conta de Pagamento do Titular, nas seguintes hipóteses:

(i) Quando se verificar um alto nível de risco operacional ou de suspeita de fraude, conforme avalição escrita e fundamentada da área de risco do Fitbank;

(ii) Para cumprimento de ordens judiciais ou administrativas; ou

(iii) Para o pagamento de tarifas e despesas relacionados as transações realizadas pelo Titular.

Resgate de Recursos e Encerramento da Conta de Pagamento

14.1 O Titular poderá, a qualquer momento, desde que possua saldo suficiente para arcar com a tarifa de saque, as tarifas bancárias aplicáveis e o pagamento de eventuais débitos contraídos em razão deste Termo, efetuar o resgate integral dos recursos mantidos na Conta de Pagamento, bem como encerrá-la, mediante solicitação ao Fitbank.

15.1 O resgate de recursos será realizado a pedido do Titular, mediante o repasse do valor líquido e em moeda nacional, de acordo com as formas estabelecidas para utilização dos recursos mantidos em Conta de Pagamento.

16.1 O Fitbank procederá o encerramento, em até 3 dias úteis do pedido, retendo saldo suficiente para honrar as despesas já contraídas até o efetivo cancelamento da conta.`
