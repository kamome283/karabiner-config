/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  map,
  rule,
  writeToProfile,
} from 'karabiner.ts'

const symbolManipulators = [
  // Numeric row
  map('grave_accent_and_tilde').to('7', 'shift'), // ZenHan => '
  map('grave_accent_and_tilde', 'shift').to('2', 'shift'), // Shift + ZenHan => "
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
  map('japanese_pc_katakana').to('right_shift'), // Katakana => RightShift, Might be changed
  map('left_command').to('left_control'), // LeftCommand => LeftControl
  map('print_screen').to('right_control'), // PrintScreen => RightControl
  map('left_control').to('left_control', ['left_option', 'left_shift']), // LeftControl => LeftControl + LeftOption + LeftShift
  map('right_control').to('right_control', ['right_option', 'right_shift']), // RightControl => RightControl + RightOption + RightShift
];

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283', [
  rule('Key mapping').manipulators([
    ...symbolManipulators,
    ...modifierManipulators,
  ]),
])
