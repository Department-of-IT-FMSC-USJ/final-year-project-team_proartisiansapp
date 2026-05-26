export interface Chat {
  id: string;
  buyerId: string;
  sellerId: string;
  lastMessage: string;
  updatedAt: any;
}

export interface Message {
  id: string;
  senderId: string;
  senderRole: "buyer" | "seller";
  text: string;
  createdAt: any;
}