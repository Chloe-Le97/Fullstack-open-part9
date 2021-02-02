interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number | undefined;
    ratingDescription: string | undefined;
    target: number;
    average: number;
}

export const calculateExercises = (exerciseHours: number[],target: number): Result =>{
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(time=>time>0).length;
    const average = exerciseHours.reduce((a,b)=>a+b,0)/exerciseHours.length;
    let success;
    let rating;
    let ratingDescription;
    if(average>target){success=true; rating=3; ratingDescription='Good job, you pratice more than plan of this week'}
    if(average==target){success=true; rating = 2; ratingDescription='You reach this week plan but could it be better?'}
    if(average<target){success=false; rating = 1; ratingDescription='You did not reach this week plan. Keep it up next week'}

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
      };
}

// let array = []

// for(let i =3;i<process.argv.length;i++){
//     array.push(Number(process.argv[i])) 
// }

// const exerciseHours = array;
// const target = Number(process.argv[2])

// console.log(calculateExercises(exerciseHours,target))
