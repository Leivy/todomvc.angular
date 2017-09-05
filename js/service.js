(function (angular) {
	angular
		.module('crdu.module', [])
		.service('crud', [CrudConstructor])


	function CrudConstructor() {
		var todolist = [{
				id: 1,
				title: "抽烟",
				isCompleted: false
			},
			{
				id: 2,
				title: "喝酒",
				isCompleted: true
			},
			{
				id: 3,
				title: "烫头",
				isCompleted: false
			}
		];
		//查
		this.get = function () {
			return todolist;
		};
		this.add = function (newTitle) {
			todolist.push(newTitle);
		};
		this.del = function (id) {
			//传入id参数来确定删除哪一条数据
			todolist.forEach(function (v, i) {
				if (v.id == id) {
					//从原数组删除这条数据
					todolist.splice(i, 1); //splice会直接修改原数组
				}
			}, this);
		};
		this.selectAll = function (allChecked) {
			todolist.forEach(function (v, i) {
				v.isCompleted = allChecked;
			});
		}
	}

})(angular)
