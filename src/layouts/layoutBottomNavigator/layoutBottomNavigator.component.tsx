import { BottomNavigator } from "../../components/bottomNavigator";

export const LayoutBottomNavigatorComponent = ({ children }: any) => {
  return (
    <div className="pb-40 flex flex-col">
      {children}
      <BottomNavigator />
    </div>
  );
};
