/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientEntry from '../../data/patients';
import {Patient, PublicPatient, NewPatient} from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = ():Patient[] =>{
    return patientEntry;
};

const getNonSSNPatient = ():PublicPatient[] =>{
    return patientEntry.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,name,dateOfBirth,gender,occupation
    }));

};

const addPatient = (entry: NewPatient):Patient =>{
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
      };

    patientEntry.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSSNPatient,
    addPatient
};