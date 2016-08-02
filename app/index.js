'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var fs = require('fs');
var yosay = require('yosay');
var notifier = require('node-notifier');

var packageJSON = require('../package.json');
var selfupdate = require('selfupdate');

function getGitOrigin() {
    var gitOrigin = '';
    try {
        var gitConfig = fs.readFileSync('./.git/config', 'utf-8'), m = gitConfig.match(/\[remote\s+"origin"]\s+url\s+=\s+(\S+)\s+/i);

        if (m) {
            gitOrigin = m[1];
        }
    } finally {
        return gitOrigin;
    }
}

function getHomeUrl(repo) {
    var url = '';
    try {
        var m = repo.match(/^git@(\S+)\.git$/i);
        if (m) {
            url = m[1].split(':').join('/');
        }
    } finally {
        return url;
    }
}

module.exports = generators.Base.extend({
    initializing: function () {
        this.props = {};

        //检查版本，提示更新
        selfupdate.isUpdated(packageJSON, function (error, isUpdated) {
            if (error) throw error;
            if (isUpdated) return;

            notifier.notify({
                title: 'generator-trade-static',
                subtitle: '已有新版本,正在更新...',
                message: '如果更新失败，请手动更新\n执行 npm i -g generator-trade-static',
                contentImage: path.resolve(__dirname, 'future-logo.png'),
                // icon:path.resolve(__dirname,'peon.jpg'),
                sound: true, // Only Notification Center or Windows Toasters
                wait: true // Wait with callback, until user action is taken against notification
            }, function (err, response) {
                // Response is response from notification
            });

            console.log(chalk.red('工具更新中...') );

            selfupdate.update(packageJSON, function (error, version) {
                if (error) throw error;
                notifier.notify({
                    title: 'generator-trade-static',
                    subtitle: '更新完毕',
                    message: '请重新运行本应用\n执行 yo trade-static',
                    contentImage: path.resolve(__dirname, 'future-logo.png'),
                    // icon:path.resolve(__dirname,'peon.jpg'),
                    sound: true, // Only Notification Center or Windows Toasters
                    wait: true // Wait with callback, until user action is taken against notification
                }, function (err, response) {
                    // Response is response from notification
                });

            });

        });
    },

    prompting: function () {
        var done = this.async();
        this.log(yosay(
            'Welcome to the sweet ' + chalk.red(packageJSON.name) + ' generator!'
        ));

        var prompts = [
            {
                name: 'boilerplate',
                type: 'list',
                choices: [
                    'webpack+react+redux',
                    'webpack+jquery+handlebars',
                    'module-template(jquery or react)'
                ],
                default: 'webpack-react-redux',
                message: 'boilerplate'
            }, {
                name: 'name',
                message: 'Your project name',
                default: path.basename(process.cwd())// Default to current folder name
            }, {
                name: 'version',
                default: '0.1.0',
                message: 'version'
            },
            {
                name: 'description',
                default: 'trade f2e project',
                message: 'description'
            },
            {
                name: 'repo',
                default: getGitOrigin(),
                message: 'git repository'
            },
            {
                name: 'keywords',
                default: 'trade-static',
                message: 'keywords',
                filter: function (words) {
                    return words.split(/\s*,\s*/g);
                }
            },
            {
                name: 'author',
                default: this.user.git.name(),
                message: 'author'
            },
            {
                name: 'email',
                default: this.user.git.email(),
                message: 'E-Mail'
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someAnswer;

            done();
        }.bind(this));
    },
    default: function () {

        this.composeWith('license', {
            options: {
                name: this.props.author,
                email: this.props.email,
                website: ''
            }
        }, {
            local: require.resolve('generator-license/app')
        });

    },
    writing: {
        "init": function () {
            this.currentDir = 'webpack-react-redux';
            var map = {
                "webpack+react+redux": "webpack-react-redux",
                "webpack+jquery+handlebars": "webpack-jquery-handlebars",
                'module-template(jquery or react)':'module-template'
            };
            this.currentDir = map[this.props.boilerplate] || 'webpack+react+redux';
        },
        /*
         * 生成 package.json
         *
         * */
        "package_json": function () {
            var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

            var pkg_json = {
                    "webpack+react+redux": {
                        "peerDependencies": {},
                        "dependencies": {
                            "babel-polyfill": "^6.3.14",
                            "bootstrap": "^3.3.6",
                            "classnames": "^2.2.0",
                            "eagle-ui": "^1.4.5",
                            "eg-tools": "^5.0.1",
                            "es5-shim": "^4.5.9",
                            "extend": "^3.0.0",
                            "history": "^1.13.1",
                            "immutable": "^3.7.5",
                            "lodash": "^3.10.1",
                            "phoenix-styles": "^0.1.5",
                            "phoenix-ui": "^0.1.3",
                            "react": "^0.14.3",
                            "react-dom": "~0.14.8",
                            "react-redux": "^4.0.0",
                            "react-router": "^1.0.0",
                            "redux": "^3.0.4",
                            "redux-thunk": "^1.0.0",
                            "whatwg-fetch": "^0.10.1"
                        },
                        "devDependencies": {
                            "autoprefixer": "^6.3.7",
                            "autoprefixer-loader": "^3.2.0",
                            "babel": "^6.0.15",
                            "babel-core": "^5.8.23",
                            "babel-loader": "^5.3.2",
                            "babel-preset-es2015": "^6.1.18",
                            "babel-preset-react": "^6.1.18",
                            "babel-preset-stage-0": "^6.1.18",
                            "cortex-recombiner": "^1.0.13",
                            "cortex-recombiner-webpack-plugin": "^1.0.3",
                            "css-loader": "0.17.0",
                            "extend": "^3.0.0",
                            "extract-text-webpack-plugin": "^0.8.2",
                            "file-loader": "^0.9.0",
                            "glob": "^7.0.5",
                            "gulp": "^3.9.0",
                            "gulp-babel": "^5.3.0",
                            "gulp-h-manifest": "^1.0.2",
                            "gulp-htmlincluder": "^0.1.0",
                            "gulp-less": "^3.0.3",
                            "gulp-load-plugins": "^1.0.0-rc.1",
                            "gulp-minify-css": "^1.2.1",
                            "gulp-open": "^2.0.0",
                            "gulp-rename": "^1.2.2",
                            "gulp-rimraf": "^0.2.0",
                            "gulp-util": "^3.0.6",
                            "gulp-webpack": "^1.5.0",
                            "handlebars-loader": "^1.3.0",
                            "html-webpack-plugin": "^2.22.0",
                            "less": "^2.5.1",
                            "less-loader": "^2.2.0",
                            "postcss-color-rebeccapurple": "^2.0.0",
                            "postcss-initial": "^1.5.2",
                            "postcss-loader": "^0.9.1",
                            "raw-loader": "^0.5.1",
                            "react-hot-loader": "^1.3.0",
                            "run-sequence": "^1.1.5",
                            "style-loader": "^0.12.3",
                            "url-loader": "^0.5.7",
                            "webpack": "^1.12.1",
                            "webpack-bower-resolver": "0.0.1",
                            "webpack-dev-server": "^1.10.1"
                        },
                        "scripts": {
                            "demo": "node_modules/.bin/gulp ",
                            "build": "node_modules/.bin/gulp ",
                            "dev": "node_modules/.bin/gulp dev",
                            "start": "node_modules/.bin/gulp dev"
                        }
                    },
                    "webpack+jquery+handlebars": {
                        "peerDependencies": {},
                        "dependencies": {
                            "babel-polyfill": "^6.3.14",
                            "bootstrap": "^3.3.6",
                            "handlebars": "^4.0.5",
                            "jq-modal": "^0.1.3",
                            "jquery": "^2.2.4",
                            "underscore": "^1.8.3",
                            "es5-shim": "^4.5.9"
                        },
                        "devDependencies": {
                            "autoprefixer": "^6.3.7",
                            "autoprefixer-loader": "^3.2.0",
                            "babel": "^6.0.15",
                            "babel-core": "^5.8.23",
                            "babel-loader": "^5.3.2",
                            "babel-polyfill": "^6.8.0",
                            "cortex-recombiner-webpack-plugin": "^1.0.3",
                            "css-loader": "0.17.0",
                            "ejs-loader": "^0.3.0",
                            "extend": "^3.0.0",
                            "extract-text-webpack-plugin": "^0.8.2",
                            "file-loader": "^0.9.0",
                            "glob": "^5.0.14",
                            "gulp": "^3.9.0",
                            "gulp-babel": "^5.3.0",
                            "gulp-htmlincluder": "^0.1.0",
                            "gulp-less": "^3.0.3",
                            "gulp-load-plugins": "^1.0.0-rc.1",
                            "gulp-minify-css": "^1.2.1",
                            "gulp-open": "^2.0.0",
                            "gulp-rename": "^1.2.2",
                            "gulp-rimraf": "^0.2.0",
                            "gulp-util": "^3.0.6",
                            "gulp-webpack": "^1.5.0",
                            "handlebars-loader": "^1.3.0",
                            "html-webpack-plugin": "^2.22.0",
                            "less": "^2.5.1",
                            "less-loader": "^2.2.0",
                            "postcss-color-rebeccapurple": "^2.0.0",
                            "postcss-initial": "^1.5.2",
                            "postcss-loader": "^0.9.1",
                            "raw-loader": "^0.5.1",
                            "react-hot-loader": "^1.3.0",
                            "run-sequence": "^1.2.1",
                            "style-loader": "^0.12.3",
                            "url-loader": "^0.5.7",
                            "webpack": "^1.12.1",
                            "webpack-bower-resolver": "0.0.1",
                            "webpack-dev-server": "^1.10.1"
                        },
                        "scripts": {
                            "demo": "node_modules/.bin/gulp ",
                            "build": "node_modules/.bin/gulp ",
                            "dev": "node_modules/.bin/gulp dev",
                            "start": "node_modules/.bin/gulp dev"
                        }
                    },
                    "module-template(jquery or react)":{
                        "main": "lib/",
                        "dependencies": {
                            "extend": "^3.0.0",
                            "classnames": "^2.1.3",
                            "handlebars": "^4.0.5"
                        },
                        "peerDependencies": {
                        },
                        "devDependencies": {
                            "babel": "^6.0.15",
                            "babel-core": "^5.8.23",
                            "babel-loader": "^5.3.2",
                            "babel-polyfill": "^6.8.0",
                            "css-loader": "0.17.0",
                            "extract-text-webpack-plugin": "^0.8.2",
                            "glob": "^5.0.14",
                            "gulp": "^3.9.0",
                            "gulp-babel": "^5.3.0",
                            "gulp-karma": "0.0.5",
                            "gulp-less": "^3.0.3",
                            "gulp-load-plugins": "^1.0.0-rc.1",
                            "gulp-minify-css": "^1.2.1",
                            "gulp-open": "^2.0.0",
                            "gulp-rename": "^1.2.2",
                            "gulp-util": "^3.0.6",
                            "gulp-webpack": "^1.5.0",
                            "handlebars-loader": "^1.3.0",
                            "jasmine-core": "^2.3.4",
                            "karma": "^0.13.15",
                            "karma-chrome-launcher": "^0.2.1",
                            "karma-cli": "^0.1.1",
                            "karma-jasmine": "^0.3.6",
                            "karma-webpack": "^1.7.0",
                            "less": "^2.5.1",
                            "less-loader": "^2.2.0",
                            "raw-loader": "^0.5.1",
                            "react": "^0.14.3",
                            "react-hot-loader": "^1.3.0",
                            "style-loader": "^0.12.3",
                            "webpack": "^1.12.1",
                            "url-loader": "^0.5.7",
                            "webpack-bower-resolver": "0.0.1",
                            "webpack-dev-server": "^1.10.1"
                        },
                        "scripts": {
                            "build": "node_modules/.bin/gulp && node_modules/.bin/gulp min",
                            "test": "karma start",
                            "demo": "node_modules/.bin/gulp demo",
                            "doc": "smartDoc ||node_modules/.bin/smartDoc",
                            "start":"npm run demo",
                            "prepublish": " npm run build"
                        }
                    }
                }[this.props.boilerplate] || {};

            this.pkg = extend({
                name: _.kebabCase(this.props.name),
                version: this.props.version,
                description: this.props.description,
                repository: {
                    type: 'git',
                    url: this.props.repo
                },
                author: {
                    name: this.props.author,
                    email: this.props.email
                },
                keywords: [],
                "dependencies": pkg_json.dependencies || {},
                "devDependencies": pkg_json.devDependencies || {},
                "scripts": pkg_json.scripts || {},
                "bugs": {
                    "url": "http://" + getHomeUrl(this.props.repo) + "/issues"
                },
                "homepage": "http://" + getHomeUrl(this.props.repo)
            }, currentPkg);

            // Combine the keywords
            if (this.props.keywords) {
                this.pkg.keywords = _.uniq(this.props.keywords.concat(this.pkg.keywords));
            }

            // Let's extend package.json so we're not overwriting user previous fields
            this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
        },
        /*
         * 生成 cortex.json
         *
         * */
        "cortex_json": function () {
            //if (this.props.boilerplate.search('cortex') != -1) {
                var currentCortex = this.fs.readJSON(this.destinationPath('cortex.json'), {});

                var cortex_json = {
                        "webpack+react+redux": {
                            devDependencies: {},
                            dependencies: {
                                "hippo": "^1.2.15",
                                "dpzeus": "~0.4.3"
                            },
                            scripts: {}
                        },
                        "webpack+jquery+handlebars": {
                            devDependencies: {},
                            dependencies: {
                                "hippo": "^1.2.15"
                            },
                            scripts: {}
                        }
                    }[this.props.boilerplate] || {};

                var cortex = extend({
                    name: this.pkg.name,
                    version: this.pkg.version,
                    description: this.pkg.description,
                    main: 'index.js',
                    "directories": {
                        "src": "dist",
                        "html": "html"
                    },
                    "dependencies": cortex_json.dependencies || {},
                    "devDependencies": cortex_json.devDependencies || {},
                    "scripts": cortex_json.scripts || {},
                    repository: this.props.repo,
                    author: this.pkg.author,
                    "license": this.pkg.license,
                    keywords: this.pkg.keywords,
                    "bugs": {
                        "url": "http://" + getHomeUrl(this.props.repo) + "/issues"
                    },
                    "homepage": "http://" + getHomeUrl(this.props.repo)
                }, currentCortex);

                // Let's extend package.json so we're not overwriting user previous fields
                this.fs.writeJSON(this.destinationPath('cortex.json'), cortex);
            //}
        },
        /*
         * 生成 README.md
         *
         * */
        "directories": function () {
            //this.fs.copy(this.templatePath('./' + this.currentDir ) + "/gitignore", this.destinationPath('./.gitignore'));
            this.fs.copy(this.templatePath('./' + this.currentDir) + "/**/*.*", this.destinationPath('./'));
            this.fs.copy(this.templatePath('./' + this.currentDir) + "/\.*", this.destinationPath('./'));
            this.fs.copy(this.templatePath('./' + this.currentDir ) + "/gitignore", this.destinationPath('./.gitignore'));
            this.fs.copy(this.templatePath('./' + this.currentDir ) + "/npmignore", this.destinationPath('./.npmignore'));

            //this.fs.copyTpl(this.templatePath('./' + this.currentDir + '/tpl') + "/**/*.*", this.destinationPath('./'), {AppName: this.pkg.name});
        }
    },

    install: function () {
        //this.installDependencies({bower: false});
        var opt = {
            cwd: this.destinationPath('./')
        };

        switch (this.props.boilerplate) {
            case "webpack+react+redux":
                //this.spawnCommandSync('cortex', ['install'], opt);
                this.spawnCommandSync('npm', ['install'], opt);
                this.spawnCommandSync('npm', ['start'], opt);
                break;
            case "webpack+jquery+handlebars":
                //this.spawnCommandSync('cortex', ['install'], opt);
                this.spawnCommandSync('npm', ['install'], opt);
                this.spawnCommandSync('npm', ['start'], opt);
                break;
            case "module-template(jquery or react)":
                this.spawnCommandSync('npm', ['install'], opt);
                this.spawnCommandSync('npm', ['start'], opt);
                break;
            default:
                break;
        }
    }
});
