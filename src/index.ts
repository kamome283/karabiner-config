import {mapPointingButton, rule, writeToProfile} from "karabiner.ts";
import {definitions} from "./definitions";
import {defsToManipulators} from "./manipulatorCreation";

const manipulators = defsToManipulators(definitions);

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config JSON into console)
// + Create a new profile if needed.
writeToProfile("Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283", [
  rule("Key mapping").manipulators(manipulators),
  rule("Middle click as a Ctrl").manipulators([
    mapPointingButton("button3", undefined, "any")
      .to("left_control", undefined, {lazy: true}),
  ]),
]);
