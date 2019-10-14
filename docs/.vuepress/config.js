// auto generated sidebar
const { fileTree } = require('../code/config');

module.exports = {
  port: 8081,
  base: process.env.CI ? '/jscad-raspberrypi/' : '/',
  dest: 'public',
  locales: {
    '/': {
      title: 'JsCad Raspberry Pi',
      description: 'jscad parts library for Raspberry Pi pieces.'
    }
  },

  // plugins: [
  //   [
  //     '@vuepress/google-analytics',
  //     {
  //       ga: 'UA-135958052-3'
  //     }
  //   ]
  // ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/code/' },
      {
        text: 'GitLab',
        link: 'https://gitlab.com/johnwebbcole/jscad-raspberrypi'
      }
    ],
    displayAllHeaders: true,
    editLinks: true,
    sidebarDepth: 3,
    docsDir: 'code',
    sidebar: [
      ['/', 'Readme'],
      //   {
      //     title: 'Home',
      //     path: '/',
      //     collapsable: false,
      //     children: [['/', 'Readme']]
      //   },
      {
        title: 'Code',
        path: '/code/',
        collapsable: false,
        children: fileTree.map(api => `/code${api.path}`)
      }
    ]
  }
};
