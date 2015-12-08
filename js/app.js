var myApp = angular.module('myApp', ['firebase']);

myApp.controller('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){

	var ref = new Firebase('https://firechatexample343.firebaseio.com/chat');

	$scope.authObj = $firebaseAuth(ref);

	var authData = $scope.authObj.$getAuth();
	if(authData) {
		console.log(authData);
		$scope.userId = authData.uid;
		var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
        chat.setUser(authData.uid, authData.uid);
	}

	$scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password, 			
		})
		.then($scope.logIn)
		.then(function(authData) {
			$scope.userId = authData.uid;
		})
	}

	$scope.signIn = function() {
		$scope.logIn().then(function(authData){
			$scope.userId = authData.uid;
		})
	}

	$scope.logIn = function() {
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		}).then(function(authData) {
			  console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
			  console.error("Authentication failed:", error);
		});
	}

	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
})