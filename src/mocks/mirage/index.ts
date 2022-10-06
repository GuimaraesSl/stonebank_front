import { createServer, Model, Factory, Response } from "miragejs"

export function makeServer({
  environment = "test"
}) {
  return createServer({
    environment,

    // factories: {
    //   account: Factory.extend<Partial<Account>>({
    //     id() {
    //       return faker.random.numeric(10)
    //     },
    //     name() {
    //       return faker.name.fullName()
    //     }
    //   })
    // },

    // models: {
    //   account: Model.extend<Partial<Account>>({}),
    // },

    routes() {
      // this.namespace = "";

      this.get("accounts")

      this.get('/auth', async (schema, request) => {
        return new Response(
          200,
          { 'x-application-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiIxMjMiLCJub25jZSI6ImNmZGUwYjA5LWQwNjYtNGE2Ny04ZTRjLTJjMTkxNWE3N2NhOCIsInJvbGUiOiJkZWZhdWx0IiwibmJmIjoxNjYzNTUwNzU2LCJleHAiOjE2NjM1NTA3NTcsImlhdCI6MTY2MzU1MDc1Nn0.9u5-VZEg9IQr_0xWD0XcyneYiAdNDmHQUM22OIZMTQs' }
        )
      })

      this.post('/Auth/Login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return new Response(
          200,
          {},
          {
            data: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmllbCIsImlhdCI6MTY1NjMzOTAyMiwiZXhwIjoiMTY2NDk0NDk3OTcxMCJ9.Y2GbGIzfMbPa7yqyKXceQDwMaS7XJE22qg6QwOabZ98',
              userId: "123456",
              taxId: attrs['login'].replace(/\D/g, ""),
              name: "Daniel",
              mail: "danielvitor@gmail.com",
              phoneNumber: "123331234",
              zipCode: "12345-43",
              street: "Rua X",
              number: "123",
              district: "Centro",
              complement: "",
              city: "Quixadá",
              state: "Ceará",
              reference: "",
              country: "Brasil",
              isFirstAccess: false,
              acceptedTerms: true,
              tokenAccess: "1234",
              accountId: "123456"
            }
          }
        )
      })

      this.post('/Account/FindAccountDashboard', (schema, request) => {

        return new Response(
          200,
          {},
          {}
        )
      })
    },

    // seeds(server) {
    //   server.createList("account", 20)
    // }
  })
}