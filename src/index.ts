// https://www.hiveworkshop.com/threads/snippet-isdestructabletree.248054/

import { Destructable, Unit, MapPlayer, Widget } from 'w3ts';
import { LibraryLoader } from 'war3-library-loader';

let harvester: Unit;

let config = {
  HARVESTER_UNIT_ID: FourCC('hpea'),
  HARVEST_ABILITY: FourCC('Ahrl'),
  HARVEST_ORDER_ID: 0xD0032,
  NEUTRAL_PLAYER: MapPlayer.fromHandle(Player(PLAYER_NEUTRAL_PASSIVE))
}

export function setIsDestructableTreeConfig(cfg: object) {
  config = { ...config, ...cfg };
}

export function isDestructableTree(d: Destructable | destructable) {
  let widget: Widget = 'handle' in d ? Widget.fromHandle(d.handle) : Widget.fromHandle(d);

  //*  851973 is the order id for stunned, it will interrupt the preceding harvest order.
  return harvester.issueTargetOrder(config.HARVEST_ORDER_ID, widget) && harvester.issueImmediateOrder(851973);
}

class IsDestructableTreeLib {

  private constructor() { }

  static init() {
    harvester = new Unit(config.NEUTRAL_PLAYER, config.HARVESTER_UNIT_ID, 0, 0, 0);
    harvester.addAbility(FourCC('Aloc'));
    harvester.show = false;
  }

}

LibraryLoader.register(IsDestructableTreeLib);