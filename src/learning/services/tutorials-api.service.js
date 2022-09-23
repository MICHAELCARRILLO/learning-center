//http es una instance de axios
import http from "@/core/services/http-common";


export class TutorialsApiService {

    getAll() {
        return http.get('/tutorials');
    }

    getById(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`tutorials/${id}`, data);
    }

    findByTitle(title) {
        return http.get(`tutorials?title=${title}`);
    }

    delete(id) {
        return http.delete(`tutorials/${id}`);
    }

}