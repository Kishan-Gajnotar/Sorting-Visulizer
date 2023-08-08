import styled from "styled-components";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useState } from "react";
import { AlgoDisplay } from "./AlgoDisplay";

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;
const ArrayBar = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 1;
  min-width: 300px;
`;

export function Controller(props) {

    const [sortingArray, setSortingArray] = useState([9, 5, 14, 26, 8, 2, 12]);
    const [arrayInput, setArrayInput] = useState([sortingArray]);

    function generateRandomArray(size, min, max) {
        const tmpArray = [];
        for (let i = 0; i < size; i++) {
            tmpArray.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
        return tmpArray;
    }

    function handleGenerateArray() {
        const newArray = generateRandomArray(10, 1, 999); // Change the parameters as needed
        setArrayInput(newArray);
        setSortingArray(newArray);
    }

    function generate() {
        handleGenerateArray();
    }

    return (
        <div>
            <ControlBar>
                <ArrayBar>
                    <Button
                        variant="contained"
                        onClick={generate}
                    >
                        Generate
                    </Button>
                    <TextField
                        id="outlined-basic"
                        label="Input"
                        variant="outlined"
                        // onChange={(event) => arrayDataChangeHandler(event.target.value)}
                        value={arrayInput}
                        size="small"
                        width="100px"
                        style={{ flexGrow: 'inherit', margin: '0 10px' }}
                    />
                </ArrayBar>
            </ControlBar>
            <AlgoDisplay
                key={props.algo}
                algo={props.algo}
                arr={sortingArray}
                algoIdx={props.algorithm}
            />

        </div>
    )
}