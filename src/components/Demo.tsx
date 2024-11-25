import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

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
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <div className="w-[280px] h-[500px] border-2 border-gray-300 rounded-xl flex justify-center items-center bg-white">
        {context?.user.pfpUrl && (
          <div 
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${context.user.pfpUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
      </div>
    </div>
  );
}
