import {ManipulatorBuilder, map, ModifierParam} from "karabiner.ts";
import {Definition} from "./definitions";

export type Config = {
  lazy: boolean,
  definitions: Definition[]
}

type DefinitionsGroup = {
  fromKey: Definition["from"]["key"],
  definitions: Definition[],
}

const basicMods = [
  "left_shift",
  "left_option",
  "left_control",
  "right_command"
] satisfies ModifierParam[];

const processGroup = (lazy: boolean, group: DefinitionsGroup): ManipulatorBuilder[] => {
  const mandatoryMods = group.definitions.flatMap(def => def.from.mod);
  const optionalMods = basicMods.filter(mod => !mandatoryMods.includes(mod));

  return group.definitions.map(def => {
    const toOptions = lazy && (def.ifAlone !== undefined) ?
      {...def.to.options, lazy: true}
      : def.to.options
    const manipulator =
      map(def.from.key, def.from.mod, optionalMods)
        .to(def.to.key, def.to.mod, toOptions)
    return def.ifAlone !== undefined
      ? manipulator.toIfAlone(def.ifAlone.key, def.ifAlone.mod, def.ifAlone.options)
      : manipulator
  })
}

export const constructManipulators = (config: Config): ManipulatorBuilder[] => {
  const groups = Map
    .groupBy(config.definitions, def => def.from.key)
    .entries()
    .map(([fromKey, definitions]): DefinitionsGroup => ({
      fromKey,
      definitions
    }))
  return groups.flatMap(group => processGroup(config.lazy, group)).toArray()
}
