export async function GET() {
  const appUrl = "https://frames-v2-examples.vercel.app";

  const config = {
    config: {
      version: "0.0.0",
      name: "compusophy",
      icon: `${appUrl}/icon.png`,
      splashImage: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      homeUrl: appUrl,
      fid: 0,
      key: "",
      signature: "",
    },
  };

  return Response.json(config);
}
