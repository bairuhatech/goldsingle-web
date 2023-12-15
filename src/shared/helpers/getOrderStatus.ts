import orderStatus from "../../config/orderStatus.json";
export const getOrderStatus = (data: string) => {
  if (Array.isArray(orderStatus) == true) {
    const status: any = orderStatus.find((item: any) => item.value == data);
    return status?.title?status.title:'';
  }
  return "";
};
