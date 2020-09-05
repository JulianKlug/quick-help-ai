import {spawn} from 'child_process';

const frame_question = async (input) => {
    const child = spawn('python3', ['./generate_prompt/main.py', '-q', input]);
    let framed_prompt = "";
    for await (const chunk of child.stdout) {
        framed_prompt += chunk.toString();
    }
    let error = "";
    for await (const chunk of child.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }

    const exitCode = await new Promise( (resolve, reject) => {
        child.on('close', resolve);
    });

    if(exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }
    return framed_prompt;
}

export default frame_question;

