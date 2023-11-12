import { Console } from "@woowacourse/mission-utils"

const retryUntilNoError = async function retryUntilNoError(exampleFunction){
  while(true){
    try{
      await exampleFunction();
    }catch(e){
      Console.print(e.message);
      continue;
    }
    break;
  }
  return;
}

export default retryUntilNoError;
