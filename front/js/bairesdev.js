
var app = angular.module('bairesdev', []);
app.controller('users', function($scope,$http) {
  $scope.user={};

  $http.get('http://localhost:3000/').then(function(data){
    console.log(data)
    $scope.users = data.data;
  }, function(data,status){
    console.err(data,status)
  });

  $scope.save=function(){
    console.log($scope.user)
  }
});
