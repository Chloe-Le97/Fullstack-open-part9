import express from 'express';

import {calculateBmi} from './bmiCalculator'
import {calculateExercises} from './exerciseCalculator'

const app = express();

app.use(express.json());

app.get('/bmi', async (req, res) => {
  var weight = req.query.weight;
  var height = req.query.height;

  if(weight&&height){
  try{
    const result = await calculateBmi(Number(height),Number(weight))
    return res.send({'weight':weight,'height':height,'bmi':result})
  }
  catch(e){
    return res.send(e)
  }
  }
  else{
    return res.send('malformatted parameters')
  }
});

app.post('/exercises',async (req,res)=>{
   // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  var daily_exercises:any = req.body.daily_exercises;
  var target:any = req.body.target;

  const isArray: boolean = Array.isArray(daily_exercises)

  if(isArray){
     // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
    var format = daily_exercises.filter(item => (isNaN(Number(item))))  // eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
    if(format.length>0){
      return res.json({
        error: "malformatted parameters",
      })
    }
  }
  if (!target || !daily_exercises) {
    return res.json({
      error: "parameters missing",
    })
  }
  else if(!isArray){
    return res.json({
      error: "malformatted parameters",
    });
  }

      const result = await calculateExercises(daily_exercises,target);
      return res.send(result)
    
  

})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
