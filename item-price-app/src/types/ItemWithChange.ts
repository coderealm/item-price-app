import { Item } from "./item";
import PriceChange from "./PriceChange";

interface ItemWithChange extends Item {
  change: PriceChange;
}

export default ItemWithChange;
