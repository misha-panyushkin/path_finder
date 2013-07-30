path_finder
===========

Path finder class. Based on two points interaction.

Based on trigonometric circle.

___

Defines the following properties:


    startX:     	type of Number (px),
    startY:     	type of Number (px),
    
	shiftX:   		type of Number (px),
    shiftY:   		type of Number (px),

	touchShiftX:	type of Number (px),
    touchShiftY:	type of Number (px),

	distanceX:  	type of Number (px),
    distanceY:  	type of Number (px),
    
    angle:   		type of Number (degrees),
    vector:   		type of Number (times),

    startTime:  	type of Number (milli sec),
    endTime:   		type of Number (milli sec),
    speed:   		type of Number (px/sec)

    identifier: 	type of Number (touch identifier),

    preferable_plane:  	typeof String (millisec),
    preferable_way:   	typeof String 
						(one of "up", "right", "down", "left"),

	right:			type of Number (px),
	bottom:			type of Number (px),
	left:			type of Number (px),
	top:			type of Number (px),

	width:			type of Number (px),
	height:			type of Number (px)


With following two methods:

	setStartPoint	( X, Y, ID );
	setPoint		( X, Y );
	setTouchShift   ();