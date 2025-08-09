/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {map, rule, writeToProfile,} from 'karabiner.ts'

type Definition = ReturnType<typeof map>

const symbolDefinitions: Definition[] = [
  // Numeric row
  map('2', 'shift').to('open_bracket', 'shift'), // Shift + 2 => @
  map('7', 'shift').to('international3', 'shift'), // Shift + 7 => |
  map('0', 'shift').to('open_bracket', 'shift'), // Shift + 0 => `
  map('hyphen').to('equal_sign'), // - => ^
  map('hyphen', 'shift').to('equal_sign', 'shift'), // Shift + - => ~
  // Top row
  map('open_bracket').to('close_bracket'), // @ => [
  map('open_bracket', 'shift').to('close_bracket', 'shift'), // Shift + @ => {
  map('close_bracket').to('non_us_pound'), // [ => ]
  map('close_bracket', 'shift').to('non_us_pound', 'shift'), // Shift + [ => }
  // Middle row
  map('caps_lock').to('7', 'shift'), // CapsLock => '
  map('caps_lock', 'shift').to('2', 'shift'), // Shift + CapsLock => "
  map('semicolon').to('hyphen'), // ; => -
  map('semicolon', 'shift').to('hyphen', 'shift'), // Shift + ; => =
  map('non_us_pound').to('semicolon'), // ] => ;
  map('non_us_pound', 'shift').to('semicolon', 'shift'), // Shift + ] => +
  // Bottom row
  map('international1', 'shift').to('international3', 'option'), // Shift + _ => \
]

// Modifier keys mapping
const modifierDefinitions: Definition[] = [
  map('spacebar').to('left_shift').toIfAlone('spacebar'), // Space => LeftShift with Space
  map('japanese_pc_nfer').to('left_command').toIfAlone('escape'), // MuHenkan => LeftCommand with Escape
  map('japanese_pc_xfer').to('right_command').toIfAlone('return_or_enter'), // Henkan => RightCommand with Return
  map('japanese_pc_katakana').to('left_control', ['left_option', 'left_shift']).toIfAlone('f19'), // Katakana => LeftControl + LeftOption + LeftShift with F19
  map('left_option').to('left_option').toIfAlone('tab'), // LeftOption => LeftOption with Tab
  map('right_option').to('right_option').toIfAlone('japanese_eisuu'), // RightOption => RightOption with Eng
  map('left_command').to('left_control').toIfAlone('delete_or_backspace'), // LeftCommand => LeftControl with Delete/Backspace
  map('print_screen').to('right_control').toIfAlone('japanese_kana'), // PrintScreen => RightControl with Kana
]

const specialDefinitions: Definition[] = [
  map('grave_accent_and_tilde').to('up_arrow'),      // ` => ↑
  map('tab').to('down_arrow'),                       // Tab => ↓
  map('left_shift').to('left_arrow'),                // LeftShift => ←
  map('right_shift').to('right_arrow'),              // RightShift => →
]

// These temporal manipulators are for keeping mandatory keys when modding the layout.
const temporalDefinitions: Definition[] = []

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283', [
  rule('Key mapping').manipulators([
    ...symbolDefinitions,
    ...modifierDefinitions,
    ...specialDefinitions,
    ...temporalDefinitions,
  ]),
])
