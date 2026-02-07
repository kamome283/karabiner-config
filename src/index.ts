import {mapPointingButton, rule, writeToProfile} from "karabiner.ts";
import {definitions} from "./definitions";
import {defsToManipulators} from "./manipulatorCreation";

const manipulators = defsToManipulators(definitions);

// `npm run build`で設定の書き換えを行う
writeToProfile("Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283", [
  rule("Key mapping").manipulators(manipulators),
  // トラックポイントのボタンに関する設定
  rule("Middle click as a Ctrl").manipulators([
    mapPointingButton("button3", undefined, "any")
      .to("left_control", undefined, {lazy: true}),
  ]),
]);
