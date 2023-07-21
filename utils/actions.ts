
export const getAllProjects = async() => {
  const response = await fetch('/api/project', {
    method: "GET"
  })
  const data = await response.json()

  return data
}
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ path: imagePath })
    });

    return response.json();
  } catch (err) {
    throw err;
  }
};

export const getUserDetails = async (id: string) => {
  const response = await fetch(`/api/user/${id}`, {
    method: "GET",
  });
  const data = await response.json();

  return data;
};

export const getRelatedProjects = async (id: string) => {
  const response = await fetch(`/api/users/${id}/projects`, {
    method: "GET"
  });
  const data = await response.json();

  return data;
};

export const getProjectDetails = async (id: string) => {
  const response = await fetch(`/api/project/${id}`, {
    method: "GET",

  });
  const data = await response.json();

  return data;
};

export const deleteProject = async (id : string) => {
  await fetch(`/api/project/${id}`, {
    method: "DELETE",
    headers: {
      key: 'x-custom-header',
      value: 'test'
    } 
  });
};

export const updateUserProjects = async (userId : string, projectId : string ) => {
  await fetch(`/api/user/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(projectId)
  })
}