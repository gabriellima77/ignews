## Iniciando com Next

- yarn create next-app nome-do-app;

## Instalando typescript

- yarn add typescript @types/react @types/node -D
- yarn dev - para fazer a configuração do typescript automática

## Usando Sass

- yarn sass - os arquivos são salvos como nomePágina.module.scss - O module no nome é para criar um escopo para o css, além disso as atribuições não são feitas diretamente em seletores de elemento (h1, body, span), são feitos apenas com classes e id, os seletores de elemento podem ser usado dentro de outros seletos - Ex: <br/>

```scss
.title {
  color: red;

  span {
    color: blue;
  }
}
```

## Iniciando com o stipe

- Criar uma conta no stripe, no caso agora eu já tenho uma, criar um projeto, configurar preções e para ficar mais bonitinho configurar uma marca.

- Pegar a api-key e copiar para um arquivo .env.local, nome da variável STRIPE_API_KEY

```unix
yarn add stripe
```

- Agora no arquivo stripe.ts na pasta services

```typescript
import Stripe from 'stripe';
import { version } from '../package.json';

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Ignews',
    version,
  },
});
```

## Next Auth

- Pasta auth e arquivo [...nextauth].ts

```unix
yarn add next-auth
```

## Usando o FaunaDB

- Criar um db no site do fauna, um índice para onde será guardado os dados.
- Adicionar a key do db no env.local

```unix
yarn add faunadb
```

- Adicionando um valor ao db, se não existir um valor igual
  Ex:

```javascript
// O callback foi feito dentro da função NextAuth, abaixo dos providers
callbacks: {
  async signIn({ user, account, profile }) {
    const { email } = user;
    try {
      await fauna.query(
        query.If(
          query.Not(
            query.Exists(
              query.Match(query.Index('user_by_email'), query.Casefold(email))
            )
          ),
          query.Create(query.Collection('users'), { data: { email } }),
          query.Get(
            query.Match(query.Index('user_by_email'), query.Casefold(email))
          )
        )
      );
      return true;
    } catch {
      return false;
    }
  },
```
## Testando Stripe localmente

- É necessário usar o stripe-cli, configurar uma rota no api, que irá receber os eventos

- Apois isso usar `./stripe listen --forward-to http://localhost:3000/api/webhooks`

## CMS (Content Management System)

