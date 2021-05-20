import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
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
        default: { render(c) { return c('router-view') } },
        footer: AppFooter
      },
      children: [
        {
          path: "/news/showcase",
          name: "n_showcase",
          component: () => import("./views/news/Showcase.vue")
        },
        {
          path: "/news/:id",
          name: "NewsContent",
          beforeEnter: (to, from, next) => {
            currentRouteName = "newscontent";
            next();
          },
          components: {
            header: AppHeader,
            default: () => import("./views/news/Content.vue"),
            footer: AppFooter
          }
        },
      ]
    },
    {
      path: "/forum",
      redirect: "/forum/showcase",
      name: "forum",
      beforeEnter: (to, from, next) => {
        currentRouteName = "forum";
        next();
      },
      components: {
        header: AppHeader,
        default: { render(c) { return c('router-view') } },
        footer: AppFooter
      },
      children: [
        {
          path: "/forum/showcase",
          name: "f_showcase",
          component: () => import("./views/forums/Showcase.vue")
        },
        {
          path: "/forum/:id",
          name: "ForumContent",
          component: () => import("./views/forums/Content.vue")
        },
      ]
    },
    {
      path: "/chapter",
      redirect: "/chapter/showcase",
      name: "chapter",
      beforeEnter: (to, from, next) => {
        currentRouteName = "chapter";
        next();
      },
      components: {
        header: AppHeader,
        default: { render(c) { return c('router-view') } },
        footer: AppFooter
      },
      children: [
        {
          path: "/chapter/showcase",
          name: "showcase",
          component: () => import("./views/chapters/Showcase.vue")
        },
        {
          path: "/chapter/category",
          name: "category",
          component: () => import("./views/chapters/Category.vue")
        },
        {
          path: "/chapter/content/:id",
          name: "ChapterContent",
          beforeEnter: (to, from, next) => {
            currentRouteName = "ChapterContent";
            next();
          },
          components: {
            header: AppHeader,
            default: () => import("./views/chapters/Content.vue"),
            footer: AppFooter
          }
        },
      ]
    },
    {
      path: "/libraries",
      redirect: "/libraries/showcase",
      name: "libraries",
      beforeEnter: (to, from, next) => {
        currentRouteName = "libraries";
        next();
      },
      components: {
        header: AppHeader,
        default: { render(c) { return c('router-view') } },
        footer: AppFooter
      },
      children: [
        {
          path: "/libraries/showcase",
          name: "l_showcase",
          component: () => import("./views/libraries/Showcase.vue")
        },
        {
          path: "/libraries/:id",
          name: "LibraryContent",
          beforeEnter: (to, from, next) => {
            currentRouteName = "LibraryContent";
            next();
          },
          components: {
            header: AppHeader,
            default: () => import("./views/libraries/Content.vue"),
            footer: AppFooter
          }
        },
      ]
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
      path: "/profile/:id",
      name: "Profile",
      components: {
        header: AppHeader,
        default: () => import("@/views/profiles/Profile.vue"),
        footer: AppFooter
      }
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
