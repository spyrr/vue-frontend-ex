import Vue from "vue";
import VueRouter from "vue-router";
import Books from "./views/Books";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {path: "/", component: Books},
        {path: "/books", component: Books},
    ]
});

export default router;