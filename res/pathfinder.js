/*
 * The PathFinder class.
 *
 * Created by Misha Panyushkin.
 * misha.panyushkin@gmail.com
 *
 * 01.07.2013
 * */

var PathFinder = function (window, undefined) {

    var pi             = 3.14159265359,
        touch_limen    = .5;

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

        this.plane = undefined;
        this.way = undefined;

        this.identifier = undefined;

        for (var i in rect) if (rect.hasOwnProperty(i)) {
            if (i === "left")
                this[i] = rect[i] + window.scrollX;
            else if (i === "top")
                this[i] = rect[i] + window.scrollY;
            else
                this[i] = rect[i];
        }
    };

    PathFinder.could = PathFinder.prototype = {

        setStartPoint: function (X, Y, ID) {
            this.startX    =  X ? X : 0;
            this.startY    =  Y ? Y : 0;

            this.shiftX    = this.shiftY = 0;

            this.startTime = new Date;
            this.plane = 0;
            this.identifier = ID || this.identifier;

            return this;
        },

        setPoint: function (X, Y) {
            this.shiftX   =  X ? X - this.startX : 0;
            this.shiftY   =  Y ? Y - this.startY : 0;

            this.distanceX = this.shiftX + this.touchShiftX;
            this.distanceY = this.shiftY + this.touchShiftY;

            setAngle (this);

            !this.plane && setPreferablePlane (this);

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
        switch (t.plane) {
            case "aflat":
                t.way = t.shiftX > 0 ? "right" : "left";
                break;
            case "upright":
                // Browser ordinates axis has opposite direction.
                t.way = t.shiftY > 0 ? "down" : "up";
                break;
            default:
                t.way = "rollback";
        }
    }

    function setPreferablePlane (t) {
        var x = Math.abs(t.shiftX),
            y = Math.abs(t.shiftY);
        if (x > y) {
            t.plane = x > touch_limen
                ? "aflat"
                : "atStart"
        } else if (x < y) {
            t.plane = y > touch_limen
                ? "upright"
                : "atStart"
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
            time = (t.endTime - t.startTime)/1000;
        t.speed = hypothenuse / time;
    }

    return PathFinder;
} (window) ;