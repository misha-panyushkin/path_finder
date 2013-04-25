var PathFinder = function(){

    var pi = 3.14159265359;

    var PathFinder = function(){
        this.startX = 0;
        this.startY = 0;
        this.shiftX = 0;
        this.shiftY = 0;

        this.angle = 0;
        this.vector = 0;

        this.startTime = 0;
        this.endTime = 0;
        this.speed = 0;

        this.touches = 0;
    };

    PathFinder.prototype.setStartPoint = function(X, Y, touches){
        this.startX    =  X ? X : 0;
        this.startY    =  Y ? Y : 0;
        this.touches   = touches;
        this.shiftX    = this.shiftY = 0;
        this.startTime = new Date;
    };

    PathFinder.prototype.setPoint = function(X, Y, touches){
        var t = this;

        t.shiftX   =  X ? X - t.startX : 0;
        t.shiftY   =  Y ? Y - t.startY : 0;

        t.angle    = function(){
            // Browser ordinates axis has opposite direction.
            var atan = t.shiftY == 0 || t.shiftX == 0
                    ? 0
                    : Math.atan( Math.abs( t.shiftX*t.shiftY > 0? t.shiftY/t.shiftX : t.shiftX/t.shiftY ) ),
                angle = atan*180/pi;
            return angle + (t.shiftX >= 0
                ? t.shiftY < 0 ? 0   : 90
                : t.shiftY > 0 ? 180 : 270);
        }();
        t.vector = parseInt(12*t.angle/360) || 12;

        t.endTime = new Date;
        var hypothenuse = Math.sqrt( Math.pow(t.shiftX,2) + Math.pow(t.shiftY,2)),
            time = (t.startTime - t.endTime)/1000;
        t.speed = hypothenuse / time;

        t.touches  = touches;
    };

    return PathFinder;
}();