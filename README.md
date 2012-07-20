export-after-effects-masks
==========================

This is an After Effects script for extracting position information about animated masks. For example, if there's a mask with 15 vertices that changes shape from frame to frame, this script will export the position of each of those vertices for each frame.

_HOW TO USE_

1. Select a layer with an animated mask on it.
2. Open the script by selecting File -> Scripts -> Run Script File... and selecting the script.

A file for each mask will be created in the same directory as the script with the position information.

_KNOWN BUGS_

The script will generate data for each frame of a composition, so if the selected layer is shorter than the composition, it will be padded with duplicate data at the beginning and/or end.

_FUTURE PLANS_

1. Handle multiple layers with animated masks in a single composition.
2. Export to useful formats.
3. Optionally export additional data about vertices for less angular shapes (inTangents, outTangents, closed)
