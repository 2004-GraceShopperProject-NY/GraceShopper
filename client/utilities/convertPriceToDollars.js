export function priceToDollar(price) {
  let dollars = price / 100;
  return `$${dollars.toFixed(2)}`;
}
