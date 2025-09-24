import ProjectDetailsPage from '@app/components/ProjectDetailsPage';
import React from 'react';

// Export viewport separately
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;
  return (
    <>
      <ProjectDetailsPage projectId={projectId} />
    </>
  );
}
