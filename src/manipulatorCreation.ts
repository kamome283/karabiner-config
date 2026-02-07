import {Definition, ToDefinition} from "./definitions";
import {map} from "karabiner.ts";

type ManipulatorBuilder = ReturnType<typeof map>

export class ManipulatorsGeneratorFactory {
  private readonly lazyWhenTapAndHold: boolean;

  public constructor(lazyWhenTapAndHold: boolean) {
    this.lazyWhenTapAndHold = lazyWhenTapAndHold;
  }

  public create(definitions: Definition[]): ManipulatorsGenerator {
    return new ManipulatorsGenerator(this.lazyWhenTapAndHold, definitions);
  }
}

export class ManipulatorsGenerator {
  static readonly AllModifiers = ["shift", "option", "control", "command"] as const;
  private readonly lazyWhenTapAndHold: boolean;
  private readonly definitions: Definition[];

  public constructor(lazyWhenTapAndHold: boolean, definitions: Definition[]) {
    this.lazyWhenTapAndHold = lazyWhenTapAndHold;
    this.definitions = definitions;
  }

  public generate(): ManipulatorBuilder[] {
    const grouped = Map.groupBy(this.definitions, x => x[0][0]);
    return grouped.values().toArray().flatMap(this.processGroup, this);
  }

  private processGroup(group: Definition[]): ManipulatorBuilder[] {
    const usedMods = group.flatMap(x => x[0][1]);
    const unusedMods = ManipulatorsGenerator.AllModifiers.filter(x => !usedMods.includes(x));
    return group.map(x => {
      const [from, to, toIfAlone] = x;
      const [fromKey, fromMods] = from;
      if (toIfAlone === undefined) {
        return map(fromKey, fromMods, unusedMods).to(to[0], to[1], to[2]);
      } else {
        const t = this.lazyWhenTapAndHold ? this.setLazyOption(to) : to;
        return map(fromKey, fromMods, unusedMods)
          .to(t[0], t[1], t[2])
          .toIfAlone(toIfAlone[0], toIfAlone[1], toIfAlone[2]);
      }
    }, this);
  }

  private setLazyOption(toDef: ToDefinition): ToDefinition {
    const [key, mods, options] = toDef;
    const updatedOptions = {...options, lazy: true};
    return [key, mods, updatedOptions];
  }
}