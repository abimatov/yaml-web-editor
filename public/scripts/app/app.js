angular.module('yamlWebEditor', ['ng.jsoneditor'])
.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
}])
.service('YamlService', ['$http', function($http){
	var self = {};
	
	self.update = function (yamlObject) {
		console.log('$http.post', yamlObject);
		$http.post('/', yamlObject);
	};
	
	return self;
}])
.controller('HomeController', ['$scope', 'yamlData', 'YamlService', function($scope, yamlData, YamlService) {
	$scope.yaml = yamlData;
	
	$scope.onEditorLoad = function(jsonEditor) {
		jsonEditor.expandAll()
	};
	
	$scope.$watch('yaml', function (newValue, oldValue) {
		if (newValue !== oldValue) {
			YamlService.update(newValue);
		}
	});
}]);