export class User {
  constructor(
    public id?: number,
    public taxId?: string,
    public name?: string,
    public mail?: string,
    public phoneNumber?: string,
    public zipCode?: string,
    public street?: string,
    public number?: string,
    public district?: string,
    public complement?: string,
    public city?: string,
    public state?: string,
    public reference?: string,
    public country?: string,
    public isFirstAccess?: boolean,
    public acceptedTerms?: boolean,
    public tokenAccess?: string,
  ) {}
}
