# Address Provider

## Quick start

### Hadrhat (Smart contract deployment)
The first things you need to do are installing its dependencies:

```sh
yarn
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, we can compile the smart contract:

```sh
npx hardhat compile
```

Or, on a new terminal, go to the repository's root folder and run this to
compile and deploy your contract:

```sh
yarn contract:deploy
```

### Frontend and Backend (Optional)
We can compile the frontend with:

```sh
yarn build:production
```

If we want to compile it in development mode, run
```sh
yarn dev
```
Or, If we want to run frontend and backend at the same time, run
```sh
yarn run build --watch
```
Then, open another terminal, and run 
```sh
yarn run serve
```
to run the server

---
### Operation
Open [http://localhost:5000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

### Common problems
1. Metamask transaction nonce not match

    [Solution](https://blog.chronologic.network/how-to-change-and-reset-your-nonce-in-metamask-f7ca52f480e5): Open metamask -> click icon on top right -> settings -> advanced, then click "reset account". 


## Test
We can test the smart contract by running
```sh
npx hardhat test
```


## Run database
```sh
docker-compose up --build
```
This command will run postgres and pg-admin in docker containers.
### pg-admin 
pg-admin is a GUI that can help developer to manage database.

After running `docker-compose`, enter `localhost:5050` to operate on pg-admin.

Then, use the username and password specified in docker-compose file to login.

After that, create a server and enter `host`, `database name`, `db user`, and `db password`.

[Reference](https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5)