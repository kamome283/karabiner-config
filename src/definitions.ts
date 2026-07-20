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
  [["grave_accent_and_tilde"], ["equal_sign", "shift"]], // ZenHan => ~
  [["2", "left_shift"], ["international3", "shift"]], // Shift + 2 => |
  [["7", "left_shift"], ["quote", "shift"]], // Shift + 7 => *
  [["0", "left_shift"], ["semicolon", "shift"]], // Shift + 0 => +
  // Top row
  [["open_bracket"], ["close_bracket"]], // @ => [
  [["open_bracket", ["left_shift"]], ["close_bracket", ["shift"]]], // Shift + @ => {
  [["close_bracket"], ["non_us_pound"]], // [ => ]
  [["close_bracket", ["left_shift"]], ["non_us_pound", ["shift"]]], // Shift + [ => }
  // Middle row
  [["caps_lock"], ["semicolon"]], // CapsLock => ;
  [["caps_lock", "left_shift"], ["7", "shift"]], // Shift + CapsLock => '
  [["semicolon"], ["hyphen"]], // ; => -
  [["semicolon", "left_shift"], ["hyphen", "shift"]], // Shift + ; => =
  [["quote", "left_shift"], ["2", "shift"]], // Shift + : => "
  [["non_us_pound"], ["open_bracket"]], // ] => @
  [["non_us_pound", "left_shift"], ["open_bracket", "shift"]], // Shift + ] => `
  // Bottom row
  [["left_shift"], ["delete_or_backspace"]], // LShift => BackSpace
  [["international1", "left_shift"], ["international3", "option"]], // Shift + \ => \
  // Modifier keys
  [["spacebar"], ["left_shift"], ["spacebar"]],
  [["japanese_pc_nfer"], ["right_command"], ["escape"]],
  [["japanese_pc_xfer"], ["right_command"], ["return_or_enter"]],
  [["left_option"], ["left_option"], ["japanese_eisuu"]],
  [["japanese_pc_katakana"], ["left_option"], ["japanese_kana"]],
];