
import axios from "../axios";

const endpoints = {
    get_projects: () => axios.get('projects/'),
    get_project_detail: (url) => axios.get(`${url}`),
    create_project: (data) => axios.post('project-create/', data),
    delete_project: (name) => axios.delete(`project-create/${name}`),
    delete_performer: (name, data) => axios.patch(`project-create/${name}/`, data),
};

export default endpoints;

