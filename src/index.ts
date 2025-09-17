/// Using a JIS based keyboard, so that the mapping symbols are different from US layout.
/// Take a look at comments for the mapping corresponding.

import {
  FromKeyParam,
  FromModifierParam,
  map, mapPointingButton,
  ModifierParam,
  rule, ToEventOptions,
  ToKeyParam,
  writeToProfile,
} from 'karabiner.ts'

type FromDefinition = [FromKeyParam: FromKeyParam, FromModifierParam?: FromModifierParam]
type ToDefinition = [ToKeyParam: ToKeyParam, ModifierParam?: ModifierParam, ToEventOptions?: ToEventOptions]
type Definition = [From: FromDefinition, To: ToDefinition, ToIfAlone?: ToDefinition]

const symbolDefinitions: Definition[] = [
  // Numeric row
  [['2', ['shift']], ['open_bracket']], // Shift + 2 => @
  [['7', ['shift']], ['international3', ['shift']]], // Shift + 7 => |
  [['0', ['shift']], ['open_bracket', ['shift']]], // Shift + 0 => `
  [['hyphen'], ['equal_sign']], // - => ^
  [['hyphen', ['shift']], ['equal_sign', ['shift']]], // Shift + - => ~
  // Top row
  [['open_bracket'], ['close_bracket']], // @ => [
  [['open_bracket', ['shift']], ['close_bracket', ['shift']]], // Shift + @ => {
  [['close_bracket'], ['non_us_pound']], // [ => ]
  [['close_bracket', ['shift']], ['non_us_pound', ['shift']]], // Shift + [ => }
  // Middle row
  [['caps_lock'], ['7', ['shift']]], // CapsLock => '
  [['caps_lock', ['shift']], ['2', ['shift']]], // Shift + CapsLock => "
  [['semicolon'], ['hyphen']], // ; => -
  [['semicolon', ['shift']], ['hyphen', ['shift']]], // Shift + ; => =
  [['non_us_pound'], ['semicolon']], // ] => ;
  [['non_us_pound', ['shift']], ['semicolon', ['shift']]], // Shift + ] => +
  // Bottom row
  [['international1', ['shift']], ['international3', ['option']]], // Shift + _ => \
  // Side keys
  [['left_shift'], ['tab']], // LeftShift => Tab
  [['right_shift'], ['f19']], // RightShift => F19
  [['left_command'], ['delete_or_backspace']], // LeftShift => Delete/Backspace
]

// Modifier keys mapping
const modifierDefinitions: Definition[] = [
  [['spacebar'], ['left_command'], ['spacebar']], // Space => LeftCommand with Space
  [['japanese_pc_nfer'], ['left_shift'], ['escape']], // MuHenkan => LeftShift with Escape
  [['japanese_pc_xfer'], ['right_shift'], ['return_or_enter']], // Henkan => RightShift with Return
  [['left_option'], ['left_option'], ['japanese_eisuu']], // LeftOption => LeftOption with Eng
  [['japanese_pc_katakana'], ['right_option'], ['japanese_kana']], // Katakana => RightOption with Kana
  [['tab'], ['left_command', ['control', 'option']]], // Tab => LeftCommand + Control + Option
]

const laziedModifierDefinitions: Definition[] = modifierDefinitions.map(def => {
  const [from, to, toIfAlone] = def
  const [toKey, toModifiers, toEventOptions] = to
  const laziedOptions: ToEventOptions = {...toEventOptions, lazy: true }
  return [from, [toKey, toModifiers, laziedOptions], toIfAlone] satisfies Definition
})

// These temporal manipulators are for keeping mandatory keys when modding the layout.
const temporalDefinitions: Definition[] = []

const definitions: Definition[] = [
  ...symbolDefinitions,
  ...laziedModifierDefinitions,
  ...temporalDefinitions,
]

type ManipulatorBuilder = ReturnType<typeof map>

// 既存の実装を流用しているので、ShiftなしとShiftありのような1つの修飾子との衝突は解決できる。
// ただ、修飾子無しとShiftありとOptionありのような2つ以上の衝突がある場合はうまく解決できないような気がする。
function defsToManipulators(definitions: Definition[]): ManipulatorBuilder[] {
  const groupedByFromKey: Map<FromKeyParam, [FromModifierParam: FromModifierParam | undefined, Definition: Definition][]> = new Map()
  for (const def of definitions) {
    const [from] = def
    const [fromKey, fromModifiers] = from
    let group = groupedByFromKey.get(fromKey)
    if (!group) {
      group = []
      groupedByFromKey.set(fromKey, group)
    }
    group.push([fromModifiers, def])
  }

  const manipulators: ManipulatorBuilder[] = []
  for (const group of groupedByFromKey) {
    const [_, modsAndDefs] = group
    const usedModifiers = modsAndDefs.flatMap(([fromModifier, _]) => fromModifier)
    const allModifiers = ['shift', 'option', 'control', 'command'] as const
    const unusedModifiers = allModifiers.filter(mod => !usedModifiers.includes(mod))
    for (const [_, definition] of modsAndDefs) {
      const [from, to, toIfAlone] = definition
      const [fromKey, fromModifiers] = from
      const baseManipulator = map(fromKey, fromModifiers, unusedModifiers).to(to[0], to[1], to[2])
      const manipulator = toIfAlone ? baseManipulator.toIfAlone(toIfAlone[0], toIfAlone[1], toIfAlone[2]) : baseManipulator
      manipulators.push(manipulator)
    }
  }
  return manipulators
}

const manipulators = defsToManipulators(definitions)

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283', [
  rule('Key mapping').manipulators(manipulators),
  rule('Middle click as a Ctrl').manipulators([
    mapPointingButton('button3', undefined, "any")
      .to('left_control', undefined, {lazy: true})
  ])
])
