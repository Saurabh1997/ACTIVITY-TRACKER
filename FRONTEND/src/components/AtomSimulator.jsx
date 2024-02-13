import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countAtom, evenSelector } from "store/atoms/userAtom";

export default function AtomSimulator() {
  const [count, setCount] = useRecoilState(countAtom);
  const isEven = useRecoilValue(evenSelector);
  return (
    <div>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>Click here</button>
      {isEven ? "This is an Even Number" : null}
    </div>
  );
}
