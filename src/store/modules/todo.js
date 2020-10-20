import * as types from "@/store/types";
import axios from "axios";
import shortly from "vuex-shortly";

const todosApi = axios.create({
    baseURL: process.env.VUE_APP_TODOS_API_REST
});


const state = {
    todos: [],
};

const getters = {
    [types.TODO_LIST]: "todos",
};

const mutations = {
    [types.TODO_LIST]: "todos"
};

const actions = {
    [types.TODO_UPDATE_LIST]: async ({
        commit
    }, message) => {
        let results = [ ...state.todos ];
        const response = message.response;
        if (response.method === "DELETE") {
            results = state.todos.filter(it => it._id !== response._id);
        } else if (response.method === "PUT" || response.method === "PATCH") {
            results = state.todos.filter(it => it._id !== response._id);
            results.push(response)
        } else if (response.method === "POST") {
            results.push(response)
        }
        commit(types.TODO_LIST, results);
    },
    [types.TODO_LIST]: async ({
        commit
    }) => {
        const response = await todosApi.get("/todos");
        const results = response.data.results;
        commit(types.TODO_LIST, results);
        return response;
    },
    [types.TODO_CREATE]: async (ctx, payload) => {
        const response = await todosApi.post("/todos", payload);
        return response;
    },
    [types.TODO_UPDATE]: async (ctx, { id, payload }) => {
        const response = await todosApi.patch(`/todos/${id}`, payload);
        return response;
    },
    [types.TODO_DELETE]: async (ctx, { id }) => {
        const response = await todosApi.delete(`/todos/${id}`);
        return response;
    },
};

export default shortly({
    state,
    getters,
    mutations,
    actions
});
