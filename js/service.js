(function(angular){

    //1. 创建模块
    angular
        .module("app.service", [])
        .service("todoService", [TodoService]);

    
    function TodoService(){
        var todoList = [
            {id: 1, title: "抽烟", isCompleted: false},
            {id: 2, title: "喝酒", isCompleted: true},
            {id: 3, title: "烫头", isCompleted: false}
        ];

        this.getData = function(){
            return todoList;
        }

        this.add = function(task){
            todoList.push(task);
        }

        this.del = function(id){
            for(var i = 0; i < todoList.length; i ++){
                if(id == todoList[i].id){
                    todoList.splice(i, 1);
                    break;
                }
            }
        }

        this.toggleAll = function(isChecked){
            todoList.forEach(function(v, i){
                v.isCompleted = isChecked;
            })
        }

        this.clearAllComepleted = function(){
            //将todos数组中所有isCompleted属性为true的元素删除即可
            for(var i = 0; i < todoList.length; i++){
                if(todoList[i].isCompleted){
                    todoList.splice(i, 1);
                    i--;
                }
            }
        }

        this.getLeftCount = function(){
            return todoList.filter(function(v){
                return !v.isCompleted;
            }).length;
        }
    }

})(angular)