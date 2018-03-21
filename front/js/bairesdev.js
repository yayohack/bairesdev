
var app = angular.module('bairesdev', []);
app.controller('users', function($scope,$http,$window) {
  $scope.user={};

  $http.get('http://localhost:3000/').then(function(data){
    console.log(data)
    $scope.users = data.data;
  }, function(data,status){
    console.error(data,status)
  });

  $scope.save=function(){
    var userData = {"first_name":$scope.user.first_name,"last_name":$scope.user.last_name,"age":$scope.user.age,"email":$scope.user.email}
    console.log(userData)
    $http({
      method: 'POST',
      url: "http://localhost:3000/create",
      data: userData,
      headers: {headers: {'Content-Type': 'application/json'} }
    }).then(function(data){
      console.log(data)
      $window.location.reload();
    },function(data,status){
      console.error(data,status)
    })
  }
});
