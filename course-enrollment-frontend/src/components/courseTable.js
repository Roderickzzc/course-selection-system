import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';




export default function CourseTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell># Number</TableCell>
                        <TableCell align="left">Course Name</TableCell>
                        <TableCell align="left">Course Location</TableCell>
                        <TableCell align="left">Course Content</TableCell>
                        <TableCell align="left">Teacher</TableCell>
                        <TableCell align="left">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.courses.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">
                                {row.course_name}
                            </TableCell>
                            <TableCell align="left">{row.course_location}</TableCell>
                            <TableCell align="left">{row.course_content}</TableCell>
                            <TableCell align="left">{row.teacher_id}</TableCell>
                            <TableCell align="left">
                                <Button onClick={() => {
                                    props.onActionClickHandler(row.course_name)
                                }}>{props.actionLabel}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
