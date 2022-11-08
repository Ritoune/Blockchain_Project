export default function TxList({ txs }) {
    if (txs.length === 0) return null;
    return (
      <>
        {txs.map((item) => (
          <div key={item.txHash} className="alert-info mt-5 rounded-xl py-2 px-4">
            <div>
              <p>De: {item.from}</p>
              <p>A: {item.to}</p>
              <p>Montant: {item.amount}</p>
              <a href={`https://rinkeby.etherscan.io/tx/${item.txHash}`}>
                Détails sur Etherscan
              </a>
            </div>
          </div>
        ))}
      </>
    );
  }