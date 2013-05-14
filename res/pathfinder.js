var PathFinder = function () {

    var pi             = 3.14159265359,
        touch_limen    = 10;

    var PathFinder = function () {
        this.startX = 0;
        this.startY = 0;
        this.shiftX = 0;
        this.shiftY = 0;

        this.angle = 0;
        this.vector = 0;

        this.startTime = 0;
        this.endTime = 0;
        this.speed = 0;

        this.preferable_plane = 0;
        this.preferable_way = 0;
    };

    // Private.
    function setPreferableWay (t) {
        switch (t.preferable_plane) {
            case "horizontal":
                t.preferable_way = t.shiftX > 0 ? "right" : "left";
                break;
            case "vertical":
                // Browser ordinates axis has opposite direction.
                t.preferable_way = t.shiftY > 0 ? "down" : "up";
                break;
            default:
                t.preferable_way = "rollback";
        }
    }

    function setPreferablePlane (t) {
        var x = Math.abs(t.shiftX),
            y = Math.abs(t.shiftY);
        if (x > y) {
            t.preferable_plane = x > touch_limen
                ? "horizontal"
                : "before_touch_limen"
        } else if (x < y) {
            t.preferable_plane = y > touch_limen
                ? "vertical"
                : "before_touch_limen"
        }
    }

    function setAngle (t) {
        // Browser ordinates axis has opposite direction.
        var atan = t.shiftY == 0 || t.shiftX == 0
                ? 0
                : Math.atan( Math.abs( t.shiftX*t.shiftY > 0? t.shiftY/t.shiftX : t.shiftX/t.shiftY ) ),
            angle = atan*180/pi;
        t.angle = angle + (t.shiftX >= 0
            ? t.shiftY < 0 ? 0   : 90
            : t.shiftY > 0 ? 180 : 270);
    }

    function setSpeed (t) {
        var hypothenuse = Math.sqrt( Math.pow(t.shiftX,2) + Math.pow(t.shiftY,2)),
            time = (t.startTime - t.endTime)/1000;
        t.speed = hypothenuse / time;
    }

    // Public.
    PathFinder.prototype.setStartPoint = function (X, Y) {
        this.startX    =  X ? X : 0;
        this.startY    =  Y ? Y : 0;
        this.shiftX    = this.shiftY = 0;
        this.startTime = new Date;
        this.preferable_plane = 0;
    };

    PathFinder.prototype.setPoint = function (X, Y) {
        var t = this;

        t.shiftX   =  X ? X - t.startX : 0;
        t.shiftY   =  Y ? Y - t.startY : 0;

        setAngle (t);

        ! t.preferable_plane && setPreferablePlane (t);

        setPreferableWay (t);

        t.vector = parseInt(12*t.angle/360) || 12;

        t.endTime = new Date;

        setSpeed (t);
    };

    return PathFinder;
}();