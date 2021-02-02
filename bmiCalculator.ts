export const calculateBmi = (height: number,mass: number): string|undefined =>  {
    const heightConvert = height/100
    if (heightConvert == 0){ throw new Error('height must be higher than 0')}
    const bmi = mass/(heightConvert*heightConvert);
    if(bmi<18.5){return 'Underweight'}
    else if(18.5<=bmi && bmi<=24.9){return 'Normal weight'}
    else if(bmi>25){return 'Overweight'}
    return `Oops something went wrong, unable to calculate bmi`;
  }

// const height = Number(process.argv[2])
// const mass = Number(process.argv[3])

// console.log(calculateBmi(height, mass))
