import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useTheme } from '../Context/ThemeContext'

const TableUserData = ({data}) => {

    const {theme} = useTheme();

    const stylingHeader = {
        color: theme.timerColor,
        textAlign: 'center',
        fontSize: "18px",
    }
    const styling = {
        color: theme.typeBoxColor,
        textAlign: 'center',
    }

  return (
    <div className='table'>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={stylingHeader}>WPM</TableCell>
                        <TableCell style={stylingHeader}>Accuracy</TableCell>
                        <TableCell style={stylingHeader}>Characters</TableCell>
                        <TableCell style={stylingHeader}>Date And Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((i, index) => (
                            <TableRow key={index}>
                                <TableCell style={styling}>{i.wpm}</TableCell>
                                <TableCell style={styling}>{i.accuracy}%</TableCell>
                                <TableCell style={styling}>{i.characters}</TableCell>
                                <TableCell style={styling}>{i.timeStamp.toDate().toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TableUserData