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
			$scope.users[authData.uid] ={
				handle:$scope.email, 
			}
			$scope.users.$save()
		})

		.catch(function(error) {
			console.error("Error: ", error);
		});
	}

	$scope.signIn = function() {
		$scope.logIn().then(function(authData){
			$scope.userId = authData.uid;
		})
	}

	$scope.logIn = function() {
		console.log('log in')
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		})
	}

	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
})