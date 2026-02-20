import SetModulView from "./view/SetModulView";

export default async function SetModul({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [usergroupId, usergroupName] = slug;

  return (
    <SetModulView
      usergroupId={usergroupId}
      usergroupName={decodeURIComponent(usergroupName)}
    />
  );
}
