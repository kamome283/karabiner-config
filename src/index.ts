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
  [['2', ['shift']], ['open_bracket', ['shift']]], // Shift + 2 => @
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
]

// Modifier keys mapping
const modifierDefinitions: Definition[] = [
  [['spacebar'], ['left_shift'], ['spacebar']], // Space => LeftShift with Space
  [['japanese_pc_nfer'], ['left_command'], ['escape']], // MuHenkan => LeftCommand with Escape
  [['japanese_pc_xfer'], ['right_command'], ['return_or_enter']], // Henkan => RightCommand with Return
  [['japanese_pc_katakana'], ['left_control', ['left_option', 'left_shift']], ['f19']], // Katakana => LeftControl + LeftOption + LeftShift with F19
  [['left_option'], ['left_option'], ['tab']], // LeftOption => LeftOption with Tab
  [['right_option'], ['right_option'], ['japanese_eisuu']], // RightOption => RightOption with Eng
  [['left_command'], ['left_control'], ['delete_or_backspace']], // LeftCommand => LeftControl with Delete/Backspace
  [['print_screen'], ['right_control'], ['japanese_kana']], // PrintScreen => RightControl with Kana
]

const laziedModifierDefinitions: Definition[] = modifierDefinitions.map(def => {
  const [from, to, toIfAlone] = def
  const [toKey, toModifiers, toEventOptions] = to
  const laziedOptions: ToEventOptions = {...toEventOptions, lazy: true }
  return [from, [toKey, toModifiers, laziedOptions], toIfAlone] satisfies Definition
})

const specialDefinitions: Definition[] = [
  [['grave_accent_and_tilde'], ['up_arrow']],      // ` => ↑
  [['tab'], ['down_arrow']],                       // Tab => ↓
  [['left_shift'], ['left_arrow']],                // LeftShift => ←
  [['right_shift'], ['right_arrow']],              // RightShift => →
]

// These temporal manipulators are for keeping mandatory keys when modding the layout.
const temporalDefinitions: Definition[] = []

const definitions: Definition[] = [
  ...symbolDefinitions,
  ...laziedModifierDefinitions,
  ...specialDefinitions,
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
    mapPointingButton('button3').to('left_control', undefined, {lazy: true})
  ])
])
