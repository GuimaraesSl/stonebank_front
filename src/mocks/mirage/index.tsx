import { createServer, Model, Factory, Response } from "miragejs"
import { faker } from '@faker-js/faker'
import { Account } from "mocks/fetchers"

export function makeServer({
  environment = "test"
}) {
  return createServer({
    environment,

    factories: {
      account: Factory.extend<Partial<Account>>({
        id() {
          return faker.random.numeric(10)
        },
        name() {
          return faker.name.fullName()
        }
      })
    },

    models: {
      account: Model.extend<Partial<Account>>({}),
    },

    routes() {
      // this.namespace = "";

      this.get("accounts")

      this.get('/auth', (schema, request) => {
        return new Response(
          200,
          { 'x-application-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiIxMjMiLCJub25jZSI6ImNmZGUwYjA5LWQwNjYtNGE2Ny04ZTRjLTJjMTkxNWE3N2NhOCIsInJvbGUiOiJkZWZhdWx0IiwibmJmIjoxNjYzNTUwNzU2LCJleHAiOjE2NjM1NTA3NTcsImlhdCI6MTY2MzU1MDc1Nn0.9u5-VZEg9IQr_0xWD0XcyneYiAdNDmHQUM22OIZMTQs' }
        )
      })

      this.post('/Auth/Login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        // eslint-disable-next-line no-console
        console.log(attrs)

        return new Response(
          200,
          {},
          {
            data: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmllbCIsImlhdCI6MTY1NjMzOTAyMn0.3-4GAFg_ppyMP_hJRsEiqRqh1VOQiDDDc1461TZq220'
            }
          }
        )
      })
    },

    seeds(server) {
      server.createList("account", 20)
    }
  })
}