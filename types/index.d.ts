export interface ContextType {
  account: IAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
}
export interface IAccount {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}

export interface ChildProps {
  children: React.ReactNode;
}
