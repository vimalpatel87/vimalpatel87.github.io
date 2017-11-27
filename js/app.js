var libraryApp = angular.module('libraryApp',[]);
libraryApp.controller('libraryController', function($scope){
    $scope.myBooks = [];
    $scope.booksResults = [];
    
    //Add Book to Library
    $scope.addToLibrary = function(Book){
           $scope.myBooks.push(Book);
    }
    
    //Check if Book is already added in Library
    $scope.isBookadded = function(Book){
    if(angular.toJson($scope.myBooks).includes(angular.toJson(Book))) {  
        return true;
    } else {
        return false;
    }};
    
    var api_prefix = "https://www.googleapis.com/books/v1/volumes?q=";

    //Search for Books from Google API
    $scope.searchBooks = function(key) {
        $("#loading-image").show();
        if(key == "") {
            $scope.booksResults = [];   
            $("#loading-image").hide();
            $scope.$apply();
         } else {
            var request = api_prefix + key;
            $.get(request, function(resp) {
                if(resp.items && resp.items.length > 0) {
                    $scope.booksResults = resp.items;
                    $scope.$apply();
                    $("#loading-image").hide();
                }
                else {
                    alert('Sorry, No Book Found!');
                    $("#loading-image").hide();
                }  
            })
            .error(function(e){
                console.log(e);
                $("#loading-image").hide();
            });
            }
  }
});