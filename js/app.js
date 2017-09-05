(function (window) {
	//'use strict';

	// Your starting point. Enjoy the ride!
	//用angular渲染数据 展示列表
	angular
		.module('app', ["ngRoute", "crdu.module"])
		.controller('cl', ['$scope', '$location', '$routeParams', 'crud', function ($scope, $location, $routeParams, crud) {
			//1.展示列表 先假装有个初始化数据
			$scope.todoList = crud.get();
			var todos = $scope.todoList;

			//2. 添加任务 给输入框注册onkeydown事件 
			$scope.addNewTodo = function ($event) {
				if ($event.keyCode == 13 && $scope.newTitle) {
					crud.add({
						// id: todos.length > 0 ? 
						id: !todos[todos.length - 1] ? 1 : (todos[todos.length - 1].id + 1),
						title: $scope.newTitle.trim(),
						isCompleted: false
					})
					//添加完成后清除输入框内容
					$scope.newTitle = "";
				}
			};

			//3. 删除一条任务 给按钮注册点击事件, 传入当前数据的id 删除数组中的当前数据
			$scope.del = crud.del;

			//4. 修改任务 双击文本框 显示文本框 
			$scope.editingId = -1;
			$scope.dblInput = function (id) {
				//获取双击的当前数据 通过给li加类名editing来显示input框
				$scope.editingId = id;
			};
			//input框输入修改内容
			$scope.edit = function (e) {
				//回车完成修改
				if (e.keyCode == 13) {
					$scope.editingId = -1;
				}
			};

			//5. 切换任务选中状态 
			//全选按钮点击事件 列表状态跟随
			$scope.selectAll = function () {

				crud.selectAll($scope.allChecked)
				$scope.isHide = !$scope.allChecked;
				//修改未完成任务数
				$scope.countLeft = todos.reduce(function (sum, v) {
					return sum + (v.isCompleted == false ? 1 : 0);
				}, 0);
			};
			//列表按钮点击事件  决定全选按钮状态
			$scope.selectTodo = function () {
				$scope.allChecked = todos.every(function (v, i) {
					return v.isCompleted;
				});
				//观察列表按钮状态 决定清除按钮的状态
				$scope.isHide = todos.every(function (v, i) {
					return !v.isCompleted;
				});
				//修改未完成任务数
				$scope.countLeft = todos.reduce(function (sum, v) {
					return sum + (v.isCompleted == false ? 1 : 0);
				}, 0)
			};

			//6. 清除已完成任务 右下角 当没有完成事件时不显示 显示点击会清除所有已完成事件
			$scope.clearAll = function () {
				$scope.todoList = todos.filter(function (v, i) {
					return !v.isCompleted;
				});
				todos = $scope.todoList;
			};

			//7. 显示未完成任务数 记得在列表和全选按钮处都更新这个函数
			$scope.countLeft = todos.reduce(function (sum, v) {
				return sum + (v.isCompleted == false ? 1 : 0);
			}, 0);

			//8.显示不同状态的任务

			//9. 根据URL变化显示相应任务 根据url显示列表
			$scope.location = $location; //把服务$location赋值给$scope使用$watch监视
			var status = {
				active: false,
				completed: true
			}
			$scope.status = status[$routeParams.name];
			// $scope.$watch('location.url()', function () {
			// 	//用filter过滤器来筛选出要显示的内容
			// 	switch ($location.url()) {
			// 		case '/active':
			// 			$scope.status = false;
			// 			break;
			// 		case '/completed':
			// 			$scope.status = true;
			// 			break;
			// 		default:
			// 			$scope.status = undefined;
			// 	}

			// });
		}])
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider
				.when('/:name?', {
					controller: 'cl',
					templateUrl: './views/page.html'
				})
		}])
})(window);
