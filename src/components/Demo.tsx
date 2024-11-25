import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

// Home button component
const HomeButton = ({ children, isSelected, onClick }: { 
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`w-full aspect-square bg-black rounded-lg flex items-center justify-center font-bold text-gray-300 
      ${isSelected ? 'border-2 border-gray-700' : 'border-2 border-transparent'}`}
  >
    <span className={`filter grayscale ${typeof children === 'string' && children.length === 1 ? 'text-base' : 'text-4xl'}`}>
      {children}
    </span>
  </div>
);

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      <div className="fixed inset-4 border-2 border-gray-700 rounded-xl flex flex-col justify-between bg-black">
        {/* Profile picture section */}
        <div className="flex-1 flex justify-center items-center">
          {context?.user.pfpUrl && (
            <div 
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(${context.user.pfpUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}
        </div>

        {/* Home buttons row */}
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <HomeButton 
              isSelected={selectedButton === 0} 
              onClick={() => setSelectedButton(0)}
            >
              🔨
            </HomeButton>
            <HomeButton 
              isSelected={selectedButton === 1} 
              onClick={() => setSelectedButton(1)}
            >
              2
            </HomeButton>
            <HomeButton 
              isSelected={selectedButton === 2} 
              onClick={() => setSelectedButton(2)}
            >
              🗺️
            </HomeButton>
            <HomeButton 
              isSelected={selectedButton === 3} 
              onClick={() => setSelectedButton(3)}
            >
              🎒
            </HomeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
