import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSSNPatient());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patients = patientService.getPatients();
  const patient = patients.find(patient => patient.id==id);
  res.send(patient);
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  try {
    const newEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }

});

export default router;