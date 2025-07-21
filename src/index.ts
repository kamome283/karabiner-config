/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  map,
  rule,
  writeToProfile,
} from 'karabiner.ts'

const symbolManipulators = [
  // Numeric row
  map('2', 'shift').to('open_bracket'), // Shift + 2 => @
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
  map('semicolon').to('hyphen'), // ; => -
  map('semicolon', 'shift').to('hyphen', 'shift'), // Shift + ; => =
  map('non_us_pound').to('semicolon'), // ] => ;
  map('non_us_pound', 'shift').to('semicolon', 'shift'), // Shift + ] => +
  // Bottom row
  map('international1', 'shift').to('international3', 'option'), // Shift + _ => \
]

const modifierManipulators = [
  map('japanese_pc_nfer').to('left_command'), // MuHenkan => LeftCommand
  map('japanese_pc_xfer').to('right_command'), // Henkan => RightCommand
  map('japanese_pc_katakana').to('left_control', ["left_option", 'left_shift']), // Katakana => LeftControl + LeftOption + LeftShift
  map('left_command').to('left_control'), // LeftCommand => LeftControl
  map('print_screen').to('right_control'), // PrintScreen => RightControl
];

const arrowManipulators = [
  map('grave_accent_and_tilde').to('up_arrow'), // ZenHan => UpArrow
  map('tab').to('down_arrow'), // Tab => DownArrow
]

const specialManipulators = [
  map('left_shift').to('delete_or_backspace'), // LeftShift => Delete/Backspace
]

// These temporal manipulators are for keeping mandatory keys when modding the layout.
const temporalManipulators = [
  map('right_control').to('7', 'shift'), // Right Control => '
  map('right_control', 'shift').to('2', 'shift'), // Shift + Right Control => "
  map('left_control').to('tab'), // Left Control => Tab
]

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283', [
  rule('Key mapping').manipulators([
    ...symbolManipulators,
    ...modifierManipulators,
    ...arrowManipulators,
    ...specialManipulators,
    ...temporalManipulators,
  ]),
])
