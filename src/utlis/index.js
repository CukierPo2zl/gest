import { useEffect, useRef } from "react";

const truncate = (text) => {
    return text.length > 15 ? text.substring(0, 12) + "..." : text;
}
const addRows = (data, nRows) => {
    data = [...data]
    let nextIndex = data.length - 1
    return data.concat(
        [...Array(parseInt(nRows)).keys()].map((x) => {
            nextIndex++
            return [{ readOnly: true, value: nextIndex }, {}, {}, {}, {}, {}, {}, {}, {}, {}];
        })
    );
};

const generateEmptySheetData = (rows) =>{
    let data =  [
        [
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
    ]
   return addRows(data, rows);
}



export { truncate, addRows, generateEmptySheetData }