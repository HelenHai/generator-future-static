## 目录规范

### src

- `action` 对应于每个页面的入口，所有执行操作都将在此入口处被执行

```js

	import action from '../utils/fetch';
	/**
     * 这种方式可以引入cortex包，前提是先安装cortex依赖包
     */
    import hippo from '@cortex/hippo';
    
	//逻辑入口，类似main
	$(()=>{
		
		//逻辑
		fetch('/test?id=1',{
			success:(data)=>{
	
				//这里目前是获取的本地html/mocks下test.json的数据
				console.dir(data);
			}
		});
	});
```

- `config` 基本配置文件，后缀可以为js也可为json，这里可以配置需要单独打包的公共类库，可以配置一些类库的别名等。

- `lib` 存放一些通过bower安装的类库文件

- `html` 资源文件，包括样式、html、图片

- `service`	页面中各个模块的逻辑，此目录下的文件命名应该按照java类命名规范 

- `template` 一些模板文件，某些页面中存在一些异步渲染模块，需要一个类似jsp方式的模板，通过传入数据得到最终html然后放入页面某一处。本脚手架依赖handlebars类库，语法可参考 http://handlebarsjs.com/

```js

	import loginTpl from '../template/login.html';
	
	let html = loginTpl({
	   title:'登陆',
	   content:'请登录',
	   footer:''
    });
    
    $('#login').html(html);
```

```html

	<!--login.html-->
	
	<div class="header">{{title}}</div>
    <div class="content" style="padding: 0 20px 0">
    
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
    </div>
    <div class="footer">
        <button class="success odal-success">确定</button>
        <button class="cancel modal-cancel">取消</button>
    </div>
```

- `utils` 工具类存放处

### dist

本地调试可以引入dev.js在页面中处理页面中重复的部分

## 命名规范

* Class命名规范为首字母大写，之后驼峰式。
* `action` 和 `html` 文件名应保持一致。
* 其他类型的文件命名规则为单词之间应以（-）连接，所有单词应保持小写方式。

## 入口

打包入口为action文件夹，对应生成页面级的css和js

## 页面预览

访问html页面 h5.dianping.com/app/appName/path/to/file.html		

访问其余静态资源 www.dpfile.com/app/appName/path/to/file.min.md5.ext		

appName 指的是package.json中的name字段 			

beta环境对应的域名分别为 h5.51ping.com 和 s1.51ping.com		

打包后生成的文件

## Command

```
	#打包	
	npm run build	
	#本地演示dev
	npm run dev
```

## 发布方式

点评内部通过dianpingoa中的ci方式发布，ci类型请选择 ** peon_static **

注：关于peon_static 发布方式请至：[http://wiki.sankuai.com/pages/viewpage.action?pageId=531468248 ](http://wiki.sankuai.com/pages/viewpage.action?pageId=531468248)   查看文档。

## 回滚

目前此发布方式的回滚功能还在开发，为了保险起见，每次通过分支进行合并开发发布。

## 引用

点评内部通过cortex方式在页面中引用dist下的文件，其他同学需根据自己的实际情况而定。

- cortex引入方式

```
	<cortex:css resource="/app/jquery-project-template/test.css" decorate="true"></cortex:css>
	<cortex:js resource="/app/jquery-project-template/jquery.js" decorate="true"></cortex:js>
	<cortex:js resource="/app/jquery-project-template/test.js" decorate="true"></cortex:js>
```

## 本地调试

### 前端资源调试

- 执行npm(cnpm) install
- 执行cortex install
- 执行npm run dev 启动本地环境，预览页面

### 后端调试

在java项目.ftl中引入通过 npm run dev启动好的链接文件

```
	<script>
		window.ENV={
			actionName:'actionName' //对应action中定义的名字
		};
	</script>
	<script src="http://127.0.0.1:3005/dist/bundle.js"></script>
```
或通过配置判断环境引入不同环境的文件

```

	#if Request['isLocal'] >
    <script src="http://127.0.0.1:3005/dist/bundle.js"></script>
    <#else>
        <cortex:css resource="/app/jquery-project-template/test.css" decorate="true"></cortex:css>
		<cortex:js resource="/app/jquery-project-template/jquery.js" decorate="true"></cortex:js>
		<cortex:js resource="/app/jquery-project-template/test.js" decorate="true"></cortex:js>
        <@cortex.jsFramework/>
        <@cortex.facadesPlaceHolder/>
    </#if>
```

** 如果有sso，请将sso配置文件禁用掉，或者手动配置sso信息 **


