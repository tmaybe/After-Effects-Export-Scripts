export-after-effects-masks
==========================

This is an After Effects script for extracting position information about animated masks. For example, if there's a mask with 15 vertices that changes shape from frame to frame, this script will export the position of each of those vertices for each frame.

_HOW TO USE_

1. Select a layer with one or more animated masks on it.
2. Open the script by selecting File -> Scripts -> Run Script File... and selecting the script.

An output file will be created in the same directory as the script with the position information.

_HOW I USE IT_

I'm using it to generate shape data which I use to draw shapes dynamically in an iPad app.

_FUTURE PLANS_

1. Error checking–make sure a layer is selected, that it has masks, etc.
2. Handle multiple layers with animated masks in a single composition.
3. Export to useful formats.
4. Optionally export additional data about vertices for less angular shapes (inTangents, outTangents, closed)
5. Add sample source and output files
6. Add sample files for reading and drawing the data in an iPad app
