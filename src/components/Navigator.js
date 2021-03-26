import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Navigator() {
    const location = useLocation()
    const paths = location.pathname.split('/').filter(function (el) { return el.length !== 0 });;

    return (
        <Grid alignItems='center' container spacing={1}>

            {paths.map((item, index) => (
                <Grid key={index} item>
                    <Typography variant='h5' component='h2'>
                        {index === paths.length-1 ?
                        <Link to={item} className='router-link'>{item} </Link> :
                        <Link to={`/${item}`} className='router-link'>{item} </Link>    
                        }/
                    </Typography>
                </Grid>
            ))}

        </Grid>
    )
}

