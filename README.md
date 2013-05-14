path_finder
===========

Path finder class. Based on two points interaction.

Based on trigonometric circle.

___

Defines the following properties:


    startX:     typeof Number (px),
    startY:     typeof Number (px),
    shiftX:   	typeof Number (px),
    shiftY:   	typeof Number (px),

    angle:   	typeof Number (degrees),
    vector:   	typeof Number (times),

    startTime:  typeof Number (millisec),
    endTime:   	typeof Number (millisec),
    speed:   	typeof Number (px/sec),

    preferable_plane:  	typeof String (millisec),
    preferable_way:   	typeof String (one of
						"up", "right", "down", "left")


With following two methods:

	setStartPoint( X, Y, touches );
	setPoint( X, Y, touches );