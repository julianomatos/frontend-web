import Drawer from "@mui/material/Drawer";

type BottomSheetProps = {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeBottomSheetCallback?: () => void;
  children: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  closeBottomSheetCallback,
  children,
}): JSX.Element => {
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    closeBottomSheetCallback && closeBottomSheetCallback();
  };

  return (
    <Drawer
      anchor="bottom"
      open={isBottomSheetOpen}
      onClose={handleCloseBottomSheet}
    >
      {children}
    </Drawer>
  );
};

export default BottomSheet;
