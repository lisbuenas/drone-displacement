import axios from 'axios';

export async function calculateTime(path: string[]){
    let totalTime = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const currentValue = path[i];
        const nextValue = path[i + 1];
        const result = await calculateStep(currentValue, nextValue);
        totalTime+=result;
        console.log(`Result for ${currentValue} and ${nextValue}: ${result}`);
      }
      return totalTime;
}

export async function calculateStep(origin:string,destination:string){

    const {data} = await axios.get("https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f")
    // find the current cell



    console.log(data[origin][destination])


    // find the time to the destination cell
    return data[origin][destination];
}