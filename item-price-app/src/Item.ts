// Define an interface for the items' structure
interface Item {
  id: string;
  name: string;
  price: number;
  updatedAt: string; // or Date, if you prefer working with Date objects
}

export default Item;
