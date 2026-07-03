interface Task {
    id: number;
    title: string;
    priority: number
}


class TaskManager {
    private tasks: Task[] = [];

    public addTask(id: number, title: string, priority: number) : void {
        const newTask: Task = {id, title, priority};
        //action that adds the new task
        this.tasks.push(newTask)
        console.log(`Added: '${title}'`);
    }

    //using big O(n)
    public badSearchById(targetID: number): Task | null {
        for (let i = 0; i < this.tasks.length; i++) {
            if(this.tasks[i].id === targetID){
                return this.tasks[i];
            }  //we found the task we are searching for
        }
        return null //we couldnt find the task we are searching for 
    }

    //using big o(log n)
    public goodSearchById(targetID: number): Task | null {
        this.tasks.sort((a, b) => a.id - b.id);
        let left = 0
        let right = this.tasks.length - 1

        while(left <= right){
            let mid = Math.floor((left + right)/2)
            let currentTask = this.tasks[mid]

            if(currentTask.id === targetID){
                return currentTask; //we found the Task we are searching for 
            } else if ( currentTask.id < targetID){
                left = mid + 1  //throwing away the left side
            } else {
                right = mid - 1  //throwing away the right side
            }
        }
        return null;
    }


    //sort by priority method - using Big O(n squared)
    public sortByPriority() : void {
        this.tasks.sort((a, b) => b.priority - a.priority)
    }

    public  printTasks() : void {
        console.log("\n--- Current Task List ---")
        this.tasks.forEach(t => console.log(`[ID: ${t.id}] ${t.title} - Priority: ${t.priority}`))
        console.log("----------\n");
        
    }
}


//initialize task 
const manager = new TaskManager();

manager.addTask(1, "Watch world cup", 3)
manager.addTask(2, "Watch movie", 2)
manager.addTask(3, "read", 1)

manager.printTasks()

console.log("searching for ID 419");

const foundTask = manager.goodSearchById(419)
console.log("Result found:", foundTask);


console.log("\n sorting tasks by highest priority");
manager.sortByPriority();
manager.printTasks()


