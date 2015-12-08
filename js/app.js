var myApp = angular.module('myApp', ['firebase']);

myApp.controller('myCtrl', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){

	var ref = new Firebase('https://firechatexample343.firebaseio.com/chat');

	$scope.authObj = $firebaseAuth(ref);

	var authData = $scope.authObj.$getAuth();

	//check to see if logged in already
	if(authData) {
		console.log(authData);
		var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
      	chat.setUser(authData.uid, authData.uid);
	}

	//sign up
	$scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password, 			
		})
		.then($scope.logIn)
	}

	//login
	$scope.logIn = function() {
		$scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		}).then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			  $scope.userId = authData.uid
			  var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
      			chat.setUser(authData.uid, authData.uid);
		}).catch(function(error) {
			  console.error("Authentication failed:", error);
		});
	}

	//logout
	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
})
