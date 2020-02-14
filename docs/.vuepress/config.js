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
        sidebar: 
        [
            {
                title: "写在前面：这是什么？",
                path: "/"
            },
            {
                title: "序：《异教与隐士》",
                path: "/preface/"
            },
            {
                title: '1. 站在巨人的肩膀上',
                path: "/chapter-01/",
                collapsable: true,
                children: [
                    {
                        title: "1.1 MCP",
                        path: "/chapter-01/mcp"
                    },
                    {
                        title: "1.2 Forge",
                        path: "/chapter-01/forge"
                    },
                    {
                        title: "1.3 ForgeGradle",
                        path: "/chapter-01/forgegradle"
                    }
                ]
            },
            {
                title: '2. 一切的开始',
                path: "/chapter-02/",
                collapsable: true,
                children: [
                    {
                        title: "2.1 Mod 元数据",
                        path: "/chapter-02/metadata"
                    },
                    {
                        title: "2.2 Mod 的构建与发布",
                        path: "/chapter-02/build"
                    }
                ]
            },
            {
                title: '3. 事件',
                path: 'chapter-03/',
                collapsable: true,
            },
            {
                title: '4. 物品',
                path: "/chapter-04/",
                collapsable: true,
                children: [
                    {
                        title: "4.1 ItemStack",
                        path: "/chapter-04/item-stack"
                    },
                    {
                        title: "4.2 附魔",
                        path: "/chapter-04/enchantment"
                    },
                    {
                        title: "4.3 物品进阶",
                        path: "/chapter-04/advanced/",
                        children:[
                            {
                                title: "4.2.1 Meta-hack",
                                path: "/chapter-04/advanced/meta-hack",
                            },
                            {
                                title: "4.2.2 食物",
                                path: "/chapter-04/advanced/food",
                            },
                            {
                                title: "4.2.3 工具及武器等",
                                path: "/chapter-04/advanced/tool",
                            },
                            {
                                title: "4.2.4 护甲",
                                path: "/chapter-04/advanced/armor",
                            },
                            {
                                title: "4.2.5 投掷物",
                                path: "/chapter-04/advanced/throwable",
                            }
                        ]
                    }
                ]
            },
        ]
    },
    markdown: {
        lineNumbers: true
    }
};


