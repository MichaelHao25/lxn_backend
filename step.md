1. 快速创建增删改查
   1. nest g resource [name]
2. 查看所有生成代码命令

   1. nest g --help

docker 安装文档：https://yeasy.gitbook.io/docker_practice/install

3. docker pull mysql:latest
4. docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=bmpExN4RDJAM9nyTy2f94wYfMo38 mysql
5. docker ps
6. docker exec -it fa41a2f61da4 /bin/bash
7. mysql -u root -p
8. bmpExN4RDJAM9nyTy2f94wYfMo38
9. create DATABASE db1;
10.

docker 查看所有的容器
docker ps -a

1. docker pull mongo:latest
2. docker images
   1. # 创建一个容器使用 mongo-test 镜像名字为 mongo
3. docker run -itd --name mongo-test -p 27017:27017 mongo --auth
4. docker exec -it ea73b583eb1c /bin/bash
5. mongosh admin
   1. ## 创建一个名为 admin，密码为 123456 的用户。
6. db.createUser({ user:'root',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'},"readWriteAnyDatabase"]});
   1. # 尝试使用上面创建的用户信息进行连接。
7. db.auth('root', '123456')
   1. # 创建数据库名称为data
8. use data
   1. # 创建一个集合
9. db.createCollection(name)

# docker 安装

center os 8.+ 安装docker https://yeasy.gitbook.io/docker_practice/install/centos

center os 7.9 安装docker
sudo yum install -y yum-utils

sudo yum-config-manager \
 --add-repo \
 https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl start docker

# nvm安装

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 国内源

bash -c "$(curl -fsSL https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh)"

source ~/.bashrc
nvm install --lts
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install -g pnpm
pnpm i --registry=https://registry.npmmirror.com

npm install http-server -g --registry=https://registry.npmmirror.com

## 80 http

http-server -p 80 -d false --proxy http://localhost:80?

## 443 https

http-server -p 443 -d false --proxy https://localhost:443? -S -C ./cert.pem -K ./key.pem
http-server -p 443 -d false --proxy https://localhost:443? -S

pnpm run start:prod

# unzip -d ./backend backend.zip

# linux Screen 命令

There is no screen to be resumed matching

https://www.runoob.com/linux/linux-comm-screen.html
安装：
yum install screen

Ctrl + a d：将指定的screen作业离线。
Ctrl + a c：创建一个新窗口（带shell）
Ctrl + a “：列出所有窗口
Ctrl + a 0：切换到窗口0（按数字）
Ctrl + a：重命名当前窗口
Ctrl + a S：将当前区域水平分为两个区域
Ctrl + a | ：将当前区域垂直分为两个区域
Ctrl + a：选项卡将输入焦点切换到下一个区域
Ctrl + a Ctrl + a：在当前区域和上一个区域之间切换
Ctrl + a Q：关闭除当前区域外的所有区域
Ctrl + a X：关闭当前区域

# screen -ls //显示已创建的screen终端

There are screens on:
2433.pts-3.linux (2013年10月20日 16时48分59秒) (Detached)
2428.pts-3.linux (2013年10月20日 16时48分05秒) (Detached)
2284.pts-3.linux (2013年10月20日 16时14分55秒) (Detached)
2276.pts-3.linux (2013年10月20日 16时13分18秒) (Detached)
4 Sockets in /var/run/screen/S-root.

# screen -r 2276 //连接 screen_id 为 2276 的 screen终端

192.168.137._
127.0.0.1
_.lictic.com

# http-server -p 80 -d false

# 内网穿透 :cpolar http 3000
