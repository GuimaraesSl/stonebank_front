export type Account = {
  id: string;
  name: string;
}

type AccountResponse = {
  accounts: Account[];
}

export const fetchAccount = (url: string) =>
  fetch(url).then<AccountResponse>((r) => r.json())