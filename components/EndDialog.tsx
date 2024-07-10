import Refresh from "@/public/refresh.svg";

interface EndDialogProps {
  setDisplayEndScreen: (value: boolean) => void;
  endScreenText: string;
}
const EndDialog = ({ setDisplayEndScreen, endScreenText }: EndDialogProps) => {
  return (
    <div
      className="backdrop-blur-sm size-full  justify-center items-center flex fixed inset-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setDisplayEndScreen(false);
        }
      }}
    >
      <div className="text-white bg-zinc-800 items-center flex rounded-lg p-8 flex-col animate-slideVertical">
        {endScreenText}
        <div className="h-4" />
        <div
          className="bg-zinc-900 p-2 rounded-lg flex-row flex items-center justify-center cursor-pointer"
          onClick={() => location.reload()}
        >
          Reset?
          <div className="w-2" />
          <Refresh />
        </div>
      </div>
    </div>
  );
};

export default EndDialog;
