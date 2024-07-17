## 设计图地址

https://lanhuapp.com/web/#/item/project/stage?tid=3dc2ab9b-0dca-49a4-b196-d5cfdc669d41&pid=83bfbdb3-1410-4d7d-b255-38a9c6131c6c

## 数据库结构er图：

https://drawsql.app/teams/lingxn/diagrams/lingxn

/api/v1/page/{id}

接口描述：
首页剧集信息：/api/v1/page/index
出海资讯：/api/v1/news
banner 查询 /api/v1/banner
广告信息接口：/api/v1/ad
类型查询 /api/v1/type 一级类型 669227827798105066c67ed4
产品搜索 /api/v1/product name:名称
产品详情 /api/v1/product/{\_id}
新闻接口：/api/v1/news
详情接口：/api/v1/news/{\_id}
联系我们：/api/v1/contact-us

db.createUser({ user:'root',pwd:'X2judp2kuB8Th6rDHWDsLz6ujh8dw\*RjkJBXC',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});

db.auth('root', 'X2judp2kuB8Th6rDHWDsLz6ujh8dw\*RjkJBXC')
