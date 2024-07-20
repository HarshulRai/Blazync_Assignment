import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, FormControl, Container, Row, Col } from 'react-bootstrap';
import EditStudentModal from './EditStudentModal';
import InvoiceTemplate from './InvoiceTemplate';
import jsPDF from 'jspdf';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
    };

    const handleEdit = (id) => {
        setSelectedStudentId(id);
        setEditModalShow(true);
    };

    const handleInvoice = (student) => {
        if (student.paymentStatus === 'Unpaid') {
            const doc = new jsPDF();
            doc.text(`Invoice for ${student.name}`, 10, 10);
            doc.text(`Roll Number: ${student.rollNumber}`, 10, 20);
            doc.text(`Fees: ${student.fees}`, 10, 30);
            doc.text(`Payment Status: ${student.paymentStatus}`, 10, 40);
            doc.save(`Invoice_${student.rollNumber}.pdf`);
        }
    };

    const handleModalClose = () => {
        setEditModalShow(false);
        setSelectedStudentId(null);
        fetchStudents();
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.rollNumber.includes(search)
    );

    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>Student Dashboard</h2>
                </Col>
                <Col className="text-right">
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mb-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Fees</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.fees}</td>
                            <td>{student.paymentStatus}</td>
                            <td>
                                <Button variant="info" onClick={() => handleEdit(student.id)}>Edit</Button>
                                {' '}
                                <Button variant="warning" onClick={() => handleInvoice(student)}>Send Invoice</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditStudentModal
                show={editModalShow}
                handleClose={handleModalClose}
                studentId={selectedStudentId}
                onUpdate={fetchStudents}
            />
        </Container>
    );
};

export default Dashboard;
