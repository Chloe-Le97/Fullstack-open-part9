import { NewPatient, Gender } from './types';

const toNewPatientEntry = (object:any): NewPatient => {
    return{
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        occupation: parseOccupation(object.occupation),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        entries:[]
    };
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
  
    return name;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing name: ' + occupation);
    }
  
    return occupation;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing name: ' + ssn);
    }
    return ssn;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
  };
  
const parseDate = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender;
  };

  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

export default toNewPatientEntry;