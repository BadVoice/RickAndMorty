export const getStatusClass = (status: string) => {
  if (status === "Alive") {
    return "bg-green-500";
  } else if (status === "Dead") {
    return "bg-red-500";
  } else if (status === "unknown") {
    return "bg-gray-400";
  } else {
    return "bg-gray-400";
  }
};