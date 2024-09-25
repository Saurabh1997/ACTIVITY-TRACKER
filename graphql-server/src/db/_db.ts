export const users = [
  {
    id: "1",
    name: "Saurabh",
    age: 27,
    mobile_number: "28828383873",
  },
  {
    id: "2",
    name: "Gaurav",
    age: 23,
    mobile_number: "82837373737",
  },
];

export const activities = [
  {
    id: "1",
    activity_name: "code",
    activity_steps: ["reactjs", "nodejs", "db"],
    user_id: "1",
    document_id: "1",
    completed: true,
  },
  {
    id: "2",
    activity_name: "study",
    activity_steps: ["phy", "chem"],
    user_id: "2",
    document_id: "2",
    completed: false,
  },
  {
    id: "3",
    activity_name: "interview prep",
    activity_steps: ["DB", "java"],
    user_id: "1",
    document_id: "3",
    completed: false,
  },
];

export const activity_documents = [
  {
    id: "1",
    activity_id: "2",
    document_name: "master_SOP",
    document_url: "https://google.com",
  },
  {
    id: "2",
    activity_id: "1",
    document_name: "master_kubernetes",
    document_url: "https://kubernetes.com",
  },
  {
    id: "3",
    activity_id: "3",
    document_name: "master_docker",
    document_url: "https://docker.com",
  },
];
