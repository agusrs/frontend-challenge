/**
 * Traduce la condición de un item
 * @param condition
 */
export default function translateCondition(condition: "new" | "used") {
  return condition == "new" ? "Nuevo" : "Usado";
}
