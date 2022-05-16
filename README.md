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

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
yarn run contract:deploy
```
### Frontend and Backend (Optional)
Finally, we can run the frontend with:

```sh
yarn run dev
```

Or, If we want to run frontend and backend at the same time, run
```sh
yarn run build --watch
```
Then, open another terminal, and run 
```sh
yarn run serve
```

---
### Operation
Open [http://localhost:5000/](http://localhost:3000/) to see your Dapp. You will
need to have [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## Test
We can test the smart contract by running
```sh
npx hardhat test
```