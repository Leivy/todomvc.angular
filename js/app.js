(function (angular) {
	// 'use strict';

	// Your starting point. Enjoy the ride!

	angular
		.module("app", ["app.service", "ngRoute"])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				//什么样的路由规则及可以匹配
				//  /
				//  /active
				//  /completed

				//  /:status?
				.when("/:status?", {
					controller: "todoController",
					templateUrl: "./views/app.html"
				})
		}])
		.controller("todoController", ["$scope", "$location", "todoService", "$routeParams", function($scope, $location, todoService, $routeParams){
			$scope.todoList = todoService.getData();
			var todos = $scope.todoList;

			$scope.add = function($event){
				if($event.keyCode == 13 && $scope.newTask){
					todoService.add(
						{id: todos.length==0? 1 :todos[todos.length - 1].id + 1, title: $scope.newTask, isCompleted: false}
					);
					$scope.newTask = "";
				}
			}

			//3. 实现删除任务的功能
			// $scope.del = todoService.del;

			$scope.del = function(id){
				todoService.del(id);
			}

			//4. 编辑任务功能的实现
			$scope.editingid = -1;
			$scope.edit = function(id){
				$scope.editingid = id;
			}
			
			$scope.update = function($event){
				if($event.keyCode == 13){
					$scope.editingid = -1;
				}
			}

			//5. 任务的单选完成状态实现，只需要给checkbox做双向数据绑定即可！
			$scope.toggleAll = function(){
				todoService.toggleAll($scope.checkall);
			}


			$scope.singleTaskCheck = function(){
				$scope.checkall = todos.every(function(v){
					return v.isCompleted
				})
				$scope.isHideClrBtn = todos.every(function(v){
					return !v.isCompleted;
				})
			}
			//6. 清除所有已经完成的任务

			// $scope.clearAllComepleted = todoService.clearAllComepleted;
			$scope.clearAllComepleted = function(){
				todoService.clearAllComepleted();
			}

			// $scope.getLeftCount = todoService.getLeftCount;
			$scope.getLeftCount = function(){
				return todoService.getLeftCount()
			}

			//7.实现对数据的过滤筛选操作
			// $scope.status = undefined;

			// console.log($routeParams);
			//$routeParams里面有一个属性 status
			//status 可能是 active        $scope.status = false
			//status 可能是 completed     $scope.status = true
			//status 可能是 undefined     $scope.status = undefined


			// switch($routeParams.status){
			// 	case "active":
			// 		$scope.status = false;
			// 		break;
			// 	case "completed":
			// 		$scope.status = true;
			// 		break;
			// 	default:
			// 		$scope.status = undefined;
			// }

			var status = {
				active: false,
				completed: true
			};
			$scope.status = status[$routeParams.status];
			

			// $scope.location = $location;
			// $scope.$watch("location.url()", function(newValue, oldValue){
			// 	//根据hash值的内容，对于页面展示的内容进行更改
			// 	switch($location.url()){
			// 		case "/active":
			// 			$scope.status = false;
			// 			break;
			// 		case "/completed":
			// 			$scope.status = true;
			// 			break;
			// 		default:
			// 			$scope.status = undefined;
			// 	}
			// })
		}])

		function test(name){
			console.log(name);
		}

		var test1 = function(){
			test("123");
		}

		test1();
})(angular);
