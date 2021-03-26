import { CircularProgress } from '@material-ui/core'
import React from 'react'

const OutputComponent = ({ output }) => {
    return (
        <>
            {
                Object.keys(output).map((name, val) => (
                    <h3 name={val}>{name}: {output[name]} </h3>
                ))
            }
        </>
    )
}

export const Output = ({ data }) => {
    if (data.length > 0) {
        return (
            <div>
                {
                    data.map((instance) => (
                        <>
                            <h1>{instance.tool_handle}</h1>
                            <OutputComponent output={instance.output_data} />
                        </>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='center'><CircularProgress /></div>
    )

} 