    var pointsArray = document.getElementsByClassName('point'); //moved the point selector to the global scope

    var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    };


    var animatePoints = function(points) {  // created a function expression with a points parameter in order to 
                                            //pass the elements inot the function when we call it 
        forEach(points, revealPoint);

        for (var i = 0; i < points.length; i++ ) {
                revealPoint(i);
        }
    };


window.onload = function() {
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray); 
        }
    });

}