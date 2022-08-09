import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Wallet from "./Wallet.js";
import Footer from './Footer.js';

function App({web3, accounts, contracts}) {
  
  const [tokens, setTokens] = useState([]);
  const [user, setUser] = useState({
    accounts: [],
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.methods.traderBalances(account, web3.utils.fromAscii(token.ticker)).call();
    const tokenWallet = await contracts[token.ticker].methods.balanceOf(account).call();
    return {tokenDex, tokenWallet};
  }

 

  const selectToken = token => {
    setUser({...user, selectedToken: token});
  }

  const deposit = async amount => {
    await contracts[user.selectedToken.ticker].methods.approve(contracts.dex.options.address, amount).send({from: user.accounts[0]});
    await contracts.dex.methods.deposit(amount, web3.utils.fromAscii(user.selectedToken.ticker)).send({from: user.accounts[0]});
    const balances = await getBalances(user.accounts[0], user.selectedToken);
    setUser(user => ({...user, balances}));
  }

  const withdraw = async amount => {
    await contracts.dex.methods.withdraw(amount, web3.utils.fromAscii(user.selectedToken.ticker)).send({from: user.accounts[0]});
    const balances = await getBalances(user.accounts[0], user.selectedToken);
    setUser(user => ({...user, balances}));
    
  }

  const listenToWalletFundEvent = () => {
    contracts.dex.events.WalletFund().on("data", async function(evt){
      console.log(evt.returnValues.balance);
      const balances = {
        tokenDex: evt.returnValues.balance,
        tokenWallet: user.balances.tokenWallet
      }
      setUser(user => ({...user, balances}));  
    });
  }

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.dex.methods.getTokens().call();
    
      const tokens = rawTokens.map(token => ({
        ...token, ticker: web3.utils.hexToUtf8(token.ticker)
      }));
      const balances = await getBalances(accounts[0], tokens[0]);
      console.log(tokens);
      setTokens(tokens);
      setUser({accounts, balances, selectedToken: tokens[0]});
      listenToWalletFundEvent();
    }

    init();
  }, []);

  if(typeof user.selectedToken === 'undefined'){
    return <div>Loading....</div>
  }
  return (
    <div id="app">
     <div>
       <Header contracts={contracts} selectToken={selectToken} tokens={tokens} user={user} />
      </div>
      <div>
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-4 first-col">
              <Wallet user={user} withdraw={withdraw} deposit={deposit} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
