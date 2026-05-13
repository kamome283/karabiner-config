/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  FromKeyParam,
  FromModifierParam,
  ModifierParam,
  ToEventOptions,
  ToKeyParam,
} from "karabiner.ts";

type FromDefinition = [FromKeyParam: FromKeyParam, FromModifierParam?: FromModifierParam]
export type ToDefinition = [ToKeyParam: ToKeyParam, ModifierParam?: ModifierParam, ToEventOptions?: ToEventOptions]
export type Definition = [From: FromDefinition, To: ToDefinition, ToIfAlone?: ToDefinition]

export const definitions: Definition[] = [
  // Numeric row
  [["2", "left_shift"], ["open_bracket"]], // Shift + 2 => @
  [["6", "left_shift"], ["equal_sign"]],
  [["7", "left_shift"], ["6", "shift"]],
  [["8", "left_shift"], ["quote", "shift"]],
  [["9", "left_shift"], ["8", "shift"]],
  [["0", "left_shift"], ["9", "shift"]],
  [["hyphen"], ["semicolon", "shift"]],
  [["hyphen", "left_shift"], ["international1"]],
  // Top row
  [["open_bracket"], ["close_bracket"]], // @ => [
  [["open_bracket", ["left_shift"]], ["close_bracket", ["shift"]]], // Shift + @ => {
  [["close_bracket"], ["non_us_pound"]], // [ => ]
  [["close_bracket", ["left_shift"]], ["non_us_pound", ["shift"]]], // Shift + [ => }
  // Middle row
  [["caps_lock"], ["hyphen"]], // CapsLock => -
  [["caps_lock", "left_shift"], ["hyphen", "shift"]], // CapsLock => =
  [["semicolon", "left_shift"], ["quote"]], // Shift + ; => :
  [["quote"], ["7", "shift"]], // : => '
  [["quote", "left_shift"], ["2", "shift"]], // Shift + => "
  [["non_us_pound"], ["open_bracket", "shift"]], // ] => `
  [["non_us_pound", "left_shift"], ["equal_sign", "shift"]], // Shift + ] => ~
  // Bottom row
  [["left_shift"], ["delete_or_backspace"]],
  [["international1"], ["international3", "option"]], // Shift + _ => \
  [["international1", "left_shift"], ["international3", "shift"]], // Shift + _ => |
  // Modifier keys
  [["spacebar"], ["left_shift"], ["spacebar"]],
  [["japanese_pc_nfer"], ["right_command"], ["escape"]],
  [["japanese_pc_xfer"], ["right_command"], ["return_or_enter"]],
  [["left_option"], ["left_option"], ["japanese_eisuu"]],
  [["japanese_pc_katakana"], ["left_option"], ["japanese_kana"]],
];