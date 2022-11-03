import readline from 'readline'

export async function useQuestion (str){
  return new Promise(
    resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      })
      
      rl.question(`${str}\n`, (result) => {
        rl.close()
        resolve(result)
      })
    }
  )
}