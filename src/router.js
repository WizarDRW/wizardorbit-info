import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Blog from "./views/blogs/Blog.vue";
import About from "./views/abouts/About.vue";

Vue.use(Router);
var currentRouteName = "Home";
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      redirect: "/news",
      beforeEnter: (to, from, next) => {
        currentRouteName = "Home";
        next();
      },
      components: {
        header: AppHeader,
        default: { render(c) { return c('router-view') } },
        footer: AppFooter
      }
    },
    {
      path: "/news",
      redirect: "/news/showcase",
      name: "news",
      beforeEnter: (to, from, next) => {
        currentRouteName = "news";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/news/News.vue"),
        footer: AppFooter
      },
      children: [
        {
          path: "/news/showcase",
          name: "n_showcase",
          component: () => import("./views/news/components/Showcase.vue")
        },
        {
          path: "/news/:id",
          name: "newscontent",
          beforeEnter: (to, from, next) => {
            currentRouteName = "newscontent";
            next();
          },
          components: {
            header: AppHeader,
            default: () => import("./views/news/components/Content.vue"),
            footer: AppFooter
          }
        },
      ]
    },
    {
      path: "/forms",
      redirect: "/forms/showcase",
      name: "forms",
      beforeEnter: (to, from, next) => {
        currentRouteName = "forms";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/forms/Form.vue"),
        footer: AppFooter
      },
      children: [
        {
          path: "/forms/showcase",
          name: "f_showcase",
          component: () => import("./views/forms/components/Showcase.vue")
        },
        {
          path: "/forms/:id",
          name: "formcontent",
          beforeEnter: (to, from, next) => {
            currentRouteName = "formcontent";
            next();
          },
          components: {
            header: AppHeader,
            default: () => import("./views/forms/components/Content.vue"),
            footer: AppFooter
          }
        },
      ]
    },
    {
      path: "/blog",
      redirect: "/blog/showcase",
      name: "blog",
      beforeEnter: (to, from, next) => {
        currentRouteName = "blog";
        next();
      },
      components: {
        header: AppHeader,
        default: Blog,
        footer: AppFooter
      },
      children: [
        {
          path: "/blog/showcase",
          name: "showcase",
          component: () => import("./views/blogs/components/Showcase.vue")
        },
        {
          path: "/blog/category",
          name: "category",
          component: () => import("./views/blogs/components/Category.vue")
        },
        {
          path: "/blog/new-post",
          name: "newpost",
          component: () => import("./views/blogs/components/NewPost.vue")
        }
      ]
    },
    {
      path: "/blog/:id",
      name: "blogcontent",
      beforeEnter: (to, from, next) => {
        currentRouteName = "blogcontent";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/blogs/components/Content.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/find/:text",
      name: "find",
      beforeEnter: (to, from, next) => {
        currentRouteName = "find";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/Find.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/about",
      name: "about",
      beforeEnter: (to, from, next) => {
        currentRouteName = "about";
        next();
      },
      components: {
        header: AppHeader,
        default: About,
        footer: AppFooter
      },
      children: [{
        path: "/about/ourhistory",
        name: "ourhistory",
        beforeEnter: (to, from, next) => {
          currentRouteName = "ourhistory";
          next();
        },
        component: () => import("./views/abouts/components/OurHistory.vue")
      }]
    },
    {
      path: '/*',
      redirect: { name: currentRouteName }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
