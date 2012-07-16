
function getAndWriteData(comp, layer)
{
	var fnum = 0;
	var file = new File("test.txt");
	if (file.open("w"))
	{
	    for (var t = 0; t < comp.duration; t += comp.frameDuration)
	    {
			// get the vertices as an array
			var mymask = layer.Masks.property(1).property(1).valueAtTime(t, false);
			var vertices = mymask.vertices;
			// write the vertices to a line of the file
			var writeme = "frame:" + fnum + " vertices: [";
			for (var v = 0; v < vertices.length; v++)
			{
				writeme += "[" + vertices[v][0] + "," + vertices[v][1] + "]";
			}
			writeme += "]";
			
			file.writeln(writeme);
			fnum++;
	    }
		file.close();
	}
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);
