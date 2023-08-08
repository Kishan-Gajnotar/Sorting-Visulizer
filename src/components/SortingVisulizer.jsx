import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import { sortingAlgorithms } from '../common/config';
import React, { useState } from "react";
import { Controller } from './Controller';



const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        boxSizing: 'border-box',
        padding: '0 20px'
    },
    appBar: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export function SortingVisulizer() {

    const classes = useStyles();
    const [algorithm, setAlgorithm] = useState(0);

    return (
        <>
            <div className={classes.root}>
                <h2>Sorting Algorithms Visualizer</h2>
                <AppBar position="static" color="default">
                    <Tabs
                        value={algorithm}
                        onChange={(event, id) => setAlgorithm(id)}
                        justifyContent="center"
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {sortingAlgorithms.map((algorithm, index) => (
                            <Tab
                                key={algorithm.name}
                                label={algorithm.title}
                            />
                        ))}
                        <Tab key='AllSort' label="All" />
                    </Tabs>
                </AppBar>
                {algorithm !== 6 && algorithm !== 4 && algorithm !== 5
                    ?
                    (
                        <Controller algo={sortingAlgorithms[algorithm]} algorithm={algorithm} />
                    )
                    :
                    (
                        <p>This is Still in Implimentation Phase.</p>
                    )
                }
            </div>
        </>
    )
}