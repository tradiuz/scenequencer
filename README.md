# Cutscene Macro Maker (CMM) for Foundry VTT

The Cutscene Macro Maker (CMM) is a tool designed for Game Masters using Foundry Virtual Tabletop (Foundry VTT) to easily script and execute complex cutscenes with minimal coding knowledge. It provides a user-friendly interface to create sequences of actions like camera movements, scene switches, dialogues, and more, enhancing your storytelling with dynamic visual and audio effects.

## Features

- **Camera Control**: Pan the camera to a specific location or token.
- **Scene Switching**: Seamlessly switch between scenes.
- **Dialogues and Chat Messages**: Display chat messages as part of the cutscene.
- **Token Movement**: Animate tokens moving across the map.
- **Visibility Toggle**: Show or hide tokens and tiles.
- **Screen Effects**: Add screen flash and shake effects for dramatic moments.
- **Conditional Branches**: Present choices to players that can alter the flow of the cutscene.
- **Ambient Sound and Music**: Control background music and ambient sounds.
- **Special Effects**: Incorporate weather effects, animations, and lighting changes.
- **User Interface Control**: Show or hide the UI for immersive cutscenes.

## Installation

1. **Manual Installation**: Download the latest release from GitHub and extract it into your Foundry VTT's `Data/modules` directory.
2. **Add Module in Foundry**: Open your Foundry VTT, go to the **Game Settings** tab, select **Manage Modules**, and enable **Cutscene Macro Maker**.

## Usage

1. Open the Cutscene Macro Maker dialog by executing the script in a macro or directly in the console.
2. Click on the action buttons to configure each part of your cutscene. A dialog specific to the selected action will guide you through the setup.
3. After configuring an action, it will be added to the cutscene script. Continue adding actions as desired.
4. Use the **Test Run** button to preview the cutscene.
5. Once satisfied, click the **Export Macro** button to save the script. You can then copy the script to a new macro for execution during your game session.

## Customization

CMM is designed to be flexible. You can edit the generated script manually to fine-tune timings, add custom logic, or integrate with other modules.

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or have found a bug, please open an issue or submit a pull request.

## License

This project is licensed under [MIT License](LICENSE.md).
