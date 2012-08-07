
function getAndWriteData(comp, layer)
{
	// scale the points by this factor
	var scale = 1024 / 1440;
	// total number of masks in the layer
	var mnum = layer.Masks.numProperties;
	// total number of frames in the layer
	var numf = (layer.outPoint - layer.inPoint) / comp.frameDuration;
	// first frame in the layer
	var startf = layer.inPoint / comp.frameDuration;
	// the display frame number that will incremented
	var countf = startf;
	// open the file
	var file = new File("outlines.plist");
	if (file.open("w"))
	{
		// write the plist header
		file.writeln('<?xml version="1.0" encoding="UTF-8"?>');
		file.writeln('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">');
		file.writeln('<!-- layer with length ' + numf + ' starting at frame ' + startf + ' -->');
		file.writeln('<plist version="1.0">');
		file.writeln('<array>');
		
		// step through the frames
	    for (var t = layer.inPoint; t < layer.outPoint; t += comp.frameDuration)
	    {
			// write the frame header
			file.writeln('	<dict>');
			file.writeln('		<key>frame</key>');
			file.writeln('		<real>' + countf + '</real>');
			file.writeln('		<key>shapes</key>');
			file.writeln('		<array>');
			
			// generate an array of points for each mask on this frame
			for (var mc = 0; mc < mnum; mc++)
			{
				// get the vertices as an array (mask numbering starts at 1, that's why I'm adding 1 to mc)
				var myshape = layer.Masks.property(mc + 1).property(1).valueAtTime(t, false);
				var vertices = myshape.vertices;
				// write the vertices to a line of the file
				var writeme = '			<dict>\n';
				writeme += '				<key>id</key>\n';
				writeme += '				<string>' + layer.Masks.property(mc + 1).name + '</string>\n';
				writeme += '				<key>shape</key>\n';
				writeme += '				<array>\n';
				var numv = vertices.length;
				for (var v = 0; v < numv; v++)
				{
					// scale the values and round them to four decimal places
					var sx = Math.round((vertices[v][0] * scale) * 10000) / 10000;
					var sy = Math.round((vertices[v][1] * scale) * 10000) / 10000;
					writeme += "					<string>{" + sx + ", " + sy + "}</string>\n";
				}
				writeme += '				</array>\n';
				writeme += '			</dict>';
		
				file.writeln(writeme);
			}
			
			// close it up
			file.writeln('		</array>');
			file.writeln('	</dict>');			
			countf++;
	    }
		file.writeln('</array>');
		file.writeln('</plist>');
		file.close();
	}
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);
