import { useRouter } from "next/router";

export default function ItemDetails() {
  const router = useRouter();
  return <h1>Item Details {router.query.id}</h1>;
}
