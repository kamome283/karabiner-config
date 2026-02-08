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
  [["grave_accent_and_tilde"], ["equal_sign"]], // ZenHan => ^
  [["grave_accent_and_tilde", "shift"], ["equal_sign", "shift"]], // Shift + ZenHan => ~
  [["2", "shift"], ["semicolon", "shift"]], // Shift + 2 => +
  [["0", ["shift"]], ["international3", ["shift"]]], // Shift + 0 => |
  // Top row
  [["open_bracket"], ["close_bracket"]], // @ => [
  [["open_bracket", ["shift"]], ["close_bracket", ["shift"]]], // Shift + @ => {
  [["close_bracket"], ["non_us_pound"]], // [ => ]
  [["close_bracket", ["shift"]], ["non_us_pound", ["shift"]]], // Shift + [ => }
  // Middle row
  [["caps_lock"], ["semicolon"]], // CapsLock => ;
  [["caps_lock", "shift"], ["2", "shift"]], // CapsLock => "
  [["semicolon"], ["hyphen"]], // ; => -
  [["semicolon", "shift"], ["hyphen", "shift"]], // Shift + ; => =
  [["non_us_pound"], ["open_bracket"]], // ] => @
  [["non_us_pound", "shift"], ["open_bracket", "shift"]], // Shift + ] => `
  // Bottom row
  [["left_shift"], ["delete_or_backspace"]],
  [["international1", ["shift"]], ["international3", ["option"]]], // Shift + _ => \
  // Modifier keys
  [["spacebar"], ["left_shift"], ["spacebar"]],
  [["japanese_pc_nfer"], ["right_command"], ["escape"]],
  [["japanese_pc_xfer"], ["right_command"], ["return_or_enter"]],
  [["left_option"], ["left_option"], ["japanese_eisuu"]],
  [["japanese_pc_katakana"], ["left_option"], ["japanese_kana"]],
];