import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ArrayContainer } from "./ArrayContainer";
import { delay } from "../../common/config";
import Card from '@mui/material/Card';

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

export function SortManager({
  array,
  sortFunction,
  sortingAlgorithmName,
  algoIdx
}) {

  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  const sortedIndices = useRef([]);
  const comparisionCount = useRef(0);
  const swapCount = useRef(0);
  const algoArray = useRef([array]);
  const sortProgressIterator = useRef(null);
  const isAlgoExecutionOver = useRef(false);

  useEffect(() => {
    reset();
  }, [array, sortingAlgorithmName]);

  async function swap(i, j) {
    let tmp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = tmp;
    setSwapIndices([i, j]);
    swapCount.current += 1;
    await delay(700);
  }
  
  async function highlight(indices, p) {
    setSwapIndices([-1, -1]);
    comparisionCount.current += 1;
    setHightlightedIndices(indices);
    await delay(500);
  }

  function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }

  async function reset() {
    algoArray.current = array;
    sortedIndices.current = [];
    swapCount.current = 0;
    comparisionCount.current = 0;
    isAlgoExecutionOver.current = false;
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);

    sortProgressIterator.current = await sortFunction(algoArray.current, swap, highlight, markSort, algoIdx);
  }

  async function runAlgo() {
    let completion = { done: false };
    while (
      !completion?.done
    ) {
      completion = await sortProgressIterator.current?.next();
    }
    if (!isAlgoExecutionOver.current && completion?.done) {
      isAlgoExecutionOver.current = true;
      setSwapIndices([-1, -1]);
      setHightlightedIndices([-1, -1]);
    }
  }

  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      highlightIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );


  return (
    <>
      <Container>
        <AlgoHeaderBar>
          <strong>{sortingAlgorithmName}</strong>
          
          {/* <TimerDiv>
          <span>Time:</span>
          <strong>
            <Timer
              isAlgoExecutionOver={isAlgoExecutionOver.current}
            />
          </strong>
        </TimerDiv> */}
        </AlgoHeaderBar>
        {arrayContainer}
        <button onClick={runAlgo}> PLAY</button>
        {/* <InfoFooter
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
      ></InfoFooter> */}
      </Container>
    </>
  );
};
