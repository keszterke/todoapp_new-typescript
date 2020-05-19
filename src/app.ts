
'use strict'

import { readFileSync } from "fs";
import { Z_FILTERED } from "zlib";

const fs = require('fs');

// alap fájlolvasás function

function readFile(filePath:string):string {

    let fileContent:string = '';

    try {
        fileContent = readFileSync(filePath, 'utf8');
        

   } catch (e) {
        console.log('Error while reading file...');     
    }
 
    return fileContent

}

if (process.argv.length < 3) {
    console.log(readFile('../printUsage.txt'))

    }

//List all tasks    

function readTasks():string[] {
    return fs.readFileSync('../db.txt', 'utf8').split(`\n`)
}

function readAllTask(tasks:string[]):string {
    let result: string = '';

    for (let i:number = 0; i < tasks.length; i++) {
        result += `${i+1} - ${tasks[i]}\n`
    }

    return result;

}
//List all tasks  and //Empty list

if (process.argv[2] == '-l') {
    let fileContentTasks = readTasks()
    if (fileContentTasks.length - 1 == 0) {
    
        console.log('No todos for today! :)')

    } 
    else {
       console.log(readAllTask(readTasks()));     
    }
}

//Add new task


function writeTaskToTheFile(filePath:string,fileContent:string){
    try {
        fs.writeFileSync(filePath, fileContent);
        console.log('File write successfull');
    
    } catch(e) {
        console.log('Unable  to write file:');
    } 
}


let newTask:string = process.argv[3];

if (process.argv[2] == '-a' && process.argv[3] == newTask) {

    function addDataToRow(filePathfromRead:string):string{
        let fileTask:string = readFile(filePathfromRead);
        fileTask += newTask+('\n');

        return fileTask
    }

    writeTaskToTheFile('../db.txt',addDataToRow('../db.txt'));
    

}

//Add new task error handling

if (process.argv[2] == '-a' && process.argv[3] == undefined) {
    console.log('Unable to add: no task provided');
}


//Remove task

let index:number = Number(process.argv[3])

if (process.argv[2] == '-r' && Number(process.argv[3]) == index) {
    let fileTask:string[] = readTasks();

    function removeIndexedElement(index):string[] {
        fileTask.splice(index,1);
        return fileTask;
    }


    function readAllTaskafterFormat(tasks:string[]):string {
        let result: string = '';

        for (let i:number = 0; i < tasks.length; i++) {
            result += `${tasks[i]}`+(`\n`);
        }
    
        return result;
    }

    let resultAfterRemoving:string = readAllTaskafterFormat(removeIndexedElement(index));

    writeTaskToTheFile('../db.txt',resultAfterRemoving)

}


