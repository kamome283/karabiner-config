import {
  FromKeyParam,
  FromModifierParam,
  map,
  mapPointingButton,
  rule,
  writeToProfile,
} from "karabiner.ts";
import {Definition, definitions} from "./definitions";

type ManipulatorBuilder = ReturnType<typeof map>

// 既存の実装を流用しているので、ShiftなしとShiftありのような1つの修飾子との衝突は解決できる。
// ただ、修飾子無しとShiftありとOptionありのような2つ以上の衝突がある場合はうまく解決できないような気がする。
function defsToManipulators(definitions: Definition[]): ManipulatorBuilder[] {
  const groupedByFromKey: Map<FromKeyParam, [FromModifierParam: FromModifierParam | undefined, Definition: Definition][]> = new Map();
  for (const def of definitions) {
    const [from] = def;
    const [fromKey, fromModifiers] = from;
    let group = groupedByFromKey.get(fromKey);
    if (!group) {
      group = [];
      groupedByFromKey.set(fromKey, group);
    }
    group.push([fromModifiers, def]);
  }

  const manipulators: ManipulatorBuilder[] = [];
  for (const group of groupedByFromKey) {
    const [_, modsAndDefs] = group;
    const usedModifiers = modsAndDefs.flatMap(([fromModifier, _]) => fromModifier);
    const allModifiers = ["shift", "option", "control", "command"] as const;
    const unusedModifiers = allModifiers.filter(mod => !usedModifiers.includes(mod));
    for (const [_, definition] of modsAndDefs) {
      const [from, to, toIfAlone] = definition;
      const [fromKey, fromModifiers] = from;
      const baseManipulator = map(fromKey, fromModifiers, unusedModifiers).to(to[0], to[1], to[2]);
      const manipulator = toIfAlone ? baseManipulator.toIfAlone(toIfAlone[0], toIfAlone[1], toIfAlone[2]) : baseManipulator;
      manipulators.push(manipulator);
    }
  }
  return manipulators;
}

const manipulators = defsToManipulators(definitions);

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config JSON into console)
// + Create a new profile if needed.
writeToProfile("Basic Profile for Lenovo Trackpoint Keyboard 2 by Kamome283", [
  rule("Key mapping").manipulators(manipulators),
  rule("Middle click as a Ctrl").manipulators([
    mapPointingButton("button3", undefined, "any")
      .to("left_control", undefined, {lazy: true}),
  ]),
]);
