import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const contractAddress = "0x9292A450a96311ac2Ff4245958B5B2067AD4066b"; // 3web 홈페이지에서 확인
  const { contract } = useContract(contractAddress);

  // get
  const { data } = useContractRead(contract, "getCounter");
  const [counter, setCounter] = useState();

  async function getCounter() {
    if (!contract) return;
    setCounter(parseInt(data._hex));
  }

  // increment
  const { mutateAsync: incrementCounter } = useContractWrite(
    contract,
    "incrementCounter"
  );

  // decrement
  const { mutateAsync: decrementCounter } = useContractWrite(
    contract,
    "decrementCounter"
  );

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          <a href="https://thirdweb.com/">환영합니다</a>!
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/index.js</code>, then modify the{" "}
          <code className="code">src/App.js</code> file!
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{ side: "bottom", align: "center" }}
          />
        </div>

        <div>{parseInt(data)}</div>

        <br />
        <Web3Button contractAddress={contractAddress} action={getCounter}>
          새로고침
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={incrementCounter}>
          ++
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={decrementCounter}>
          --
        </Web3Button>
      </main>
    </div>
  );
}