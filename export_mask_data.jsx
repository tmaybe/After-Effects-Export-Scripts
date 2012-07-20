
function getAndWriteData(comp, layer)
{
	// how many masks?
	var mnum = layer.Masks.numProperties;
	
	// step through the masks and generate a file with points for each one
	for (var mc = 0; mc < mnum; mc++)
	{
		var fnum = 0;
		var file = new File("outlines_" + mc + ".plist");
		if (file.open("w"))
		{
			file.writeln('<?xml version="1.0" encoding="UTF-8"?>');
			file.writeln('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">');
			file.writeln('<plist version="1.0">');
			file.writeln('<array>');
		    for (var t = 0; t < comp.duration; t += comp.frameDuration)
		    {
				// get the vertices as an array (mask numbering starts at 1, that's why I'm adding 1 to mc)
				var mymask = layer.Masks.property(mc + 1).property(1).valueAtTime(t, false);
				var vertices = mymask.vertices;
				// write the vertices to a line of the file
				var writeme = "";
				var numv = vertices.length;
				for (var v = 0; v < numv; v++)
				{
					writeme += "				<string>{" + vertices[v][0] + ", " + vertices[v][1] + "}</string>";
					if (v < numv - 1) { writeme += "\n"; }
				}
			
				file.writeln('	<dict>');
				file.writeln('		<key>frame</key>');
				file.writeln('		<real>' + fnum + '</real>');
				file.writeln('		<key>shapes</key>');
				file.writeln('		<array>');
				file.writeln('			<array>');
				file.writeln(writeme);
				file.writeln('			</array>');
				file.writeln('		</array>');
				file.writeln('	</dict>');			
				fnum++;
		    }
			file.writeln('</array>');
			file.writeln('</plist>');
			file.close();
		}
	}
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);
