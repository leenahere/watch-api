# Watch Online Shop API

Simple API built with [nest.js](https://nestjs.com/), [GraphQL](https://graphql.org/), [TypeORM](https://github.com/typeorm/typeorm) and PostgreSQL for showcasing operations of watch online shop.

The project contains four modules to showcase a simple checkout action:

- watch
- discount
- user
- cart

Considering that the API would be consumed by a *"dumb"* client, the backend holds the stage of a user's cart. So instead of creating an endpoint that calculates a total cost of a list of watches the client can access and update the cart's state through the respective endpoints. To obtain the total of a user's cart the following query can be used:

```graphql
query {
  cart(id: 'cart-id') {
    total
  }
}
```

To add items to a user's cart and obtain the updated total of the cart, the client can use the following mutation:

```graphql
mutation {
  addCardItem(id: 'card-id', newItem: 'watch-id') {
    total
  }
}
```

## Run

To run the API a `docker-compose` is provided. First create a `.env` file, add the vars from `.env.example` and source the .env file locally for the PostgreSQL service:

```bash
source .env
```

The run the following command to fire up the API and a PostgreSQL:

```bash
docker-compose up
```

The GraphQL playground can be accessed on [http://localhost:3000/graphql](http://localhost:3000/graphql).

To seed the db run the seed query in the playground:

```graphql
query {
  seed
}
```

This will create all necessary items to test out all endpoints. The seeded data can be found in `seed.resolver.ts`.

## Tests

For tests the Jest test framework is used. Before running build, tests are automatically run when building the docker image.

Tests can be run locally with the following command:

```bash
npm run test
```

As of now only the `cart.service.spec.ts` tests are implemented and the endpoint for creating a new cart item considered to contain the vital business logic is tested. Tests for the other services would be written in the same manner.

