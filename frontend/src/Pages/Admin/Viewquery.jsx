import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import axios from 'axios';
import { Paper, Typography, Button, Snackbar, IconButton, Modal, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .unsolve-row': {
        backgroundColor: '#ffebeb',
        color: '#d32f2f',
    },
}));

const Viewquery = () => {
    const token = sessionStorage.getItem("token");
    const [queries, setQueries] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState({ subject: '', message: '' });

    useEffect(() => {
        Getquery();
    }, []);

    const Getquery = async () => {
        try {
            const url = `http://hrportal.dreambytesolution.com/admin/getallquery`;
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(url, { headers: headers });
            setQueries(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateStatus = async (queryId, newStatus) => {
        try {
            const url = `http://hrportal.dreambytesolution.com/admin/chnagestatus/${queryId}`;
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            };
            const body = { status: newStatus };
            await axios.put(url, body, { headers: headers });
            setQueries((prevQueries) =>
                prevQueries.map((query) =>
                    query._id === queryId ? { ...query, status: newStatus } : query
                )
            );
            setSnackbarMessage('Status updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to update status.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleModalOpen = (query) => {
        setSelectedQuery(query);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const columns = [
        { field: 'serialNumber', headerName: 'S.No', width: 80 },
        { field: '_id', headerName: 'Query ID', width: 200 },
        { field: 'subject', headerName: 'Query Subject', width: 250 },
        { field: 'message', headerName: 'Query Message', width: 300 },
        { field: 'employeeName', headerName: 'Employee Name', width: 200 },
        { field: 'status', headerName: 'Query Status', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <>
                    {params.row.status === 'unsolve' && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateStatus(params.row._id, 'solve')}
                            style={{ marginRight: '10px' }}
                        >
                            Mark as Solved
                        </Button>
                    )}
                    <IconButton
                        color="primary"
                        onClick={() => handleModalOpen(params.row)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = queries.map((query, index) => ({
        id: query._id,
        serialNumber: index + 1,
        _id: query._id,
        subject: query.subject,
        message: query.message,
        employeeName: query.employee?.name || 'N/A',
        status: query.status,
    }));

    return (
        <>
            <PageTitle page={"Employee Queries"} />
            <div className="container">
                <Paper style={{ height: "auto", width: '100%', marginTop: '20px' }}>
                    {rows.length > 0 ? (
                        <StyledDataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowClassName={(params) => 
                                params.row.status === "unsolve" ? "unsolve-row" : ""
                            }
                        />
                    ) : (
                        <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                            No queries available.
                        </Typography>
                    )}
                </Paper>
                
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6">{selectedQuery.subject}</Typography>
                        <Typography sx={{ mt: 2 }}>{selectedQuery.message}</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleModalClose}
                            style={{ marginTop: '20px' }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        </>
    );
};

export default Viewquery;
