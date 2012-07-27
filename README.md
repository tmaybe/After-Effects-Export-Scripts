After Effects Export Scripts
==========================

These are After Effects scripts for extracting animation information from After Effects and translating it into data that other applications can use. There are currently two scripts. One exports data about animated masks, the other exports position data.

_HOW TO USE_

1. Select a layer with one or more animated masks on it (to export mask data) or with a position animation (to export position data).
2. Open the script by selecting File -> Scripts -> Run Script File... and selecting the script.

An output file will be created in the same directory as the script with the position information.

_HOW I USE IT_

I'm using it to generate shape data which I use to draw shapes dynamically in an iPad app.

_FUTURE PLANS_

1. Error checking–make sure a layer is selected, that it has exportable data, etc.
2. Handle multiple layers with animated masks in a single composition.
3. Export to multiple useful formats.
4. For the animated masks, optionally export additional data about vertices for less angular shapes (inTangents, outTangents, closed)
5. Add sample source and output files
6. Add sample files for reading and drawing the data in an iPad app
