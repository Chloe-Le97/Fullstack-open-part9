import diagnoseEntries from '../../data/diagnoses';
import {Diagnose} from '../types';

const getDiagnose = ():Diagnose[] =>{
    return diagnoseEntries
};

export default {
    getDiagnose,
};