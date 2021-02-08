import React, {useState, useEffect} from "react";
import axios from "axios";
import { Entry, Patient, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import {useParams} from "react-router-dom";
import { useStateValue } from "../state";
import {updatePatient} from '../state/reducer';
import { Container, Header, Icon, Button } from "semantic-ui-react";

const PatientPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
    
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  const genderIcon = {
    male: { name: "mars" as "mars" },
    female: { name: "venus" as "venus" },
    other: { name: "genderless" as "genderless" },
  };
  
  const fetchPatientDetails = async () => {
    try {
      const { data: patientDetailFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(updatePatient(patientDetailFromApi));
      setPatient(patientDetailFromApi);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDiagnosisDetails = async() =>{
    try{
      const { data: diagnosisDetailFromApi } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnosis`
      );
      setDiagnosis(diagnosisDetailFromApi);
    }catch(e){
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchDiagnosisDetails();
  }, [patient,id,dispatch]);
  return (
    <Container>
    <div className="App">
        {patient?(<div><h2>{patient.name} <Icon {...genderIcon[patient.gender]} /></h2>
        <div>SSN: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
        <h3>Entries</h3>
        <div>{patient?.entries.map((element: Entry) =>(
            <div>
            <div>{element.date} <i>{element.description}</i></div>
            <div>{element.diagnosisCodes?.map((item: string)=>(<div><li>{item} {diagnosis?.find(i=>i.code==item)?.name}</li></div>))}</div>
            </div>
        ))}</div></div>):(null)}
    
    </div>
    </Container>
  );
};

export default PatientPage;
