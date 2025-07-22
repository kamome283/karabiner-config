/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  FromKeyParam,
  map,
  rule, ToEvent, writeToProfile,
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

function createModManipulator(
  from: FromKeyParam,
  to: ToEvent,
  toIfAlone?: ToEvent
) {
  const manipulator = map(from, undefined, 'any')
    .to({...to, lazy: true})
  return toIfAlone ? manipulator.toIfAlone(toIfAlone) : manipulator
}

const modifierManipulatorsBase: Parameters<typeof createModManipulator>[] = [
  ['spacebar', {key_code: 'left_shift'}, {key_code: 'spacebar'}], // Space => LeftShift with Space
  ['japanese_pc_nfer', {key_code: 'left_command'}, {key_code: 'escape'}], // MuHenkan => LeftCommand with Escape
  ['japanese_pc_xfer', {key_code: 'right_command'}, {key_code: 'return_or_enter'}], // Henkan => RightCommand with Return
  ['japanese_pc_katakana',
    {key_code: 'left_control', modifiers: ['left_option', 'left_shift']},
    undefined], // Katakana => LeftControl + LeftOption + LeftShift
  ['left_option', {key_code: 'left_option'}, {key_code: 'tab'}], // LeftOption => LeftOption with Tab
  ['right_option',
    {key_code: 'right_option'},
    {key_code: 'left_arrow'}], // RightOption => RightOption with LeftArrow
  ['left_command', {key_code: 'left_control'}, {key_code: '7', modifiers: ['shift']}], // LeftCommand => LeftControl with Shift + 7
  ['print_screen',
    {key_code: 'right_control'},
    {key_code: 'right_arrow'}], // PrintScreen => RightControl with RightArrow
];

const modifierManipulators = modifierManipulatorsBase.map((args) => createModManipulator(...args));

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
