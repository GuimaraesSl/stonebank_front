# StoneBank
Front-End da aplicação StoneBank baseada no OSB Mobile by FitBank.
Aplicação desenvolvida pela equipe NoSignal participante do CyberCamp 2022 by FitBank.

## Sobre o Projeto
Atualmente, é perceptível que aplicações de bancos são feitas incluindo minimamente recursos de acessibilidade e pouco se adequam às necessidades e especificidades de seus clientes. Funcionalidades como: transferências, PIX, recarga de celular são apresentadas de maneira muitas vezes poluidas, desorganizadas e nem um pouco personalizáveis pelo usuários. É tendo em vista essas dores que nasce o StoneBank, com a proposta de criar um banco feito não só para o usuário, mas também pelo o usuário.
Adicionando recursos de acessibilidade para pessoas com deficiência visual no App, visamos a inclusão desses usuários no mundo digital cada vez mais. Não somente, o StoneBank também tem a proposta de ser adaptável às necessidades dos usuários, permitindo que o usuário personalize desde de suas  funcionalidades mais utilizadas até a personalidade e design do app, deixando-o da forma que mais o agrade.

## Features lançadas e refatoramentos de código feitos até o **Demodey Ômega**
1. Front-end da tela welcome, de boas vindas da aplicação
    - **Rota:** '/'.
2. Front-end da tela de SignIn, de Login da aplicação
    - Foi adicionado um novo componente chamado "*GreatButton*" (`<GreatButton/>`) com a ideia de substituir tanto o LoginButton da tela de Login, quanto o Button da tela de Welcome. O objetivo é de deixar o código o mais limpo possível e ter componentes globais que fossem bem reutilizáveis tendo em vista o design definido nas entregas anteriores. Como é possível observar na Prototipação, o modelo de botão utilizado na tela Welcome é replicado em diversas partes do projeto;
    - Foi criado um Componente público para alocação da Logo do StoneBank (`<LogoBar/>`), para seu reaproveitamento futuro;
    - Foi modificado o Layout do componente `<PasswordField/>`;
    - Foi modificado o Layout do componente global `<TextField/>`;
    - **Rota:** '/signin'.
3. Front-end da tela de "TemporaryPassword", para aviso de necessidade de troca da senha temporária utilizada
    - Feito todo o front-end da tela além da troca das imagens .svg;
    - Implementado o "*GreatButton*" para subtituição do antigo botão;
    - **Rota:** '/temporary-password'.
4. Front-end da tela de "ChangePasswordFirstAcess", para a definição de uma nova senha no primeiro acesso
    - Feito todo o front-end da tela;
    - Retirado o uso do componente `<ProcessPageLayout/>` para criação de um Layout Próprio;
    - Novas modificações de design no componente `<TextField/>`;
    - Modificado o ícone Exclude.svg para confirmação de senha;
    - Modificado o componente `<ProcessDescriptionHeader/>` para seu reaproveitamento;
    - **Rota:** '/first-access/change-password'.
5. Front-end da tela de "ConfirmPasswordFirstAcess", para a confirmação da nova senha;
    - Feito todo o front-end da tela;
    - Retirado o uso do componente `<ProcessPageLayout/>` para criação de um Layout Próprio;
    - Trocado o uso do Button de confirmação para o `<GreatButton/>`;
    - **Rota:** '/first-access/confirm-password'.
6. Front-end da tela de "ChangePasswordCompleted";
    - Feito todo o front-end da tela;
    - Aproveitada a configuração de Layout da tela de "TeporaryPassword";
    - Retirado o padrão de contrução da tela por `<Box\>`
    - Modificado o componente `<AccessAccountButton\>` para receber o padrão de design `<GreatButton/>`
    - **Rota:** '/first-access/change-password-completed'.
7. Front-end da tela "RecoverPassword"
    - Feito todo o front-end da tela;
    - Retirado substituido o uso do componente `<PageContainer/>` por `<Container\>`;
    - Aproveitado a interface da tela "ChangePasswordFirstAcess";
    - Criado o arquivo de estilização do RecoverPassword: "RecoverPassword.style.ts";
    - **Rota:** '/recover-password'.
8. Front-end da tela "Home"
    - Foi feito o front-end da tela;
    - **Rota:** '/account/home'
