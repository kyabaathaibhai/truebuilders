export const fireProjectViewEvents = (projects: any[]) => {
  if (typeof window === 'undefined' || !window.fbq) return;

  projects.forEach((project) => {
    if (project.master_project_id) {
      console.log(project.master_project_id,"master_project_id")
      const projectViewData = {
        master_project_id: project.master_project_id,
      };

      window.fbq('trackCustom', 'ProjectView', projectViewData);
      console.log('Facebook Pixel ProjectView event fired for project:', project.id);
    }
  });
};