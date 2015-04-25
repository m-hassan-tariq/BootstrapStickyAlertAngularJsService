(function () {
    //Module
    var sample = angular.module('notifyApp', ['ngRoute']);
	
	sample.service('notifications', ['$rootScope', function ($rootScope) {
            var queue = [];
            return {
                queue: queue,
                add: function (item) { 
                    var index = -1;
                    for (var i = 0; i < this.queue.length; i++) {
                        if (queue[i].body == item.body) {
                            index = i;
                            break;
                        }
                    } 
                    if (index != -1)
                        return;
                    queue.push(item);
                    setTimeout(function () {
                        $('.alerts .alert').eq(0).remove();
                        queue.shift();
                    }, 30000);
                },
                pop: function (item) {
                    var index = -1;
                    for (var i = 0; i < this.queue.length; i++) {
                        if (queue[i].body == item) {
                            index = i;
                            break;
                        }
                    }
                    if (index != -1)
                        queue.splice(index, 1);
                    return this.queue;
                }
            };
        }
    ]);
	
    //Controller
    sample.controller('notifyController', function ($scope, notifications) {
	
		$scope.notify = notifications;
		$scope.closeAlert = function (item) {
            notifications.pop(item);
        }
		
        $scope.info = function()
		{ 
			setNotification(notifications, 'info', 'Info Header', 'Info Body');
		}
		
		$scope.success = function()
		{ 
			setNotification(notifications, 'success', 'Success Header', 'Success Body');
		}
		
		$scope.warning = function()
		{ 
			setNotification(notifications, 'warning', 'Warning Header', 'Warning Body');
		}
		
		$scope.error = function()
		{ 
			setNotification(notifications, 'danger', 'Error Header', 'Error Body');
		}
    });
	
	function setNotification(notifications, type, title, body) {
        notifications.add({
            type: type,
            title: title,
            body: body
        });
    }
})();

