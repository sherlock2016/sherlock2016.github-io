/*UPDATES*/
var myApp = angular.module("myAppControllers",[]);

/*HOME*/
myApp.controller('homeController',['$scope','$http','$location','$timeout','$sce',function($scope,$http,$location,$timeout,$sce){
  $("html,body").animate({'scrollTop':"0px"},0);
  function animateme()
  {
    $timeout(function(){
      $("#bomb").parent().addClass("node-active");
      $("#bomb").parent().find("btmText").css({'color':"#fff"});
      $("#bomb").css({'color':"rgba(255,255,255,0.7)"});},500);
    $timeout(function(){
      $("#compass").parent().addClass("node-active");
      $("#compass").parent().find("btmText").css({'color':"#fff"});
      $("#compass").css({'color':"rgba(255,0,100,1)"});},1000);
    $timeout(function(){
      $("#cogs").parent().addClass("node-active");
      $("#cogs").parent().find("btmText").css({'color':"#fff"});
      $("#cogs").css({'color':"rgba(0,255,50,1)"});},1500);
    $timeout(function(){
      $("#key").parent().addClass("node-active");
      $("#key").parent().find("btmText").css({'color':"#fff"});
      $("#key").css({'color':"rgba(0,50,255,1)"});},2000);
    $timeout(function(){$(".desc").css({'opacity':"1"});},2200);
  }
  $timeout(animateme,500);

}]);

/*NAVBAR*/
myApp.controller('navbarController',['$scope','$http','$location','$timeout','$sce',function($scope,$http,$location,$timeout,$sce){

  $("html,body").animate({'scrollTop':"0px"},0);
  $("#home").addClass("nav-active");
  $(".box").fadeOut(0);
  //click nav elems
  $scope.show_box = function(elem){
  $(".box").fadeOut(0);
  $(".navelem").find("a").removeClass("nav-active");
  $("#"+elem).addClass("nav-active");
  idd = "#"+elem+"-box";
  if(elem != 'home')
  {
    $(".questionsContainer").css({'-webkit-transform':"rotateY(90deg)",'transform':"rotateY(90deg)"});;
    $(idd).fadeIn(0).css({'-webkit-transform':"rotateY(0deg)",'transform':"rotateY(0deg)"});
  }
  else
  {
     $(".questionsContainer").css({'-webkit-transform':"rotateY(0deg)",'transform':"rotateY(0deg)"});;
  }
  };

}]);


/*QUESTIONS*/
myApp.controller('questionsController',['$scope','$window','$rootScope','$http','$location','$timeout','$sce','$auth','$cookieStore','SAAccessFac',function($scope,$window,$rootScope,$http,$location,$timeout,$sce,$auth,$cookieStore,SAAccessFac){

//console.log("Entering QuestionsController here");

$rootScope.isLoggedin = $auth.isAuthenticated();


if($rootScope.isLoggedin)
{
  $rootScope.name = $cookieStore.get('name');
  $rootScope.kid = $cookieStore.get('kid');
  if(!$rootScope.name){
      $scope.logout(false);
  }
  SAAccessFac.getPermission();
}
else
{
    SAAccessFac.removePermission();
}

$("html,body").animate({'scrollTop':"0px"});

//timer function

$("#DateCountdown").TimeCircles({
    "animation": "smooth",
    "bg_width": 0.9,
    "fg_width": 0.06666666666666667,
    "circle_bg_color": "#60686F",
    "time": {
        "Days": {
            "text": "Days",
            "color": "rgba(138,42,138,1)",
            "show": false
        },
        "Hours": {
            "text": "Hours",
            "color": "rgba(220,20,60,1)",
            "show": true
        },
        "Minutes": {
            "text": "Minutes",
            "color": "#ff4500",
            "show": true
        },
        "Seconds": {
            "text": "Seconds",
            "color": "#00ffff",
            "show": true
        }
    }
});


//variables
$scope.rospics = [];
$scope.clue = "";
//$rootScope.level = 1;
$scope.ranks = [];


//leaderboard 
// $("#l").click(function(){
// my_kid = $rootScope.kid;
// console.log("kid in leaderboard: "+my_kid);
// $http({method: 'POST',data:$.param({kid:my_kid}), url: 'http://ros.kurukshetra.org.in/ros_scripts/ros_ranklist.php',headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function(data)
//            {
//                                    console.log("Ranks: "+data);
//                                    $scope.ranks = data;   
// console.log($scope.ranks.name);
// console.log($rootScope.kid);       
// console.log($scope.ranks.kid);       
//            });

// });

//ANIMATIONS

//init home box
// $timeout(function(){$("#home-box").fadeIn(100);},500);//popOut later
// $scope.animQuestion = function()
// {
// $("#home-box").fadeIn(100);//popOut later
// }



//close modal

// $scope.close_modal = function(){
// $('#myModal1').hide(0);
// $(".container").css({'filter':"blur(0px)",'-webkit-filter':"blur(0px)"});
// };

//watch path change to different level
$scope.$on('$routeUpdate', function(){
  $location.path($rootScope.level);
//console.log("setting path: "+$location.search().level);
});


//ANIMATIONS DONE
$scope.fetch_question = function(){
//console.log("fetching question for level "+$rootScope.level);
//console.log("MY KID: ",$rootScope.kid);
$scope.col_width = "col-md-3";
$scope.fb_link ="http://techteam.kurukshetra.org.in/gowtham/";

$http({method: 'POST',data: $.param({kid:$rootScope.kid}), url: 'http://ros.kurukshetra.org.in/ros_scripts/ros_get_question.php',headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function(data)
           {
                                    if(data["life"]==0)
                                    $(".fa-heart").addClass("lived");
                                    $scope.rospics = [];
                                    $scope.rospics.length = 0;
                                    num_pics = data["img_count"];
                                    if(data["level"] == null)
                                    {                                     
                                          $("#home-box .ros-pic").hide();
                                           $("#home-box h3").hide();
                                          $("#ans").hide();
                                          $("#submit-ans").hide();
                                          $("#home-box").find(".content").append("<p style='text-align:center;font-size:1.8rem'>Congratulations! You\'ve cleared the RoS Trial Run! Get ready for the Main Run on Jan 29th!</p>");                                
                                          $location.search("level","");
                                          return;
                                    }
                                    $scope.col_width = "col-md-"+(12/num_pics).toString();
                                    $scope.clue = data["clue"];
                                    $rootScope.level = data["level"];                                   
                                    for(i=0;i<num_pics;i++)
                                    {
                                      $scope.rospics[i] = data['img'+i.toString()];
                                    }
                                    //set clues
                                    $rootScope.comment="No source clue";
                                    if($rootScope.level==1) $rootScope.comment="mace-holder,fighter against falsehood";
                                    if($rootScope.level==3) $rootScope.comment="George Harding built this in Gothic Revival architecture.";
                                    if($rootScope.level==6) $rootScope.comment="FF D8";
                                    if($rootScope.level==7) $rootScope.comment="ucjamkcrmpgbbjcqmdrfcqnfglv";
                                    //url hint
                                    var search_hash = "";
                                    if($rootScope.level == 1)      search_hash = "first_level";
                                    else if($rootScope.level == 2)  {    search_hash = "NaiNaiNai";  }
                                    else if($rootScope.level == 4)  {    search_hash = "evl4el";  }
                                    else   search_hash = $rootScope.level;
                                    $location.search("level",search_hash);
                                    //fb_link for comments
                                    $scope.fb_link = "http://ros.kurukshetra.org.in/#/game?level="+search_hash;

                                    //hide lifeline if level = five
                                    if($rootScope.level == 5)
                                          $(".sm").hide();
                                    else
                                          $(".sm").show();
console.log("fb link");
   });
$scope.$on('$viewContentLoaded', function(event) {
console.log("view content load");

$timeout(function() {
console.log("timeout load");
  (function(d, s, id) {
console.log("gtm fb script");
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=438480173009977";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

    },0);
    });

};


//validate ans
$("#submit-ans").click(function(){
$scope.ans = $(this).parent().find(".ans").val();
console.log('answer submitted:'+$scope.ans+" for level: "+$rootScope.level);
var request = $http({
                   method: "post",
                   url:'http://ros.kurukshetra.org.in/ros_scripts/ros_answer_check.php',
                   data: $.param({
                       kid:$rootScope.kid,
                       answer:$scope.ans,
                       level:$rootScope.level
                   }),
                   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                           });

request.success(function (data) {
//console.log(data);
if(data == 'success')
{
                            toastr.clear();
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =5000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
                            toastr.success('You have cleared this level! ','Success');
                            $("#ans").val("");
                            $scope.fetch_question();
}
else
{

    $scope.trollsrc = troll_path+(Math.floor(Math.random()*6)+Math.floor(Math.random()*5)).toString()+".jpg";
    $("#trollModal").show();
    $(".container").css({'filter':"blur(30px)",'-webkit-filter':"blur(30px)"});
    $timeout(function(){
    $("#trollModal").hide();
    $(".container").css({'filter':"blur(0px)",'-webkit-filter':"blur(0px)"});
      },3000);

}

});//request

});//validate


  
//call first question
$scope.fetch_question();

}]);


myApp.controller('loginController',['$rootScope','$scope','$http','$timeout' , '$auth','$route','Account','$location','SAAccessFac','$cookieStore',
          function($rootScope,$scope,$http,$timeout,$auth,$route, Account,$location,SAAccessFac, $cookieStore){

$scope.updates = [];
$rootScope.isLoggedin = $auth.isAuthenticated();


 $scope.register_user= function (array) {

            var request = $http({
              method: "post",
              url:'http://ros.kurukshetra.org.in/partials/register.php',
              data: {
                name:$rootScope.name,
                kid:$rootScope.kid
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                  });
/* Check whether the HTTP Request is successful or not. */
request.success(function (data) {

toastr.clear();                            toastr.options.closeButton = true;                            toastr.options.timeOut =5000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
                             toastr.success('You have been successfully registered for ROS! ','Success');
});
request.error(function(data, status) {
  
toastr.clear();                            toastr.options.closeButton = true;                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
                             toastr.error('Error in registration','Warning');

});
 }
$scope.register = function() {

   if(SAAccessFac.checkPermission())
  {
    //added this to check if the profile is complete or not.
       Account.isincomplete()
        .then(function(response) {
          $scope.incomplete = response.data.incomplete;
          $cookieStore.put('incomplete',$scope.incomplete);
          if($scope.incomplete){
                 toastr.clear();
         toastr.options.closeButton = true;
         toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
         toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
         toastr.error('Please complete your profile to proceed','Profile incomplete');
                
                 //console.log("incomplete"); 

                //VN Note: below code is not working . You faced similar problem la??
                
                 $location.path("/profile");
                 //$scope.$apply();
          }
          else
         {
              //console.log("complete"); 
              //VN add your code here
$scope.register_user();
                 $location.path("/game");
 
          }



      })
        .catch(function(response) {
       //   console.log(response.data.message, response.status);
        toastr.clear();
         toastr.options.closeButton = true;
         toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
         toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
         toastr.error('Error','Warning');
            
        });
         
      
  }
  else {
         toastr.clear();
         toastr.options.closeButton = true;
         toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
         toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
         toastr.error('Please login to Proceed','Warning');
       }

}


$scope.showModal = function() {
$("#myModal").show(100);
   //console.log("show!");  
 };
$scope.hideModal = function() {
  $("#myModal").hide(100);
}
$scope.authenticate = function(provider) {
      
var now = new Date();
var exp = new Date(now.getFullYear()+1,now.getMonth(),now.getDate()+5);
//console.log(exp);
      $auth.authenticate(provider)
        .then(function(response) {
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500;               //redirect user to home if it does not have permission.
          
         //console.log(response.data);
        //  console.log(response.data.name);
         // console.log(response.data.sa_id);
          $rootScope.sa_id = response.data.sa_id;
          $rootScope.kid = response.data.kid;
          $rootScope.name = response.data.name;
          $rootScope.isProfileInComplete = response.data.incomplete;
          toastr.success('Signed in successfully','Welcome '+$rootScope.name);
          $cookieStore.put('name',$rootScope.name,{expires: exp});
          $cookieStore.put('sa_id',$rootScope.sa_id,{expires: exp});
          $cookieStore.put('kid',$rootScope.kid,{expires: exp});
          $cookieStore.put('incomplete',$rootScope.isProfileInComplete);
          //console.log("checkin profile "+ $rootScope.isProfileInComplete);
          $rootScope.isLoggedin = true;
          SAAccessFac.getPermission();
          if($rootScope.isProfileInComplete){
            $location.path("/profile");
          }
          else{
            $route.reload();
          }
        })
        .catch(function(response) { toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500; 
                              toastr.error("Error Signing in",response.status);
       });
    };

    $scope.logout = function(showToast) {
    showToast = showToast !== false;
      SAAccessFac.removePermission();
    if (!$auth.isAuthenticated()) {
      //console.log("returning");
      return;

    }
    $auth.logout()
      .then(function() {
                           if(showToast){
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500; 
                              toastr.info("Logged out successfully"); }
                           $rootScope.isLoggedin = false;
              $cookieStore.remove('name');
              $cookieStore.remove('kid');
              $location.path('/');
              $route.reload();
        
      });
   };


if($rootScope.isLoggedin)
{
  $rootScope.name = $cookieStore.get('name');
  $rootScope.kid = $cookieStore.get('kid');
  if(!$rootScope.name){
      $scope.logout(false);
  }
  SAAccessFac.getPermission();
}
else
{
    SAAccessFac.removePermission();
}
 
}]);

//Profile
myApp.controller('ProfileCtrl', ['$rootScope','$http','$location','$scope','$auth', 'Account',function($rootScope,$http,$location,$scope, $auth, Account) {

//hide all divs
$(".details").hide();

if(document.getElementById('student').checked) {
$(".student-details").fadeIn(100);
}
else if(document.getElementById('school').checked) {
 $(".school-details").fadeIn(100);
 }
 else if(document.getElementById('working').checked) {
  $(".working-details").fadeIn(100);
 }


$(".participant").click(function(){
  var pid = $(this).attr("id");
  $(".details").fadeOut(0);
  $("."+pid+"-details").fadeIn(100); 
});



    
$http({method: 'GET', url: 'http://ros.kurukshetra.org.in/colleges.json'}).success(function(data)
           {
             $scope.colleges = data;
           });
$http({method: 'GET', url: 'http://ros.kurukshetra.org.in/courses.json'}).success(function(data)
           {
             $scope.courses = data;
           });
$http({method: 'GET', url: 'http://ros.kurukshetra.org.in/degrees.json'}).success(function(data)
           {
             $scope.degrees = data;
           });
    $scope.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          $scope.user = response.data;
        })
        .catch(function(response) {
       //   console.log(response.data.message, response.status);
        });
    };
    $scope.updateProfile = function() {


      Account.updateProfile($scope.user)
        .then(function() {
        flag = 0;
        type = $("input[name=student]:checked").val();
       
  if( type == 'college' )
  {
                $(".student-details").show();
               
    yr = $("#student-year").val();
    college = $("#student-college").val();
    course = $("#student-course").val();
                
                if( yr == '' || college == '' || course == '' )//not selected reqd fields!
                 {flag = 0;
                            toastr.options.closeButton = true;
                            //toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            //toastr.options.extendedTimeOut = 1500; 
                            toastr.error("Fill in Year, College and Course");
                            flag = 1;
                    
                 }
                
                   
  }

         else if( type == 'school' )
  {flag = 0;

                $(".school-details").show();
    name = $("#school-name").val();
    grade = $("#school-grade").val();
    
                
                if( name == '' || grade == '' )//not selected reqd fields!
                 {
                            toastr.options.closeButton = true;
                            //toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            //toastr.options.extendedTimeOut = 1500; 
                            toastr.error("Fill in School Name and Grade!");
                            flag = 1;
                    
                 }
                   
  }
        
        else if( type == 'working' )
  {flag = 0;

                $(".working-details").show();
    name = $("#company-name").val();
    des = $("#company-des").val();
    
                
                if( name == '' || des == '' )//not selected reqd fields!
                 {
                            toastr.options.closeButton = true;
                            //toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            //toastr.options.extendedTimeOut = 1500; 
                            toastr.error("Fill in Company Name and Designation!");
                            flag = 1;
                    
                 }
                   
  }
        
        if( flag == 0 )
        {
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500; 
                            toastr.success('ros! Profile has been updated!',"Success");
                            $location.path("/");
       
        }


        })
        .catch(function(response) {
                            toastr.options.closeButton = true;
                            toastr.options.timeOut =3000 ; // How long the toast will display without user interaction
                            toastr.options.extendedTimeOut = 1500; 
                            toastr.error("Error in updating", response.status);
        });
    };
    if(!$auth.isAuthenticated()){
      console.log("Authenticated in Profile");
        $location.path('#');
    }
    $scope.getProfile();
  }]);

//downloadsController
myApp.controller('downloadsController',['$rootScope','$scope','$http','$timeout' , '$auth','$route','Account','$location','SAAccessFac','$cookieStore',
          function($rootScope,$scope,$http,$timeout,$auth,$route, Account,$location,SAAccessFac, $cookieStore){
  alert("trying to download");
  }]);

                                                    
    