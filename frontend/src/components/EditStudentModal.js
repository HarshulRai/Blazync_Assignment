import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditStudentModal = ({ show, handleClose, studentId, onUpdate }) => {
    const [student, setStudent] = useState({});

    useEffect(() => {
        if (studentId) {
            fetchStudentDetails();
        }
    }, [studentId]);

    const fetchStudentDetails = async () => {
        const response = await axios.get(`http://localhost:5000/students/${studentId}`);
        setStudent(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
    };

    const handleSave = async () => {
        await axios.put(`http://localhost:5000/students/${studentId}`, student);
        onUpdate();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={student.name || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="rollNumber"
                            value={student.rollNumber || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fees</Form.Label>
                        <Form.Control
                            type="number"
                            name="fees"
                            value={student.fees || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Payment Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="paymentStatus"
                            value={student.paymentStatus || ''}
                            onChange={handleChange}
                        >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditStudentModal;
