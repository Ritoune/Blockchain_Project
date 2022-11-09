import { useEffect, useState } from 'react';
import './App.css';
import TxList from "./TxList";
import abi from './contracts/ABI.json';
import { ethers } from 'ethers';

const contractAddress = "0x298DB519bd228833845c9DEC697EAb8CeE67BFad";

function App() {
  
  const [txs, setText] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState();
  const [contractInformation, setContractInformtion] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  });
  const [balanceInformation, setBalanceInfomartion] = useState({
    address: "-",
    balance: "-"
  });

  useEffect(() => {
    if (contractInformation.address !== "-") {
      //Intégration de l'ABI du smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractInformation.address,
        abi,
        provider
      );

      //Récupération de l'interaction de transfert de tokens depuis l'ABI
      erc20.on("Transfer", (from, to, amount, event) => {

        console.log({ from, to, amount, event });

        setText((currentText) => [
          ...currentText,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount)
          }
        ]);
      });

      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInformation.address]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract(data.get("addr"), abi, provider);

    //Récupération des informatiosn du token
    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    setContractInformtion({

      address: data.get("addr"),
      tokenName,
      tokenSymbol,
      totalSupply
    });
  };

  //Méthode de récupération du solde du wallet en token
  const getMyBalance = async () => {

    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    await newProvider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractInformation.address, abi, newProvider);
    const newSigner = await newProvider.getSigner();
    const newSignerAddress = await newSigner.getAddress();
    const newBalance = await erc20.balanceOf(newSignerAddress);

    setBalanceInfomartion({

      address: newSignerAddress,
      balance: String(newBalance)

    });
  };

  //Méthode de transfert de tokens
  const handleTransfer = async (e) => {
    e.preventDefault();

    const newData = new FormData(e.target);
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    await newProvider.send("eth_requestAccounts", []);
    const newSigner = await newProvider.getSigner();
    const erc20 = new ethers.Contract(contractInformation.address, abi, newSigner);
    await erc20.transfer(newData.get("recipient"), newData.get("amount"));
    
  };

  return (
    <div className="main-app bg-purple-200">

      <div>
        <form className="m-4" onSubmit={handleSubmit}>
          <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-gray-500">
            <div className="mt-4 p-4">
              <h1 className="text-xl font-semibold text-white text-center">
                Résumé du Smart Contract
              </h1>
                <div className="my-3">
                  <input
                    type="text"
                    name="addr"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="Adresse du contrat ERC20"
                  />
              </div>
            </div>

            <div className="p-4">
            <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full">
                OBTENIR DES INFORMATIONS SUR LE TOKEN
              </button>
            </div>

            <div className="px-4">
              <div className="table-container overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Symbole</th>
                      <th>Montant total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{contractInformation.tokenName}</th>

                      <td>{contractInformation.tokenSymbol}</td>

                      <td>{String(contractInformation.totalSupply)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4">
              <button
                onClick={getMyBalance}
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full">
                OBTENIR VOTRE SOLDE
              </button>
            </div>

            <div className="p-4">
              <div className=" table-container overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Adresse</th>
                      <th>Solde</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{balanceInformation.address}</th>
                      <td>{balanceInformation.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>

        </form>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div>
            <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-gray-500">
              <div className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-white text-center">
                  Envoyer des tokens
                </h1>

                <form onSubmit={handleTransfer}>
                  <div className="my-3">
                    <input
                      type="text"
                      name="recipient"
                      className="input input-bordered block w-full focus:ring focus:outline-none"
                      placeholder="Adresse du destinataire"
                    />
                  </div>

                  <div className="my-3">
                    <input
                      type="text"
                      name="amount"
                      className="input input-bordered block w-full focus:ring focus:outline-none"
                      placeholder="Montant à transférer"
                    />
                  </div>

                  <div className="p-4">
                    <button
                      type="submit"
                      className="btn btn-primary submit-button focus:ring focus:outline-none w-full">
                      Transférer
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>


          <div>
            <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-gray-500">
              <div className="mt-4 p-4">
                <h1 className="text-xl font-semibold text-white text-center">
                  Transactions récentes
                </h1>
                <p>
                  <TxList txs={txs} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
