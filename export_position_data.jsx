
function getAndWriteData(comp, layer)
{
	// scale the points by this factor
	var scale = 1024 / 1440;
	// total number of frames in the layer
	var numf = (layer.outPoint - layer.inPoint) / comp.frameDuration;
	// first frame in the layer
	var startf = layer.inPoint / comp.frameDuration;
	// the display frame number that will incremented
	var countf = startf;
	// open the file
	var file = new File("position.plist");
	if (file.open("w"))
	{
		// write the plist header
		//file.writeln('<?xml version="1.0" encoding="UTF-8"?>');
		//file.writeln('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">');
		//file.writeln('<plist version="1.0">');
		file.writeln('<dict>');
		file.writeln('	<!-- length:' + numf + ' startframe:' + startf + ' endframe:' + (startf + numf - 1) + ' -->');
		file.writeln('	<key>id</key>');
		file.writeln('	<string>xxx</string>');
		file.writeln('	<key>points</key>');
		file.writeln('	<array>');
		
		// step through the frames
	    for (var t = layer.inPoint; t < layer.outPoint; t += comp.frameDuration)
	    {
			var myp = layer.transform.position.valueAtTime(t, false);
			// write the location to a line of the file
			writeme = "		<string>{" + (myp[0] * scale) + ", " + (myp[1] * scale) + "}</string>";
			file.writeln(writeme);
	    }
		file.writeln('	</array>');
		file.writeln('</dict>');
		//file.writeln('</plist>');
		file.close();
	}
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);
