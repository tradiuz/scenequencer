# Cutscenequencer for Foundry VTT (Version 11)

The Cutscenequencer Macro  is a tool designed for Game Masters using Foundry Virtual Tabletop (Foundry VTT) to easily script and execute complex cutscenes with minimal coding knowledge. It provides a user-friendly interface to create sequences of actions like camera movements, scene switches, dialogues, and more, enhancing your storytelling with dynamic visual and audio effects.

This fork was redone to leverage sequencer to make all actions serialized.

## Features

- **Camera Control**: Pan and zoom the camera to specific locations or tokens.
- ~~**Scene Switching**: Seamlessly switch between different scenes.~~ (currently broken)
- **Token Movement**: Animate multiple tokens moving across the map.
- **Token Visibility**: Show or hide tokens dynamically.
- **Chat and Dialogues**: Display chat messages or dialogues as part of the cutscene.
- **Screen Flash**: Add dramatic screen flash effects.
- **Screen Shake**: Create intense moments with screen shake effects.
- **Tile Movement**: Animate the movement of tiles within the scene.
- **Door State**: Open, close, lock, or unlock doors within the scene.
- **Light State**: Toggle lights on or off, simulating changes in the environment.
- **Ambient Sound**: Control ambient sounds to enhance the atmosphere.
- **Image Display**: Show images to players for storytelling or clues.
- **Animations**: Play animations for spell effects, environmental changes, etc.
- **Sound Playback**: Include sound effects or voiceovers.
- **Playlist Control**: Change the background music playlist to match the mood.
- **Fade In/Out**: Gradually fade the screen to or from black for transitions.
- **UI Control**: Hide or show the UI for an immersive experience. (requires extra setup with modify-ui.js macro)
- **Weather/Particle Effects**: Simulate weather or special particle effects.
- **Modal Popup**: Display a location banner or room key for new scene introductions. (requires Anarchist Overlay)
- **Run Macro**: Execute other macros as part of the cutscene.
- **Wait**: Add pauses or delays between actions for timing control.
- **Export Macro**: Easily export the created cutscene as a Foundry VTT macro.

## Installation

### Main Installation

1. Paste the contents of the cutscenequencer.js file into a macro and set the type to script, executing this macro will open the cutscene macro maker dialog.

### Helper Macros

1. Paste the contents of modify-ui.js into a macro called `modify-ui`
2. Configure the ownership of `modify-ui` to be "limited" for all players.  
3. Configure to execute as all users.

## Usage

1. Open the Cutscenequencer Macro dialog by executing the script in a macro or directly in the console.
2. Click on the action buttons to configure each part of your cutscene. A dialog specific to the selected action will guide you through the setup.
3. After configuring an action, it will be added to the cutscene script. Continue adding actions as desired.
4. Once satisfied, click the **Export Macro** button to save the script. From this dialog you can do a Test Run of your cutscene. You can then copy the script to a new macro for execution during your game session or some other means of triggering the action sequence like Monks Active Tiles.

## Customization

CM is designed to be flexible. You can edit the generated script manually to fine-tune timings, add custom logic, or integrate with other modules.

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or have found a bug, please open an issue or submit a pull request.

## License

This project is licensed under [MIT License](LICENSE).
