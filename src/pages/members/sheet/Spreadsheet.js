import React, { useContext, useEffect, useRef, useState } from 'react'
import { Output } from './Output';
import ReactDataSheet from 'react-datasheet';
import { addRows, usePrevious } from '../../../utlis';
import axios from 'axios';
import { pushToCommandHistory, getCommandHistory, removeCommandHistory, solve } from '../../../services/services';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { Button, Chip, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SupportedToolsContext } from '../../../context/ToolsContext';

const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),

    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: 0,
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(1),
        },
    },
    paperView: {
        padding: theme.spacing(2)
    },
    controllsBar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: '100%',
    },
    chip: {
        margin: 2,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paperWelcome: {
        backgroundColor: '#e9edf8',
        padding: '15px'
    },
    coeffs: {
        backgroundColor: '#ef535033',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));

const ControllsBar = ({ onAdd, onClear, onDelete, onRun, onUndo, onRedo }) => {
    const classes = useStyles();
    return (
        <div className={classes.controllsBar}>
            <ButtonGroup size='small' color="primary" aria-label="outlined button group">
                <Button onClick={onRun}><PlayArrowSharpIcon style={{ color: 'green' }} /></Button>
                <Button onClick={onClear}>clear</Button>
                <Button onClick={onAdd}>add row</Button>
                <Button onClick={onUndo}><UndoIcon /></Button>
                <Button onClick={onRedo}><RedoIcon /></Button>
            </ButtonGroup>
            <IconButton onClick={onDelete} size='small'><CloseRoundedIcon /></IconButton>
        </div>
    )
}


const SelectSolution = ({ onChange, tools }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [solutions,] = useContext(SupportedToolsContext);

    const handleChange = (event) => {
        onChange(event.target.value)
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                minWidth: 250,
                maxWidth: 350,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Select tools</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={tools}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {solutions.map(({ name }) => (
                    <MenuItem key={name} value={name} style={getStyles(name, tools, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}


export const SpreadSheet = ({ pk, data, tools, outputs, onDeleteSpreadsheet, onChange }) => {
    const classes = useStyles();
    const [showOutput, setShowOutput] = useState(outputs.length > 0 ? true : false)
    const [position, setPosition] = useState(0)
    const [commandHistory, setCommandHistory] = useState([])

    const prevData = useRef([])

    useEffect(() => {
        prevData.current = getCommandHistory(pk)
    }, [data, position])

    useEffect(() => {
        return () => {
            removeCommandHistory(pk)
        }
    }, [])

    const executeCommand = (concreteCommand) => {
        setCommandHistory(prev => {
            prev.push(concreteCommand)
            return prev
        })
        setPosition(position + 1)
        concreteCommand.execute()
        pushToCommandHistory(pk, data)
    }

    const undo = () => {
        if (position > 0) {
            commandHistory[position - 1].undo()
            setPosition(prev => {
                return prev - 1
            })
        }
    }

    const redo = () => {
        if (position < commandHistory.length - 1) {
            setPosition(prev => {
                return prev + 1
            })
            commandHistory[position].redo();
        }
    }

    const cellChangedCommand = (changes, additions) => {
        let grid = [...data];
        return {
            execute() {
                changes.forEach(({ cell, row, col, value }) => {
                    grid[row][col] = { ...grid[row][col], value };
                });
                if (additions) {
                    additions.forEach(({ row, col, value }) => {
                        try {
                            grid[row][col] = { ...grid[row][col], value };
                        } catch {
                            grid = addRows(grid, 1, 0)
                            grid[row][col] = { ...grid[row][col], value };
                        }
                    });
                }
                onChange(grid, tools, outputs, pk)
            },
            undo() {
                grid = prevData.current[position]
                onChange(grid, tools, outputs, pk)
            },
            redo() {
                grid = prevData.current[position + 1]
                onChange(grid, tools, outputs, pk)
            }
        }
    }


    const handleClear = () => {
        onChange([[
            { readOnly: true, value: '' },
            { value: 'A', readOnly: true },
            { value: 'B', readOnly: true },
            { value: 'C', readOnly: true },
            { value: 'D', readOnly: true },
            { value: 'E', readOnly: true },
            { value: 'F', readOnly: true },
            { value: 'G', readOnly: true },
            { value: 'H', readOnly: true },
            { value: 'I', readOnly: true },
        ],
        [
            { readOnly: true, value: 1 },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
        ],], [], [], pk)
        setShowOutput(false)
    }

    const handleSelectedToolChange = (selectedTools) => {
        let grid = [...data];
        grid[0][1] = { value: 'y', readOnly: true }
        grid[0][2] = { value: 'x', readOnly: true }

        onChange(grid, selectedTools, outputs, pk)
    }

    const handleAddRow = () => {
        const grid = addRows(data, 1, 9)
        onChange(grid, tools, outputs, pk)
    }

    const handleUndo = () => {
        undo()
    }

    const handleRedo = () => {
        redo()
    }

    const handleOnRun = () => {
        setShowOutput(true)
        let grid = [...data];
        let payload = { X: [], Y: [] }
        let requests = []
        let output = []

        data.slice(1, data.length).forEach((val) => {
            if (val[1].value && val[2].value) {
                payload.X.push(parseFloat(val[1].value))
                payload.Y.push(parseFloat(val[2].value))
            }
        })

        tools.forEach((tool) => {
            requests.push(solve(tool, payload))
            output.push({ tool_handle: tool })
        })

        axios.all(requests).then(axios.spread((...responses) => {
            responses.forEach((resp, index) => {
                output[index].output_data = resp
            })
            onChange(grid, tools, output, pk)
        }))

    }

    const handleOnDelete = () => {
        onDeleteSpreadsheet(pk)
    }

    const onContextMenu = (e, cell, i, j) =>
        cell.readOnly ? e.preventDefault() : null;

    return (
        <Paper key={pk} className={classes.paperView}>
            <ControllsBar
                onAdd={handleAddRow}
                onClear={handleClear}
                onDelete={handleOnDelete}
                onRun={handleOnRun}
                onUndo={handleUndo}
                onRedo={handleRedo}
            />

            <div style={{ width: '100%' }}>
                <ReactDataSheet
                    className={'spreadsheet'}
                    data={data}
                    valueRenderer={cell => cell.value}
                    onContextMenu={onContextMenu}
                    onCellsChanged={(changes, additions) =>
                        executeCommand(cellChangedCommand(changes, additions)
                        )}
                />
            </div>

            <SelectSolution onChange={tools => handleSelectedToolChange(tools)} tools={tools} />
            {
                showOutput ? <Output data={outputs} /> : <></>
            }
        </Paper>
    )
}
