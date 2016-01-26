var myApp = angular.module('myAppDirectives',[]);
myApp.directive('compile', ['$compile', function ($compile) {

				return function(scope, element, attrs) {

				var ensureCompileRunsOnce = scope.$watch(

						function(scope) {

						return scope.$eval(attrs.compile);

						},

						function(value) {

						console.log(value);

						element.html(value);

						$compile(element.contents())(scope);

						}

				);

				};

}]);

// GLAnim
myApp.directive('glAnim', function() {
       console.log("glAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
  $(".glCircle").on("click",function(){
  $(".glCircle").removeClass("glBigBorder");
  $(this).addClass("glBigBorder");
});
}
};
});
/*hospi anim*/
myApp.directive('hospiAnim', function() {
        console.log("hospiAnim");
        return{
        scope:{},
        restrict: 'AEC',
        replace:'true',
        link: function(scope,elem,attrs){
        		
  $(".node").click(function(){
  if($(this).hasClass("node-active"))
    return;
  $(".node").removeClass("node-active");
  $(this).addClass("node-active");
  $(".hospi_content").removeClass("hospi_animated");
  var nodeid = $(this).attr("id");
  var total = 6;
  if( $(window).width() >= 640)
  {   
      if(nodeid == total)
        $(".longer-line").css({'width':"100%"});
      else
        $(".longer-line").css({'width':(nodeid*85)/total+"%"});
  }
  else
      $(".longer-line").css({'width':"100%"});
  setTimeout(function(){$(".hospi_content").addClass("hospi_animated");},500);

});       	}
        };
    });
