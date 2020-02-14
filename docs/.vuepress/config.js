module.exports = {
    title: 'Harbinger',
    description: 'Just Another FMLTutor For Future',
    author: "https://github.com/TeamCovertDragon/Harbinger/graphs/contributors",
    head: [
        // ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    serviceWorker: false,
    plugins: [
        [
          'vuepress-plugin-mathjax',
          {
            target: 'svg',
          },
        ],
      ],
    themeConfig: {
        repo: 'TeamCovertDragon/Harbinger',
        // editLinks: true,
        docsDir: 'docs',
        locales: {
            '/': {
                sidebar: [
                    {
                        title:"写在前面：这是什么？",
                        path:"/"
                    },
                    {
                        title:"序：《异教与隐士》",
                        path:"/preface/"
                    },
                    {
                        title: '1. 站在巨人的肩膀上',
                        path: "/chapter-01/",
                        collapsable: true,
                        children: [
                            {
                                title:"1.1 MCP",
                                path: "/chapter-01/mcp"
                            }
                        ]
                    }
                ]
            }

        }
    },
    markdown: {
        lineNumbers: true
    }
};
