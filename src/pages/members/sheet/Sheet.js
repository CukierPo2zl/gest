import { Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import image from '../../../assets/img2.jpg';
import { SupportedToolsContext, SupportedToolsProvider } from '../../../context/ToolsContext';
import { getSupportedTools } from '../../../services/services';
import { FabMenu } from './FabMenu';
import { save } from '../../../services/services';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { SpreadSheet } from './Spreadsheet';
import { useHistory } from 'react-router-dom';
import { CachedSheetsContext } from '../../../context/CachedSheetsContext';
import { generateEmptySheetData } from '../../../utlis';

const useStyles = makeStyles((theme) => ({
    paperWelcome: {
        backgroundColor: '#e9edf8',
        padding: '15px'
    },

}));


const FillSheet = ({ onAddSpreadSheet }) => {
    const classes = useStyles();

    return (
        <div className='center' style={{ height: '100%' }}>
            <Paper className={classes.paperWelcome}>
                <div style={{ textAlign: 'center' }}>
                    <div>
                        <img style={{ width: '50%' }} src={image} alt='grats' />
                    </div>
                    <Button onClick={onAddSpreadSheet} variant="contained" color='secondary'>add empty spreadsheet</Button>
                    <Typography variant='h6' component='h1'>
                        or
                </Typography>
                    <Button variant="contained" color='secondary'>use builder</Button>
                </div>
            </Paper>
        </div>
    )
}

const Sheet = () => {
    const defaultSheetContent = generateEmptySheetData(10);


    const history = useHistory();
    const [, setTools] = useContext(SupportedToolsContext);
    const [spreadsheets, setSpreadsheets] = useState(history.location.state?.content || [])
    const [, , , setNeedResetSignal] = useContext(CachedSheetsContext);

    useEffect(() => {
        const handleGetSupportedTools = async () => {
            setTools(await getSupportedTools());
        }
        handleGetSupportedTools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddSpreadsheet = () => {
        setSpreadsheets([...spreadsheets, { data: defaultSheetContent, tools: [], outputs: [] }])
    }

    const handleDeleteSpreadsheet = (pk) => {
        var filteredAry = [...spreadsheets]
        if (pk > -1) { filteredAry.splice(pk, 1) }

        setSpreadsheets(filteredAry)
    }

    const handleOnChange = (data, tools, outputs, pk) => {
        var ids = [...spreadsheets]
        ids[pk] = { data: data, tools: tools, outputs: outputs }
        setSpreadsheets(ids)
    }

    const handleOnSave = async () => {
        await save(history.location.state.name, spreadsheets)
        setNeedResetSignal(true)
    }

    const handleExport = () => {
        const input = document.getElementById('main-view');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("export.pdf");
            })
    }

    return (
        <div id='main-view'>
            <FabMenu onAddSpreadSheet={handleAddSpreadsheet} onSave={handleOnSave} onExport={handleExport} />
            {spreadsheets.length === 0 ?
                <FillSheet onAddSpreadSheet={handleAddSpreadsheet} />
                :
                spreadsheets.map((spreadsheet, index) => (
                    <>
                        <SpreadSheet
                            pk={index}
                            data={spreadsheet.data}
                            tools={spreadsheet.tools || []}
                            outputs={spreadsheet.outputs}
                            onDeleteSpreadsheet={handleDeleteSpreadsheet}
                            onChange={handleOnChange}
                        />
                        <div style={{ height: '25px', width: '100%' }}></div>
                    </>
                )
                )
            }
        </div>
    );
}

export const SheetPage = () => {
    return (
        <SupportedToolsProvider>
            <Sheet />
        </SupportedToolsProvider>
    )
}

