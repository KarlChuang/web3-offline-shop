# WEB3 Offline $hop
## Introduction
A web3 offline shop that people can choose to be a seller and link their offline business on it or be a customer and buy their favorites as NFT online, exchange NFT to real asset offline in a safe, fast, and decentralized way.
## Quick start on local environment

### 1. Install dependency
The first things we need to do are installing its dependencies:
```
yarn install
```

### 2. Setting environment variables
Create a `.env` file in the root directory.

For example:
```
NETWORK_URL=http://127.0.0.1:8545
POSTGRES_URL=postgres://root:example@localhost:5432/postgres
```
### 3. Start local database
Run postgreSQL and pg-admin in docker containers.

By default, postgreSQL will be served on `localhost:5432`, and pg-admin will be served on `localhost:5050`. 

```
docker-compose up --build
```
To know more about pg-admin, see the [pg-admin](#pg-admin) section.

### 4. Start local blockchain
Run a local private blockchain, which will be served on `localhost:8545` by default. *(ChainId=31337)*
```
npx hardhat node
```
### 5. Compile contracts (Optional)
```
yarn contract:compile
```
This command compile contract to bytecode and [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#:~:text=The%20Contract%20Application%20Binary%20Interface,as%20described%20in%20this%20specification.). Frontend DApp need them to interact with contracts on blockchain.
```
yarn contract:deploy
```
deploy contract to local private blockchain
### 6. Start frontend server
```
yarn build --watch
```
### 7. Start backend server
```
yarn serve
```

---
## Operation
Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and switch Metamask network to
`localhost 8545`. Also, remember to set the `localhost` network chainID to `31337`.

### Common problems
1. Metamask transaction nonce not match

    [Solution](https://blog.chronologic.network/how-to-change-and-reset-your-nonce-in-metamask-f7ca52f480e5): Open metamask -> click icon on top right -> settings -> advanced, then click "reset account". 


## Test
We can test the smart contract by running
```sh
yarn test
```


## pg-admin 
pg-admin is a GUI that can help developer to manage database.

After running `docker-compose`, enter `localhost:5050` to operate on pg-admin.

Then, use the username and password specified in docker-compose file to login.

After that, create a server and enter `host`, `database name`, `db user`, and `db password`.

[Reference](https://towardsdatascience.com/how-to-run-postgresql-and-pgadmin-using-docker-3a6a8ae918b5)