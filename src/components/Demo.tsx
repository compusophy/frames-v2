import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

// Home button component
const HomeButton = ({ number }: { number: number }) => (
  <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-800">
    {number}
  </div>
);

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();

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
      <div className="fixed inset-4 border-2 border-gray-300 rounded-xl flex flex-col justify-between bg-white">
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
            <HomeButton number={1} />
            <HomeButton number={2} />
            <HomeButton number={3} />
            <HomeButton number={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
