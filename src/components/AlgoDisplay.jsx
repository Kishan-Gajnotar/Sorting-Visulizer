import React, { useEffect } from "react";
import { SortManager } from "./visualizer/SortManager"

const flexCenter = {
  display: "flex",
  justifyContent: "center"
};

export function AlgoDisplay(props) {
  let algorithm = props.algo.name
  let sortingArray = props.arr
  const algoIdx = props.algoIdx

  return (
    <div style={flexCenter}>
      <SortManager
        array={sortingArray}
        sortFunction={props.algo.component}
        sortingAlgorithmName={algorithm}
        algoIdx={algoIdx}
      />
    </div>
  );
}
