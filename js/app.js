//Initiate an Angular app that includes firebase


//Initiate Controller for your app including scope, firebaseAuth, firebaseArray, firebaseObject


	//Create a variable reference that refers to your firebase https://MY-FIREBASE-APP-URL/chat


	//create an authObj that referse to your ref


	//create authentication and create a new instance of firechat




	//sign up function
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

	//sign in function
	$scope.signIn = function() {
		$scope.logIn().then(function(authData){
			$scope.userId = authData.uid;
		})
	}

	//log in function
	$scope.logIn = function() {
		console.log('log in')
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		})
	}

	//logout function
	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
})
