import BuilderDetailsPage from '@app/components/BuilderDetailsPage';

// Export viewport separately
export default async function BuilderDetailPage({
  params,
}: {
  params: Promise<{ builderId: string }>;
}) {
  const resolvedParams = await params;
  const { builderId } = resolvedParams;

  return (
    <>
      <BuilderDetailsPage builderId={builderId} />
    </>
  );
}
