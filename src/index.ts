/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  FromKeyParam,
  map, ModifierParam,
  rule, ToEvent, writeToProfile,
} from 'karabiner.ts'

function createSymbolManipulator({from, defs,}: {
  from: FromKeyParam;
  defs: ([ModifierParam | undefined, ToEvent])[];
}) {
  return defs.map(([modifier, to]) =>
    modifier ? map(from, modifier).to(to) : map(from).to(to)
  );
}

const symbolManipulatorsBase: Parameters<typeof createSymbolManipulator>[0][] = [
  // Numeric row
  {from: '2', defs: [['shift', {key_code: 'open_bracket'}]]}, // Shift + 2 => @
  {from: '7', defs: [['shift', {key_code: 'international3', modifiers: ['shift']}]]}, // Shift + 7 => |
  {from: '0', defs: [['shift', {key_code: 'open_bracket', modifiers: ['shift']}]]}, // Shift + 0 => `
  {
    from: 'hyphen', defs: [
      [undefined, {key_code: 'equal_sign'}], // - => ^
      ['shift', {key_code: 'equal_sign', modifiers: ['shift']}], // Shift + - => ~
    ],
  },
  // Top row
  {
    from: 'open_bracket', defs: [
      [undefined, {key_code: 'close_bracket'}], // @ => [
      ['shift', {key_code: 'close_bracket', modifiers: ['shift']}], // Shift + @ => {
    ],
  },
  {
    from: 'close_bracket', defs: [
      [undefined, {key_code: 'non_us_pound'}], // [ => ]
      ['shift', {key_code: 'non_us_pound', modifiers: ['shift']}], // Shift + [ => }
    ],
  },
  // Middle row
  {
    from: 'semicolon', defs: [
      [undefined, {key_code: 'hyphen'}], // ; => -
      ['shift', {key_code: 'hyphen', modifiers: ['shift']}], // Shift + ; => =
    ],
  },
  {
    from: 'non_us_pound', defs: [
      [undefined, {key_code: 'semicolon'}], // ] => ;
      ['shift', {key_code: 'semicolon', modifiers: ['shift']}], // Shift + ] => +
    ],
  },
  // Bottom row
  {
    from: 'international1', defs: [
      ['shift', {key_code: 'international3', modifiers: ['option']}], // Shift + _ => \
    ],
  },
];

const symbolManipulators = symbolManipulatorsBase.flatMap((args) => createSymbolManipulator(args))

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
