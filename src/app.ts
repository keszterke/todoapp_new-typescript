
'use strict'

import { readFileSync } from "fs";
import { Z_FILTERED } from "zlib";

const fs = require('fs');

// alap fájlolvasás function

function readFile(filePath:string):string{

    let fileContent:string = '';

    try{
        fileContent = readFileSync(filePath, 'utf8');
        

   }catch(e){
        console.log('Error while reading file...');     
    }
 
    return fileContent

}

if (process.argv.length < 3){
    console.log(readFile('../printUsage.txt'))

    }

//List all tasks    

function readTasks():string[]{
    return fs.readFileSync('../db.txt', 'utf8').split(`\n`)
}

function readAllTask(tasks:string[]):string{
    let result: string = '';

    for(let i:number = 0; i < tasks.length; i++){
        result += `${i+1} - ${tasks[i]}\n`
    }

    return result;

}
//List all tasks  and //Empty list

if (process.argv[2] == '-l'){
    let fileContentTasks = readTasks()
    if (fileContentTasks.length - 1 == 0){
    
        console.log('No todos for today! :)')

    } 
   else{
       console.log(readAllTask(readTasks()))     
    }
}

//Add new task , ez lesz a writefile function


function writeTaskToTheFile(filePath:string,fileContent:string){
    try{
        fs.writeFileSync(filePath, fileContent);
        console.log('File write successfull')
    
    }catch(e){
        console.log('Unable  to write file:');
    } 
}


let newTask:string = process.argv[3];

if(process.argv[2] == '-a' && process.argv[3] == newTask){

    function fileDataRow(){
        let fileTask:string[] = readTasks();
        fileTask.push(newTask);
        //console.log(fileTask);

        return fileTask
    }

    let fileContent:string[] = fileDataRow()

    function addTodoLines():string{

        let resultContent = '';

        for(let i:number = 0; i < fileContent.length; i++){
            
    
            //hogyan lehet a sortörést megcsinálni, hogy ne dobjon be egy plusz üres sort
            resultContent += fileContent[i]+`\n`;     
        }
        return resultContent
    }

    

    let formattedLines:string = addTodoLines()

    console.log(formattedLines)
    writeTaskToTheFile('../db.txt',formattedLines)
    

}

//Add new task error handling

if(process.argv[2] == '-a' && process.argv[3] == undefined){
    console.log('Unable to add: no task provided')
}


//Remove task

let index:number = Number(process.argv[3])

if (process.argv[2] == '-r' && Number(process.argv[3]) == index){
    let fileTask:string[] = readTasks();
    
    function removeIndexedElement(index):string[]{
        fileTask.splice(index,1);
        return fileTask;
    }

    let formatedWithRemoving:string[] = removeIndexedElement(1);

    console.log(formatedWithRemoving)


    function readAllTaskafterFormat(tasks:string[]):string{
        let result: string = '';
    
        for(let i:number = 0; i < tasks.length; i++){
            result += `${tasks[i]}`+(`\n`)
        }
    
        return result;
    }


    //console.log(readAllTaskafterFormat(formatedWithRemoving))
    let resultAfterRemoving:string = readAllTaskafterFormat(formatedWithRemoving)


    writeTaskToTheFile('../db.txt',resultAfterRemoving)

}


