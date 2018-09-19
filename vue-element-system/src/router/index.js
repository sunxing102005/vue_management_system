import Vue from 'vue'
import Router from 'vue-router'
import systemGrid from '@/components/systemGrid'
import editGrid from '@/components/editGrid'
// import second from '@/components/second'
import tab from '@/views/tab'
import editor from '@/views/form/quillEditor'
// import tinymce from '@/views/form/tinymce'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constRout = [
  {
    path: '/login',
    hidden: true,
    component: _import('login/index')
  },
  {
    path: '/',
    // name: 'root',
    hidden: true,
    redirect: '/welcome',
    component: _import('layout/index'),
    meta: {
      title: '首頁'
    },
    children:[
      {
        path: 'welcome',
        name: 'welcome',
        hidden: true,
        component: () => import ('@/views/dashboard/index')
      }
    ]
  },

  {
    path: '/first',
    name: 'first',
    meta: {
      title: '系统管理', icon: 'example'
    },
    component: _import('layout/index'),
    children: [
      {
        path: 'one',
        name: 'systemGrid',
        meta: {
          title: '表格', icon: 'table'
        },
        component: systemGrid
      },
      {
        path: 'two',
        name: 'editorGrid',
        meta: {
          title: '选项2', icon: 'tree'
        },
        component: editGrid
      }
    ]
  },
  {
    path: '/second',
    component: _import('layout/index'),

    name: 'second',
    children: [
      {
        path: 'index',
        meta: {
          title: '选项1',
          icon: 'tree'
        },
        component: tab
      }
    ],
    meta: {
      title: '标签页', icon: 'form'
    }

  },
  {
    path: '/three',
    component: _import('layout/index'),

    name: 'three',
    children: [
      {
        path: 'editor',
        name:'editor',
        meta: {
          title: 'quillEditor',
          icon: 'tree'
        },
        component: editor
      }
      // {
      //   path: 'tinymce',
      //   name:'tinymce',
      //   meta: {
      //     title: 'Tinymce',
      //     icon: 'tree'
      //   },
      //   component: tinymce
      // }
    ],
    meta: {
      title: '表单', icon: 'form'
    }

  }

];
export default new Router({
  routes: constRout
})
export const asyncRouteMap = [

  {
    path: '/four',
    component: _import('layout/index'),
    name: 'svg-icon',
    children: [
      {
        path: 'index',
        meta: {
          title: '选项1',
          icon: 'tree',
          roles: ['admin']
        },
        component: () => import('@/views/svg-icon/index'),
      }
    ],
    meta: {
      title: '图标', icon: 'form', roles: ['admin']
    }

  },
  { path: '*', redirect: '/404', hidden: true }
]
