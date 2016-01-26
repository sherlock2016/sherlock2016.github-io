var myApp=angular.module('myApp',['ngRoute','ngSanitize','myAppControllers','myAppServices','myAppDirectives','satellizer','ngCookies']);
myApp.config(['$routeProvider','$authProvider',function($routeProvider,$authProvider){
console.log("gowtham check");

  $routeProvider
  .when("/",{templateUrl:"partials/login.html",controller:'homeController'})
  .when("/round1",{templateUrl:"partials/round1.html",controller:'questionsController'})
  .when("/round2",{templateUrl:"partials/round2.html",controller:'questionsController'})
  .when("/round3",{templateUrl:"partials/round3.html",controller:'questionsController'})
  .when("/round4",{templateUrl:"partials/round4.html",controller:'questionsController'})
  .when("/success",{templateUrl:"partials/success.html",controller:'questionsController'})
  .when("/xceed/iim-a",{
    templateUrl:"partials/iim-a.html",controller:"IIMAController"
                    ,resolve:{
                    "check":function(SAAccessFac,$location){   //function to be resolved, accessFac and $location Injected
                        if(SAAccessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                           
                        }else{
                            $location.path("/");                              
                            toastr.clear();
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
                             toastr.error('Please login to use Xceed IIM-A registration','Warning');
                        }
                      }
                    }

  })
.otherwise({redirectTo:'/'});
  $authProvider.baseUrl='http://login.kurukshetra.org.in';
  $authProvider.facebook({clientId:'1491975041128547',authorizationEndpoint:'https://www.facebook.com/v2.3/dialog/oauth',redirectUri:(window.location.origin||window.location.protocol+'//'+window.location.host)+'/',requiredUrlParams:['display','scope'],scope:['email'],scopeDelimiter:',',display:'popup',type:'2.0',popupOptions:{width:580,height:400}});$authProvider.google({clientId:'113263203194-cgt8g3gbuqfv8vgfg3smqksqlbt0t7fr.apps.googleusercontent.com'});
}]); 

myApp.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
        ga('send', 'pageview', $location.path());
        console.log("gowtham checking run");
console.log($location.path());
    });
    
});


  myApp.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});