export default function translateCondition(condition: "new" | "used") {
  return condition == "new" ? "Nuevo" : "Usado";
}
