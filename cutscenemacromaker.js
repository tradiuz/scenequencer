let cutsceneActions = [];
function openInitialDialog() {
  let d = new Dialog({title: "Cutscene Macro Maker", content: `
  <style>
      .cutscene-maker-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
      }
      .cutscene-maker-button {
          text-align: center;
          padding: 5px;
          border: 1px solid #ccc;
          cursor: pointer;
      }
      .cutscene-maker-finish {
          grid-column: 1 / -1; 
          text-align: center;
          padding: 5px;
          border: 1px solid #ccc;
          cursor: pointer;
      }
  </style>
  <div class="cutscene-maker-buttons">
      <div class="cutscene-maker-button" id="cameraButton">Camera</div>
      <div class="cutscene-maker-button" id="sceneButton">Switch Scene</div>
      <div class="cutscene-maker-button" id="movementButton">Token Movement</div>
      <div class="cutscene-maker-button" id="showhideButton">Show/Hide Token</div>
      <div class="cutscene-maker-button" id="chatButton">Chat</div>
      <div class="cutscene-maker-button" id="branchButton">Conditional Branch</div>
      <div class="cutscene-maker-button" id="flashButton">Screen Flash</div>
      <div class="cutscene-maker-button" id="shakeButton">Screen Shake</div>
      <div class="cutscene-maker-button" id="tileButton">Tile Movement</div>
      <div class="cutscene-maker-button" id="doorButton">Door State</div>
      <div class="cutscene-maker-button" id="lightButton">Light State</div>
      <div class="cutscene-maker-button" id="ambientButton">Ambient Sound State</div>
      <div class="cutscene-maker-button" id="imageButton">Show Image</div>
      <div class="cutscene-maker-button" id="animationButton">Play Animation</div>
      <div class="cutscene-maker-button" id="soundButton">Play Sound</div>
      <div class="cutscene-maker-button" id="playlistButton">Change Playlist</div>
      <div class="cutscene-maker-button" id="fadeoutButton">Fade Out</div>
      <div class="cutscene-maker-button" id="fadeinButton">Fade In</div>
      <div class="cutscene-maker-button" id="hideUIButton">Hide UI</div>
      <div class="cutscene-maker-button" id="showUIButton">Show UI</div>
      <div class="cutscene-maker-button" id="effectsButton">Weather/Particle Effects</div>
      <div class="cutscene-maker-button" id="roomKeyButton">Location Banner</div>
      <div class="cutscene-maker-button" id="macroButton">Run Macro</div>
      <div class="cutscene-maker-button" id="waitButton">Wait</div>
      <div class="cutscene-maker-finish" id="finishButton">Export Macro</div>
  </div>
  `, buttons: {}, render: html => {
    const closeDialogAndExecute = actionFunction => {
      d.close();
      actionFunction();
    };
    html.find("#cameraButton").click(() => closeDialogAndExecute(addCameraPositionAction));
    html.find("#sceneButton").click(() => closeDialogAndExecute(addSwitchSceneAction));
    html.find("#chatButton").click(() => closeDialogAndExecute(addChatCommandAction));
    html.find("#movementButton").click(() => closeDialogAndExecute(addTokenMovementAction));
    html.find("#showhideButton").click(() => closeDialogAndExecute(addHideToggleAction));
    html.find("#branchButton").click(() => closeDialogAndExecute(addConditionalBranchAction));
    html.find("#flashButton").click(() => closeDialogAndExecute(addScreenFlashAction));
    html.find("#shakeButton").click(() => closeDialogAndExecute(addScreenShakeAction));
    html.find("#tileButton").click(() => closeDialogAndExecute(addTileMovementAction));
    html.find("#macroButton").click(() => closeDialogAndExecute(addRunMacroAction));
    html.find("#waitButton").click(() => closeDialogAndExecute(addWaitAction));
    html.find("#doorButton").click(() => closeDialogAndExecute(addDoorStateAction));
    html.find("#lightButton").click(() => closeDialogAndExecute(addLightStateAction));
    html.find("#ambientButton").click(() => closeDialogAndExecute(addAmbientSoundStateAction));
    html.find("#effectsButton").click(() => closeDialogAndExecute(addWeatherEffectAction));
    html.find("#imageButton").click(() => closeDialogAndExecute(addImageDisplayAction));
    html.find("#animationButton").click(() => closeDialogAndExecute(addAnimationAction));
    html.find("#soundButton").click(() => closeDialogAndExecute(addPlaySoundAction));
    html.find("#playlistButton").click(() => closeDialogAndExecute(addPlayPlaylistAction));
    html.find("#fadeoutButton").click(() => closeDialogAndExecute(addFadeOutAction));
    html.find("#fadeinButton").click(() => closeDialogAndExecute(addFadeInAction));
    html.find("#hideUIButton").click(() => closeDialogAndExecute(addHideUIAction));
    html.find("#showUIButton").click(() => closeDialogAndExecute(addShowUIAction));
    html.find("#roomKeyButton").click(() => closeDialogAndExecute(addRoomKeyAction));
    html.find("#finishButton").click(() => closeDialogAndExecute(outputCutsceneScript));
  }});
  d.render(true);
}
function addCameraPositionAction() {
  new Dialog({title: "Camera Position Action", content: `
      <form>
        <div class="form-group">
          <label for="panDuration">Pan Duration (in milliseconds):</label>
          <input type="number" id="panDuration" name="panDuration" value="1000" step="100" style="width: 100%;">
        </div>
      </form>
      <p>Current position and zoom level will be used.</p>
    `, buttons: {ok: {label: "Add", callback: html => {
    const duration = html.find("#panDuration").val();
    const viewPosition = canvas.scene._viewPosition;
    cutsceneActions.push(`
            (async function() {
              await canvas.animatePan({
                x: ${viewPosition.x},
                y: ${viewPosition.y},
                scale: ${viewPosition.scale},
                duration: ${duration}
              });
              await new Promise(resolve => setTimeout(resolve, ${duration}));
            })();
          `.trim());
    ui.notifications.info("Camera position action added to the cutscene.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addSwitchSceneAction() {
  new Dialog({title: "Switch Scene", content: `
      <form>
        <div class="form-group">
          <label for="sceneId">Scene ID:</label>
          <input type="text" id="sceneId" name="sceneId" placeholder="Enter the scene ID here" style="width: 100%;">
        </div>
      </form>
      <p>Enter the ID of the scene you wish to switch to.</p>
    `, buttons: {add: {label: "Add Scene Switch", callback: html => {
    const sceneId = html.find("#sceneId").val();
    cutsceneActions.push(`
              (async function() {
                const scene = game.scenes.get("${sceneId}");
                if (scene) {
                  await scene.view();
                  console.log("Switched to scene: " + scene.name);
                } else {
                  console.error("Scene not found with ID: ${sceneId}");
                }
              })();
            `);
    ui.notifications.info("Scene switch action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addChatCommandAction() {
  if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn("Please select exactly one token.");
    openInitialDialog();
    return;
  }
  const selectedToken = canvas.tokens.controlled[0];
  new Dialog({title: "Chat Command", content: `
      <form>
        <div class="form-group">
          <label for="messageContent">Message:</label>
          <input type="text" id="messageContent" name="messageContent" style="width: 100%;">
        </div>
      </form>
      <p>Enter the message you want the selected token to say in chat. This will be added to your cutscene script.</p>
    `, buttons: {ok: {label: "Add", callback: html => {
    const messageContent = html.find("#messageContent").val();
    cutsceneActions.push(`
            (async function() {
              const speaker = { alias: "${selectedToken.name}", token: "${selectedToken.id}", actor: "${selectedToken.actor.id}" };
              const content = "${messageContent.replace(/"/g, '\\"')}";
              ChatMessage.create({ speaker, content });
            })();
          `.trim());
    ui.notifications.info("Chat command action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addTokenMovementAction() {
  if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn("Please select exactly one token.");
    openInitialDialog();
    return;
  }
  const selectedToken = canvas.tokens.controlled[0];
  new Dialog({title: "Token Movement", content: `
        <p>Move the selected token to the new position, then click OK.</p>
        <form>
          <div class="form-group">
            <label for="animatePan">Enable Screen Panning:</label>
            <input type="checkbox" id="animatePan" name="animatePan" value="1" style="margin-top: 5px;">
            <p style="font-size: 0.8em; margin-top: 5px;">Camera Panning.</p>
          </div>
          <div class="form-group">
            <label for="teleport">Teleport:</label>
            <input type="checkbox" id="teleport" name="teleport" style="margin-top: 5px;">
            <p style="font-size: 0.8em; margin-top: 5px;">Instantly move to the new position without animation.</p>
          </div>
        </form>
      `, buttons: {ok: {label: "OK", callback: html => {
    const newPosition = {x: selectedToken.x, y: selectedToken.y};
    const animatePan = html.find("#animatePan")[0].checked;
    const teleport = html.find("#teleport")[0].checked;
    let tokenMovementScript;
    if (teleport) {
      tokenMovementScript = `
                (async function() {
                  const token = canvas.tokens.get("${selectedToken.id}");
                  if (token) {
                    await token.document.update({ x: ${newPosition.x}, y: ${newPosition.y} }, {animate: false});
                  }
                })();
              `;
    } else {
      tokenMovementScript = `
                (async function() {
                  const token = canvas.tokens.get("${selectedToken.id}");
                  if (token) {
                    await token.document.update({ x: ${newPosition.x}, y: ${newPosition.y} });
                    ${animatePan ? `await canvas.animatePan({ x: ${newPosition.x}, y: ${newPosition.y}, duration: 1000 });` : ""}
                  }
                  await new Promise(resolve => setTimeout(resolve, 1000)); 
                })();
              `;
    }
    cutsceneActions.push(tokenMovementScript.trim());
    ui.notifications.info(`Token ${teleport ? "teleported" : "movement"} action added to the cutscene.`);
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addHideToggleAction() {
  if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn("Please select exactly one token.");
    openInitialDialog();
    return;
  }
  const selectedToken = canvas.tokens.controlled[0];
  cutsceneActions.push(`
    (async function() {
      const token = canvas.tokens.get("${selectedToken.id}");
      if (token) {
        await token.document.update({hidden: !token.data.hidden});
        console.log("Token visibility toggled: " + (!token.data.hidden ? "Visible" : "Hidden"));
      } else {
        console.error("Token not found with ID: ${selectedToken.id}");
      }
    })();
  `);
  ui.notifications.info("Token hide/toggle action added to the cutscene script.");
  openInitialDialog();
}
function addConditionalBranchAction() {
    function renderDialog() {
        let dialogContent = `
            <style>
                .choice-input-set {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;
                }
                .choice-input-set input {
                    flex: 1;
                    margin-right: 5px;
                }
                #add-choice {
                    margin-top: 10px;
                }
            </style>
            <div id="conditional-choices-container">
                <p>Add choices and corresponding macros. Use the '+' button to add more choices.</p>
                <div class="choice-input-set">
                    <input type="text" placeholder="Choice Text" class="choice-text" style="margin-right: 5px;">
                    <input type="text" placeholder="Macro Name" class="macro-name">
                </div>
            </div>
            <button type="button" id="add-choice">Add Choice</button>
        `;

        const d = new Dialog({
            title: "Configure Conditional Branch",
            content: dialogContent,
            buttons: {
                done: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Done",
                    callback: html => {
                        const choiceTexts = html.find(".choice-text").map(function() { return $(this).val(); }).get();
                        const macroNames = html.find(".macro-name").map(function() { return $(this).val(); }).get();

                        choices = choiceTexts.map((text, index) => ({ text, macro: macroNames[index] }));

                        generateConditionalBranchScript();
                    }
                },
                cancel: {
                    label: "Cancel",
                    callback: () => openInitialDialog()
                }
            },
            render: html => {
                html.find("#add-choice").click(() => {
                    const container = html.find("#conditional-choices-container");
                    container.append(`
                        <div class="choice-input-set">
                            <input type="text" placeholder="Choice Text" class="choice-text" style="margin-right: 5px;">
                            <input type="text" placeholder="Macro Name" class="macro-name">
                        </div>
                    `);
                });
            }
        });
        d.render(true);
    }
    function generateConditionalBranchScript() {
        let scriptContent = `
            async function executeMacroByName(macroName) {
                const macro = game.macros.contents.find(m => m.name === macroName);
                if (macro) {
                    await macro.execute();
                } else {
                    console.error("Macro not found: " + macroName);
                }
            }
    
            new Dialog({
                title: "Choose an Action",
                content: "<p>What would you like to do?</p>",
                buttons: {`;
    
        choices.forEach((choice, index) => {
            scriptContent += `
                    'choice${index}': {
                        label: "${choice.text}",
                        callback: () => {
                            executeMacroByName("${choice.macro}");
                        }
                    },`;
        });
    
        scriptContent += `
                },
                default: 'choice0'
            }).render(true);
        `;
    
        cutsceneActions.push(scriptContent);
        console.log("Conditional branch action added.");
        openInitialDialog();
    }

    renderDialog();
}
function addRunMacroAction() {
  new Dialog({title: "Run Macro Action", content: `
      <form>
        <div class="form-group">
          <label for="macroName">Macro Name:</label>
          <input type="text" id="macroName" name="macroName" placeholder="Enter macro name here" style="width: 100%;">
        </div>
      </form>
      <p>Enter the name of the macro you wish to run.</p>
    `, buttons: {ok: {label: "Add", callback: html => {
    const macroName = html.find("#macroName").val();
    cutsceneActions.push(`
            (async function() {
              const macro = game.macros.find(m => m.name === "${macroName}");
              if (macro) {
                await macro.execute();
              } else {
                console.warn("Macro not found: ${macroName}");
              }
            })();
          `.trim());
    ui.notifications.info("Run Macro added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addWaitAction() {
  new Dialog({title: "Wait Duration", content: `
      <form>
        <div class="form-group">
          <label for="waitDuration">Enter wait duration in milliseconds:</label>
          <input type="number" id="waitDuration" name="waitDuration" min="0" step="100" value="1000" style="width: 100%;">
        </div>
      </form>
    `, buttons: {ok: {label: "OK", callback: html => {
    const duration = html.find("#waitDuration").val();
    cutsceneActions.push(`

            await new Promise(resolve => setTimeout(resolve, ${duration}));
          `.trim());
    ui.notifications.info("Wait Timer added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addScreenFlashAction() {
  new Dialog({title: "Add Screen Flash Effect", content: `
    <form>
      <div class="form-group">
        <label for="flashColor">Flash Color (hex):</label>
        <input type="text" id="flashColor" name="flashColor" value="#FFFFFF" placeholder="#FFFFFF" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="flashOpacity">Opacity (0.0 - 1.0):</label>
        <input type="number" id="flashOpacity" name="flashOpacity" step="0.1" min="0.0" max="1.0" value="0.5" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="flashDuration">Duration (milliseconds):</label>
        <input type="number" id="flashDuration" name="flashDuration" step="100" min="100" value="1000" style="width: 100%;">
      </div>
    </form>
  `, buttons: {add: {label: "Add Flash Effect", callback: html => {
    const flashColor = html.find("#flashColor").val();
    const flashOpacity = parseFloat(html.find("#flashOpacity").val());
    const flashDuration = parseInt(html.find("#flashDuration").val());
    cutsceneActions.push(`
            (function() {
              const flashEffect = document.createElement("div");
              flashEffect.style.position = "fixed";
              flashEffect.style.left = 0;
              flashEffect.style.top = 0;
              flashEffect.style.width = "100vw";
              flashEffect.style.height = "100vh";
              flashEffect.style.backgroundColor = "${flashColor}";
              flashEffect.style.opacity = ${flashOpacity};
              flashEffect.style.pointerEvents = "none";
              flashEffect.style.zIndex = "10000";
              document.body.appendChild(flashEffect);

              setTimeout(() => {
                flashEffect.style.transition = "opacity ${flashDuration}ms";
                flashEffect.style.opacity = 0;
              }, 50); 

              setTimeout(() => {
                flashEffect.remove();
              }, ${flashDuration} + 50); 
            })();
          `);
    ui.notifications.info("Screen flash effect added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addScreenShakeAction() {
  new Dialog({title: "Add Screen Shake Effect", content: `
      <form>
        <div class="form-group">
          <label for="shakeDuration">Duration (milliseconds):</label>
          <input type="number" id="shakeDuration" name="shakeDuration" value="1000" step="100" min="100" style="width: 100%;">
        </div>
        <div class="form-group">
          <label for="shakeSpeed">Speed (frequency of shakes):</label>
          <input type="number" id="shakeSpeed" name="shakeSpeed" value="10" step="1" min="1" style="width: 100%;">
        </div>
        <div class="form-group">
          <label for="shakeIntensity">Intensity (pixel displacement):</label>
          <input type="number" id="shakeIntensity" name="shakeIntensity" value="5" step="1" min="1" style="width: 100%;">
        </div>
      </form>
    `, buttons: {add: {label: "Add Shake Effect", callback: html => {
    const duration = parseInt(html.find("#shakeDuration").val());
    const speed = parseInt(html.find("#shakeSpeed").val());
    const intensity = parseInt(html.find("#shakeIntensity").val());
    cutsceneActions.push(`
              (function() {
                const originalTransform = document.body.style.transform;
                let startTime = performance.now();

                function shakeScreen(currentTime) {
                  const elapsedTime = currentTime - startTime;
                  const progress = elapsedTime / ${duration};
                  if (progress < 1) {
                    let displacement = ${intensity} * Math.sin(progress * ${speed} * 2 * Math.PI);

                    displacement *= 1 - progress; 
                    document.body.style.transform = \`translate(\${displacement}px, \${displacement}px)\`;
                    requestAnimationFrame(shakeScreen);
                  } else {
                    document.body.style.transform = originalTransform;
                  }
                }

                requestAnimationFrame(shakeScreen);
              })();
            `);
    ui.notifications.info("Screen shake effect added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addTileMovementAction() {
  if (canvas.tiles.controlled.length < 1) {
    ui.notifications.warn("Please select at least one tile.");
    openInitialDialog();
    return;
  }

  new Dialog({
    title: "Tile Movement",
    content: `
      <p>Move the selected tiles to the new positions, then click OK.</p>
      <form>
        <div class="form-group">
          <label for="animate">Animate Movement:</label>
          <input type="checkbox" id="animate" name="animate" checked style="margin-top: 5px;">
          <p style="font-size: 0.8em; margin-top: 5px;">Check this if you want the tiles to move smoothly to their new positions.</p>
        </div>
      </form>
    `,
    buttons: {
      ok: {
        label: "OK",
        callback: html => {
          const animate = html.find("#animate")[0].checked;
          let tileMovementScript = `
            (async function() {
              ${canvas.tiles.controlled.map(t => {
                return `canvas.tiles.get("${t.id}").document.update({ x: ${t.x}, y: ${t.y} }, {animate: ${animate}});`;
              }).join('\n              ')}
              await new Promise(resolve => setTimeout(resolve, canvas.tiles.controlled.length * 1000)); 
            })();
          `;
          cutsceneActions.push(tileMovementScript.trim());
          ui.notifications.info("Tile movement action added to the cutscene.");
          openInitialDialog();
        }
      },
      cancel: {
        label: "Cancel",
        callback: openInitialDialog
      }
    },
    default: "ok"
  }).render(true);
}
function addDoorStateAction() {
  if (canvas.walls.controlled.length !== 1) {
    ui.notifications.warn("Please select exactly one door.");
    openInitialDialog();
    return;
  }
  const selectedWall = canvas.walls.controlled[0];
  if (!selectedWall.data.door) {
    ui.notifications.warn("The selected wall is not a door.");
    openInitialDialog();
    return;
  }
  new Dialog({title: "Door Options", content: "<p>Choose an action for the selected door:</p>", buttons: {openClose: {label: "Open/Close", callback: () => {
    cutsceneActions.push(`
            (async function() {
              const wall = canvas.walls.get("${selectedWall.id}");
                if (wall) {
                  let newState = wall.data.ds === CONST.WALL_DOOR_STATES.CLOSED ? CONST.WALL_DOOR_STATES.OPEN : CONST.WALL_DOOR_STATES.CLOSED;
                  await wall.document.update({ds: newState});
                    }
                  })();

                await new Promise(resolve => setTimeout(resolve, 1000));
                `.trim());
    ui.notifications.info("Door open/close toggle added to the cutscene script.");
    openInitialDialog();
  }}, lockUnlock: {label: "Lock/Unlock", callback: () => {
    const isLocked = selectedWall.data.ds === CONST.WALL_DOOR_STATES.LOCKED;
    const newLockState = isLocked ? CONST.WALL_DOOR_STATES.CLOSED : CONST.WALL_DOOR_STATES.LOCKED;
    cutsceneActions.push(`
            (async function() {
              const wall = canvas.walls.get("${selectedWall.id}");
              if (wall) {
                await wall.document.update({ds: ${newLockState}});
              }
            })();
          `.trim());
    ui.notifications.info("Door lock/unlock toggle added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}}).render(true);
}
function addLightStateAction() {
  new Dialog({title: "Light State Action", content: `
      <form>
          <div class="form-group">
              <label for="lightId">Light Source ID:</label>
              <input type="text" id="lightId" name="lightId" placeholder="Enter light source ID here" style="width: 100%;">
          </div>
      </form>
      <p>Enter the light source ID and choose to toggle its state in the cutscene.</p>
  `, buttons: {onOff: {label: "On/Off", callback: html => {
    const lightId = html.find("#lightId").val();
    if (!lightId) {
      ui.notifications.warn("Please enter a light source ID.");
      return;
    }
    cutsceneActions.push(`
                      (async function() {
                          const light = canvas.lighting.get("${lightId}");
                          if (light) {
                              const newVisibility = !light.data.hidden;
                              await light.document.update({hidden: newVisibility});
                              console.log("Light " + (newVisibility ? "enabled" : "disabled") + ".");
                          } else {
                              console.warn("Light source not found with ID: ${lightId}");
                          }
                      })();
                  `);
    ui.notifications.info("Light toggle action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}}).render(true);
}
function addAmbientSoundStateAction() {
  new Dialog({title: "Ambient Sound State Action", content: `
      <form>
          <div class="form-group">
              <label for="soundId">Ambient Sound ID:</label>
              <input type="text" id="soundId" name="soundId" placeholder="Enter ambient sound ID here" style="width: 100%;" autocomplete="off">
          </div>
      </form>
      <p>Toggle the on/off state of the specified ambient sound in your cutscene.</p>
  `, buttons: {toggle: {label: "Toggle On/Off", callback: html => {
    const soundId = html.find("#soundId").val();
    const sound = canvas.scene.sounds.find(s => s.id === soundId);
    if (sound) {
      cutsceneActions.push(`
                        (async function() {
                            const sound = canvas.scene.sounds.find(s => s.id === "${soundId}");
                            if (sound) {
                                const currentHiddenState = sound.data.hidden;
                                await sound.update({hidden: !currentHiddenState});
                                console.log("Ambient sound toggled: " + (!currentHiddenState ? "On" : "Off"));
                            } else {
                                console.error("Ambient sound not found with ID: ${soundId}");
                            }
                        })();
                      `);
      ui.notifications.info("Ambient sound toggle (On/Off) action added to the cutscene script.");
    } else {
      ui.notifications.error("Ambient sound not found with ID: " + soundId);
    }
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "toggle"}).render(true);
}
function addWeatherEffectAction() {
  const weatherTypes = [{name: "None", value: "none"}, {name: "Clouds", value: "clouds"}, {name: "Rain", value: "rain"}, {name: "Snow", value: "snow"}];
  const weatherOptions = weatherTypes.map(type => `<option value="${type.value}">${type.name}</option>`).join("");
  new Dialog({title: "Add Weather Effect", content: `
    <form>
      <div class="form-group">
        <label for="weatherType">Weather Effect:</label>
        <select id="weatherType" name="weatherType" style="width: 100%;">${weatherOptions}</select>
      </div>
      <div class="form-group">
        <label for="density">Density:</label>
        <input type="number" id="density" name="density" step="0.01" min="0" max="1" value="0.5" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="speed">Speed:</label>
        <input type="number" id="speed" name="speed" step="0.1" min="0" value="1" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="scale">Scale:</label>
        <input type="number" id="scale" name="scale" step="0.1" min="0" value="1" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="tint">Tint (hex color):</label>
        <input type="text" id="tint" name="tint" value="#FFFFFF" placeholder="#FFFFFF" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="direction">Direction (degrees):</label>
        <input type="number" id="direction" name="direction" value="90" placeholder="90" step="1" min="0" max="360" value="0" style="width: 100%;">
      </div>
    </form>
  `, buttons: {add: {label: "Add Weather Effect", callback: html => {
    const selectedWeatherType = html.find("#weatherType").val();
    const density = parseFloat(html.find("#density").val());
    const speed = parseFloat(html.find("#speed").val());
    const scale = parseFloat(html.find("#scale").val());
    const tint = html.find("#tint").val();
    const direction = parseInt(html.find("#direction").val());
    cutsceneActions.push(`
            Hooks.call("fxmaster.updateParticleEffects", [
              {
                type: "${selectedWeatherType}",
                options: {
                  density: ${density},
                  speed: ${speed},
                  scale: ${scale},
                  tint: {value: "${tint}", apply: true},
                  direction: ${direction}
                }
              }
            ]);`);
    ui.notifications.info("Weather effect added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addImageDisplayAction() {
  function renderDialog() {
    new Dialog({title: "Add Image Display Action", content: `
            <form>
                <div class="form-group">
                    <label for="imageUrl">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="http://example.com/image.png" style="width: 100%;">
                </div>
            </form>
        `, buttons: {submit: {label: "Submit", callback: html => {
      const imageUrl = html.find("#imageUrl").val();
      if (imageUrl) {
        generateImageDisplayScript(imageUrl);
      } else {
        ui.notifications.warn("No URL provided. Action not added.");
      }
    }}, cancel: {label: "Cancel", callback: () => {
      ui.notifications.info("Image display action cancelled.");
      openInitialDialog();
    }}}, default: "submit"}).render(true);
  }
  function generateImageDisplayScript(imageUrl) {
    cutsceneActions.push(`

            new Dialog({
                title: "Image Display",
                content: \`
                    <div style="text-align: center;">
                        <img src="${imageUrl}" style="border: 0; width: auto; height: auto; max-width: 100%; max-height: 400px;" />
                    </div>\`,
                buttons: {
                    close: {
                        label: "Close",
                        callback: () => {}
                    }
                },
                default: "close",
                render: html => {
                    console.log("Displaying image to all players.");
                }
            }).render(true);
        `);
    console.log("Image display action added to the cutscene script.");
    openInitialDialog();
  }
  renderDialog();
}
function addAnimationAction() {
  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.warn("Please select a token.");
    openInitialDialog();
    return;
  }
  const sourceToken = canvas.tokens.controlled[0];
  let targetedTokens = Array.from(game.user.targets);
  let targetToken = targetedTokens.length > 0 ? targetedTokens[0] : null;
  new Dialog({title: "Add Animation", content: `
    <form>
      <div class="form-group">
        <label for="animationUrl">Animation URL:</label>
        <input type="text" id="animationUrl" name="animationUrl" placeholder="https://example.com/animation.webm" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="scale">Scale:</label>
        <input type="number" id="scale" name="scale" value="1" step="0.1" min="0.1" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="rotation">Rotation (degrees):</label>
        <input type="number" id="rotation" name="rotation" value="0" step="1" style="width: 100%;">
      </div>
      <div class="form-group">
        <label for="duration">Duration (ms):</label>
        <input type="number" id="duration" name="duration" value="1000" step="100" min="100" style="width: 100%;">
      </div>
    </form>
  `, buttons: {add: {label: "Add Animation", callback: html => {
    const animationUrl = html.find("#animationUrl").val();
    const scale = parseFloat(html.find("#scale").val());
    const rotation = parseInt(html.find("#rotation").val());
    const duration = parseInt(html.find("#duration").val());
    let sequencerScript = `new Sequence()`;
    if (targetToken) {
      sequencerScript += `.effect().file("${animationUrl}").attachTo(canvas.tokens.get("${sourceToken.id}")).stretchTo(canvas.tokens.get("${targetToken.id}"))`;
    } else {
      sequencerScript += `.effect().file("${animationUrl}").atLocation(canvas.tokens.get("${sourceToken.id}"))`;
    }
    sequencerScript += `.scale(${scale}).rotate(${rotation}).duration(${duration}).play();`;
    cutsceneActions.push(sequencerScript);
    ui.notifications.info("Animation action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addPlaySoundAction() {
  new Dialog({title: "Play Sound", content: `
      <form>
        <div class="form-group">
          <label for="soundUrl">Sound File URL:</label>
          <input type="text" id="soundUrl" name="soundUrl" placeholder="http://example.com/sound.mp3" style="width: 100%;">
        </div>
      </form>
      <p>Enter the URL of the sound file you wish to play.</p>
    `, buttons: {play: {label: "Add Sound", callback: html => {
    const soundUrl = html.find("#soundUrl").val();
    cutsceneActions.push(`
            (async function() {
              if (typeof AudioHelper !== "undefined" && AudioHelper.play) { 
                AudioHelper.play({src: "${soundUrl}", volume: 0.8, autoplay: true, loop: false}, true);
              } else if (typeof AudioHelper === "undefined" && game.audio) { 
                game.audio.play({src: "${soundUrl}", volume: 0.8, autoplay: true, loop: false});
              } else {
                console.error("Sound playing is not supported in this version of Foundry VTT.");
              }
            })();
          `.trim());
    ui.notifications.info("Sound play action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addPlayPlaylistAction() {
  new Dialog({title: "Play Specific Playlist", content: `
      <form>
        <div class="form-group">
          <label for="playlistName">Playlist Name:</label>
          <input type="text" id="playlistName" name="playlistName" placeholder="Enter the playlist name here" style="width: 100%;">
        </div>
      </form>
      <p>Enter the name of the playlist you wish to start. This will stop all currently playing audio first.</p>
    `, buttons: {add: {label: "Add", callback: html => {
    const playlistName = html.find("#playlistName").val();
    cutsceneActions.push(`
          (async function() {

            const playlists = game.playlists.contents;

            const playingPlaylists = playlists.filter(p => p.playing);

            for (let i = 0; i < playingPlaylists.length; i++) {
                await playingPlaylists[i].stopAll();
            }

            await new Promise(resolve => setTimeout(resolve, 100)); 

            let newPlaylist = playlists.find(p => p.name === "${playlistName}");
            if (newPlaylist) {
                await newPlaylist.playAll();
            } else {
                console.error("Playlist '${playlistName}' not found.");
            }
          })();
          `);
    ui.notifications.info("Playlist action (stop all and play) added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "add"}).render(true);
}
function addFadeOutAction() {
  new Dialog({title: "Fade Out Settings", content: `
          <form>
              <div class="form-group">
                  <label for="fadeDuration">Fade Duration (in milliseconds):</label>
                  <input type="number" id="fadeDuration" name="fadeDuration" value="2000" step="100" style="width: 100%;">
              </div>
          </form>
          <p>The screen will fade to black over the specified duration.</p>
      `, buttons: {ok: {label: "Add", callback: html => {
    const fadeDuration = html.find("#fadeDuration").val();
    cutsceneActions.push(`

                  canvasElement = document.querySelector("canvas#board");

                  canvasElement.style.transition = "filter ${fadeDuration}ms ease-in-out";
                  canvasElement.style.filter = "brightness(0)";

                  await new Promise(resolve => setTimeout(resolve, ${fadeDuration}));
                  `);
    ui.notifications.info("Fade-out effect added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addFadeInAction() {
  new Dialog({title: "Fade In Settings", content: `
          <form>
              <div class="form-group">
                  <label for="fadeDuration">Fade Duration (in milliseconds):</label>
                  <input type="number" id="fadeDuration" name="fadeDuration" value="2000" step="100" style="width: 100%;">
              </div>
          </form>
          <p>The screen will fade from black to normal over the specified duration.</p>
      `, buttons: {ok: {label: "Add", callback: html => {
    const fadeDuration = html.find("#fadeDuration").val();
    cutsceneActions.push(`

                  canvasElement = document.querySelector("canvas#board");

                  canvasElement.style.filter = "brightness(1)";

                  await new Promise(resolve => setTimeout(resolve, ${fadeDuration}));
                  `);
    ui.notifications.info("Fade-in effect added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addHideUIAction() {
  new Dialog({title: "Hide UI Settings", content: `
        <form>
            <div class="form-group">
                <label for="duration">Transition Duration (in milliseconds):</label>
                <input type="number" id="duration" name="duration" value="500" step="100" style="width: 100%;">
            </div>
        </form>
        <p>The UI will slide off screen over the specified duration.</p>
    `, buttons: {ok: {label: "Add", callback: html => {
    const duration = html.find("#duration").val();
    cutsceneActions.push(`
                (async function() {
                    const uiSelectors = ["#ui-left", "#ui-top", "#taskbar", "#ui-right", "#players", "#hotbar"];
                    uiSelectors.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.style.transition = 'transform ${duration}ms ease, opacity ${duration}ms ease';

                            element.style.opacity = '0';
                        }
                    });

                    await new Promise(resolve => setTimeout(resolve, ${duration}));
                })();
                `);
    ui.notifications.info("UI hide action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addShowUIAction() {
  new Dialog({title: "Show UI Settings", content: `
        <form>
            <div class="form-group">
                <label for="duration">Transition Duration (in milliseconds):</label>
                <input type="number" id="duration" name="duration" value="500" step="100" style="width: 100%;">
            </div>
        </form>
        <p>The UI will slide back on screen over the specified duration.</p>
    `, buttons: {ok: {label: "Add", callback: html => {
    const duration = html.find("#duration").val();
    cutsceneActions.push(`
                (async function() {
                    const uiSelectors = ["#ui-left", "#ui-top", "#taskbar", "#ui-right", "#players", "#hotbar"];
                    uiSelectors.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.style.transition = 'transform ${duration}ms ease, opacity ${duration}ms ease';

                            element.style.opacity = '1';
                        }
                    });

                    await new Promise(resolve => setTimeout(resolve, ${duration}));
                })();
                `);
    ui.notifications.info("UI show action added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function addRoomKeyAction() {
  new Dialog({title: "Room-Key Action", content: `
      <form>
        <div class="form-group">
          <label for="roomName">Room Name:</label>
          <input type="text" id="roomName" name="roomName" style="width: 100%;">
        </div>
        <div class="form-group">
          <label for="roomDescription">Description:</label>
          <textarea id="roomDescription" name="roomDescription" rows="4" style="width: 100%;"></textarea>
        </div>
      </form>
    `, buttons: {ok: {label: "Add", callback: html => {
    roomName = html.find("#roomName").val();
    description = html.find("#roomDescription").val();
    imageUrl = "https://assets.forge-vtt.com/5eaf7c1286c5c77a61b3654f/Header-BG.png";
    roomKeyActionScript = `
            (async function() {
              let header = document.createElement('div');
              header.style.position = 'fixed';
              header.style.top = '20%';
              header.style.left = '50%';
              header.style.transform = 'translate(-50%, -50%)';
              header.style.width = 'auto';
              header.style.minWidth = '400px'; 
              header.style.height = '150px'; 
              header.style.padding = '4px';
              header.style.zIndex = 100;
              header.style.borderRadius = '10px';
              header.style.backgroundImage = 'url(' + \`${imageUrl}\` + ')';
              header.style.backgroundSize = 'contain'; 
              header.style.backgroundRepeat = 'no-repeat'; 
              header.style.color = 'white'; 
              header.style.display = 'flex';
              header.style.flexDirection = 'column';
              header.style.justifyContent = 'flex-start'; 
              header.style.alignItems = 'center'; 
              header.style.fontSize = '2.5em';
              header.style.opacity = 0;
              header.style.transition = 'opacity 1s';
              header.style.fontFamily = 'Modesto Condensed';
              header.style.color = '#c5a589';
              header.innerHTML = '<strong>' + \`${roomName}\` + '</strong> ' + \`${description}\`;

              document.body.appendChild(header);

              setTimeout(() => header.style.opacity = 1, 100);

              setTimeout(() => {
                header.style.opacity = 0;
                setTimeout(() => header.remove(), 1000); 
              }, 5000);
            })();
          `;
    cutsceneActions.push(roomKeyActionScript.trim());
    ui.notifications.info("Room Key added to the cutscene script.");
    openInitialDialog();
  }}, cancel: {label: "Cancel", callback: () => openInitialDialog()}}, default: "ok"}).render(true);
}
function outputCutsceneScript() {
  new Dialog({
      title: "Cutscene Script",
      content: `
      <p>Here's your cutscene script. Copy and paste it into a new macro to run it, or make edits directly here.</p>
      <textarea id="cutsceneScriptOutput" style="width: 100%; height: 200px;">${cutsceneActions.join("\n\n")}</textarea>
      <p><button id="copyButton">Copy to Clipboard</button></p>
      `,
      buttons: {
          testRun: {
              label: "Test Run",
              callback: html => {
                  const scriptToRun = html.find("#cutsceneScriptOutput").val();
                  const asyncScript = `(async () => { ${scriptToRun} })();`;

                  try {
                      new Function(asyncScript)();
                      ui.notifications.info("Test run executed successfully.");
                      outputCutsceneScript();
                  } catch (error) {
                      console.error("Error executing cutscene script: ", error);
                      ui.notifications.error("Error executing cutscene script. Check the console for details.");
                  }
                  
                  return false;
              }
          },
          edit: {
              label: "Edit",
              callback: html => {
                  const updatedScript = html.find("#cutsceneScriptOutput").val();
                  cutsceneActions = updatedScript.split("\n\n").filter(action => action.trim() !== "");
                  openInitialDialog();
              }
          },
          close: {
              label: "Close",
          }
      },
      render: html => {
          html.find("#copyButton").click(() => {
              const textarea = html.find("#cutsceneScriptOutput");
              textarea.select();
              document.execCommand("copy");
              ui.notifications.info("Script copied to clipboard!");
          });
      }
  }).render(true);
}
openInitialDialog();
