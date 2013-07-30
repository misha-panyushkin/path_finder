var PathFinder = function (undefined) {

    var pi             = 3.14159265359,
        touch_limen    = 50;

    var PathFinder = function (rect) {
        this.startX = 0;
        this.startY = 0;
        this.shiftX = 0;
        this.shiftY = 0;

        this.touchShiftX = 0;
        this.touchShiftY = 0;

        this.distanceX = 0;
        this.distanceY = 0;

        this.angle = 0;
        this.vector = 0;

        this.startTime = 0;
        this.endTime = 0;
        this.speed = 0;

        this.preferable_plane = 0;
        this.preferable_way = 0;

        this.identifier = undefined;

        for (var i in rect) if (rect.hasOwnProperty(i)) {
            this[i] = rect[i];
        }
    };

    PathFinder.could = PathFinder.prototype = {

        setStartPoint: function (X, Y, ID) {
            this.startX    =  X ? X : 0;
            this.startY    =  Y ? Y : 0;

            this.shiftX    = this.shiftY = 0;

            this.startTime = new Date;
            this.preferable_plane = 0;
            this.identifier = ID || this.identifier;

            return this;
        },

        setPoint: function (X, Y) {
            this.shiftX   =  X ? X - this.startX : 0;
            this.shiftY   =  Y ? Y - this.startY : 0;

            this.distanceX = this.shiftX + this.touchShiftX;
            this.distanceY = this.shiftY + this.touchShiftY;

            setAngle (this);

            setPreferablePlane (this);

            setPreferableWay (this);

            this.vector = parseInt(12*this.angle/360) || 12;

            this.endTime = new Date;

            setSpeed (this);

            return this;
        },

        setTouchShift: function () {
            this.touchShiftX   +=  this.shiftX;
            this.touchShiftY   +=  this.shiftY;

            return this;
        }
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

    return PathFinder;
}();