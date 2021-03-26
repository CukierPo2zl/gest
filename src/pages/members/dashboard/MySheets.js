import React, { useState, useContext } from 'react';
import { Grid, IconButton, Typography, Button, Checkbox } from '@material-ui/core';
import { MoreVertRounded, DeleteOutlineOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { truncate } from '../../../utlis';
import { MySheetsSkeleton } from '../../../components/loaders';
import { deleteSpreadsheet } from '../../../services/services';
import axios from 'axios';
import { CachedSheetsContext } from '../../../context/CachedSheetsContext';
import { WizardContext } from '../../../context/WizardContext';
import { NewSheetContent } from '../../../components/wizard/NewSheetContent';


const ListTile = ({ pk, item, onChange, checked }) => {
    const history = useHistory();
    const onClickCallback = () => history.push(`/dashboard/${item.name}`, item);

    const handleChange = (event) => {
        onChange(pk)
    };

    return (
        <Grid justify='space-between' className="list-tile pointer" xs={12} item container >
            <Grid xs={8} md={6} item container>
                <Grid xs={4} item>
                    <div className='list-tile-leading'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="secondary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <div className='list-lite-item name' onClick={onClickCallback}>
                            {truncate(item.name)}
                        </div>
                    </div>
                </Grid>

                <Grid xs={4} className='list-lite-item' item onClick={onClickCallback}>
                    {new Date(item.updated_at).toLocaleDateString()}
                </Grid>
                <Grid xs={4} className='list-lite-item' item onClick={onClickCallback}>
                    {new Date(item.created_at).toLocaleDateString()}
                </Grid>
            </Grid>
            <Grid xs={4} md={6} className='list-lite-item' justify='flex-end' item container onClick={onClickCallback}>
                <IconButton size='small'>
                    <MoreVertRounded />
                </IconButton>
            </Grid>
        </Grid>
    )
}

ListTile.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        inputs: PropTypes.array,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
    })
}

const TableHeading = ({ checkedCallback, onDelete, onCreate }) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        checkedCallback(event.target.checked);
    };

    return (
        <Grid style={{ paddingBottom: '20px' }} justify='space-between' container>
            <Grid xs={8} md={6} item container>
                <Grid xs={4} item>
                    <div className='list-tile-leading'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="secondary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography className='list-lite-item' component='h1' variant='subtitle2'>
                            Name
                    </Typography>
                    </div>
                </Grid>
                <Grid xs={4} className='list-lite-item' item>
                    <Typography component='h1' variant='subtitle2'>
                        Last edit
                    </Typography>
                </Grid>
                <Grid xs={4} className='list-lite-item' item>
                    <Typography component='h1' variant='subtitle2'>
                        Created at
                    </Typography>
                </Grid>
            </Grid>
            <Grid className='list-lite-item' item>
                <IconButton onClick={onDelete}><DeleteOutlineOutlined /></IconButton>
                <Button onClick={onCreate} color='secondary' variant='contained'>
                    New sheet
                </Button>
            </Grid>
        </Grid>
    )
}

export const MySheets = () => {
    const [sheets, setSheets, isLoaded, setNeedResetSignal] = useContext(CachedSheetsContext); // Proxy
    const [, setWizard] = useContext(WizardContext);

    const handleCheck = (index) => {
        let tmp = [...sheets]
        tmp[index].checked = !tmp[index].checked
        setSheets(tmp)
    }
    const handleCreate = () => {
        setWizard({
            open: true,
            content: <NewSheetContent updateSheetListSignal={setNeedResetSignal} />,
            fullScreen: true,
        })
    }
    const handleCheckAll = (checked) => {
        let tmp = [...sheets]
        sheets.forEach((sheet, index) => {
            tmp[index] = { data: sheet.data, checked: checked }
        });
        setSheets(tmp)
    }
    const handleDelete = () => {
        let requests = []
        let tmp = []

        sheets.forEach((sheet) => {
            if (sheet.checked) {
                requests.push(deleteSpreadsheet(sheet.data.name))
            } else {
                tmp.push(sheet)
            }
        });

        axios.all(requests).then(
            setSheets(tmp)
        );
    }
    return (
        <>
            <TableHeading checkedCallback={handleCheckAll} onDelete={handleDelete} onCreate={handleCreate} />
            <Grid container spacing={2}>
                {
                    isLoaded ?
                        sheets.map((item, index) => (
                            <ListTile
                                key={index}
                                pk={index}
                                item={item.data}
                                checked={item.checked}
                                onChange={handleCheck}
                            />
                        ))
                        :
                        (<MySheetsSkeleton />)
                }
            </Grid>
        </>
    )
}



