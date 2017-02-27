<template>
<div class="main" oncontextmenu="">
  <header class="headerContainer">
    <div class="left">
      <div class="logoContainer">NOTE-PAGE</div>
      <div class="topMenuContainer">
        <div class="simMenuContainer active">笔记</div>
        <div class="simMenuContainer">分享</div>
        <div class="simMenuContainer">关于</div>
      </div>
    </div>
    <div class="right">
      <div class="userLogoContainer">
        <img src="../assets/mylogo.png" alt="">
      </div>
      <div class="userInfo">
        <div class="userName">鹳狸猿</div>
        <div class="intr">世界上最好的程序员</div>
      </div>
      <span class="icon icon-github"></span>
      <span class="icon icon-exit"></span>
    </div>
  </header>
  <div class="mainContainer">
    <div class="menuContainer">
      <div class="newNoteContainer">
        <div class="btn newNote"><span class="icon-edit"></span>新建笔记</div>
      </div>
      <div class="menuContentContainer">
        <div class="simContainer myNewNotes" :class="{ active: menuActive === 0 }" @click="menuToggle(0)"><span class="icon-stack"></span>最新文档</div>
        <div class="simContainer myShare" :class="{ active: menuActive === 1 }" @click="menuToggle(1)"><span class="icon-share-alt"></span>我的分享</div>
        <div class="simContainer myFolder" :class="{ active: menuActive === 2 }" @click="menuToggle(2)">
          <span class="icon-folder"></span> 我的文件夹
        </div>
        <div class="myFolderContainer" v-if="folderIsShow">
          <div class="simFolder" v-for="item in folderData" @click="getNotes(item.name)">
            <span class="icon icon-folder"></span> {{item.name}}
          </div>

        </div>
        <div class="simContainer myTrush" :class="{ active: menuActive === 3 }" @click="menuToggle(3)"><span class="icon-bin"></span>垃圾桶</div>
      </div>
    </div>
    <div class="folderContainer">
      <div class="searchContainer">
        <input type="text" id="searchInput" name="searchName" placeholder="请输入关键词...">
        <span class="icon-equalizer"></span>
      </div>
      <div class="searchResultContainer">
        <div class="simNoteContainer" v-for="item in noteData">
          <div class="title">
            <span class="icon icon-markdown"></span><span class="titleWord">  {{item.title}}</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="tips">
            <div class="left">
              <span class="icon icon-clock"></span>
              <span class="addTime">{{item.addTime}}</span>
            </div>
            <div class="right">
              <span class="icon icon-bin"></span>
              <span class="icon icon-share2"></span>
            </div>

          </div>
        </div>
        <p>{{noteContent}}</p>
      </div>
    </div>
    <div class="editContainer">
      <div class="noteTitleContainer">
        <input type="text" name="notetitle" id="noteTtile" :value="noteTitle" @input="update" placeholder="请输入笔记标题">
        <div id="saveNoteBtn" @click="saveNotefn">保存</div>
      </div>
      <div id="editormd">
        <editor></editor>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import editor from '../components/Editor'
    import {
        mapState
    } from 'vuex'

    // 获取指定文件夹内的笔记数据
    function getNotesByType(type, that) {
        var url = 'http://localhost:10001/notes?category=' + type + '&status=0'
        that.$http({
            method: 'GET',
            url: url,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response.body)
            that.noteData = response.body
        }, (response) => {
            console.log('error')
        })
    }
    // 获取文件夹数据
    function getfolder(that) {
        var url = 'http://localhost:10001/folders'
        that.$http({
            method: 'GET',
            url: url,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response.body)
            that.folderData = response.body
        }, (response) => {
            console.log('error')
        })
    }

    function addNote(obj, that) {
        var url = 'http://localhost:10001/notes?status=0'
        that.$http({
            method: 'POST',
            url: url,
            body: obj,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                console.log('添加成功')
            }
        }, (response) => {
            console.log('error')
        })
    }
    //  获取分享的笔记
    function getShareNotes(obj, that) {
        obj = obj || {}
        var url = 'http://localhost:10001/notes?share=true&status=0'
        that.$http({
            method: 'GET',
            url: url,
            body: obj,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response)
            that.noteData = response.body
        }, (response) => {
            console.log('error')
        })
    }
    // 获取最新笔记
    function getNewNotes(obj, that) {
        obj = obj || {}
        var url = 'http://localhost:10001/notes?_sort=addTime&_order=DESC&status=0'
        that.$http({
            method: 'GET',
            url: url,
            body: obj,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response)
            that.noteData = response.body
        }, (response) => {
            console.log('error')
        })
    }
    // 获取回收站笔记
    function getTrushNotes(obj, that) {
        obj = obj || {}
        var url = 'http://localhost:10001/notes?_sort=addTime&_order=DESC&status=1'
        that.$http({
            method: 'GET',
            url: url,
            body: obj,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((response) => {
            console.log(response)
            that.noteData = response.body
        }, (response) => {
            console.log('error')
        })
    }

    export default {
        name: 'main',
        data() {
            return {
                menuActive: 2,
                folderIsShow: true,
                noteTitle: '',
                noteData: [],
                folderData: []
            }
        },
        created: function() {
            console.log('创建完成')
                // getNotesByType('web', this)
            getNewNotes({}, this)
            getfolder(this)
        },
        computed: mapState({
            noteContent() {
                return this.$store.state.noteContent
            }
        }),
        components: {
            editor
        },
        methods: {
            menuToggle(data) {
                switch (data) {
                    case 0:
                        this.getNewfn()
                        break
                    case 1:
                        this.getSharefn()
                        break
                    case 2:
                        if (this.menuActive === 2) {
                            this.folderIsShow = !this.folderIsShow
                        } else {
                            this.folderIsShow = true
                        }
                        break
                    case 3:
                        this.getTrush()
                        break
                    default:
                        break
                }
                this.menuActive = data
            },
            update(e) {
                this.noteTitle = e.target.value
                this.$store.commit('noteTitlefn', e.target.value)
                console.log()
            },
            saveNotefn() {
                console.log('111')
                addNote({
                    'category': 'web',
                    'title': this.noteTitle,
                    'content': this.$store.state.noteContent,
                    'type': 'md',
                    'share': false,
                    'shareUrl': '',
                    'status': 0,
                    'addTime': new Date().getTime()
                }, this)
            },
            getSharefn() {
                getShareNotes({}, this)
            },
            getNewfn() {
                console.log('sssss')
                getNewNotes({}, this)
            },
            getNotes(data) {
                console.log(data)
                getNotesByType(data, this)
            },
            getTrush() {
                getTrushNotes({}, this)
            }
        },
        watch: {
            message: function() {
                console.log('111')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../../static/css/iconfont.css";
    body {
        width: 100%;
        height: 100%;
        .main {
            height: 100%;
            width: 100%;
            background: pink;
            color: #333;
            font-size: 16px;
            text-align: left;
        }
    }
    
    .headerContainer {
        height: 50px;
        width: 100%;
        background: #2fa79c;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        .left {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .logoContainer {
                width: 190px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-weight: 700;
                font-size: 30px;
                cursor: pointer;
            }
            .topMenuContainer {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .simMenuContainer {
                    height: 100%;
                    width: auto;
                    min-width: 60px;
                    // margin-right: 2px;
                    line-height: 50px;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 0 20px;
                    cursor: pointer;
                    color: #fff;
                    &:hover {
                        background: rgba(255, 255, 255, 0.2);
                    }
                    &.active {
                        background: rgba(255, 255, 255, 0.3);
                    }
                }
            }
        }
        .right {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #fff;
            .userLogoContainer {
                width: 40px;
                height: 40px;
                // background: red;
                border-radius: 50%;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .userInfo {
                height: 100%;
                min-width: 120px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                .userName {
                    font-size: 16px;
                }
                .intr {
                    font-size: 12px;
                }
            }
            span.icon {
                font-size: 22px;
                margin: 0 10px 0 0;
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
        }
    }
    
    .mainContainer {
        width: 100%;
        height: calc(100% - 50px);
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    
    .menuContainer {
        height: 100%;
        width: 200px;
        background: #eee;
        border-right: 1px solid #e1e1e1;
        box-sizing: border-box;
    }
    
    .newNoteContainer {
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        .btn {
            height: 100%;
            width: 100%;
            border: 1px solid #ddd;
            background: #fff;
            border-radius: 4px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            cursor: pointer;
            &:hover {
                background: rgb(63, 144, 238);
                color: #fff;
            }
            span {
                margin: 0 5px 0 0;
            }
        }
    }
    
    .menuContentContainer {
        box-sizing: border-box;
        padding: 10px;
        .simContainer {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            box-sizing: border-box;
            padding-left: 45px;
            span {
                margin: 0 5px 0 0;
            }
            &.active {
                background: rgb(63, 144, 238);
                color: #fff;
            }
            &:not(.active):hover {
                background: #fefefe;
            }
        }
        .myNewNotes {}
        .myShare {}
        .myFolder {
            flex-wrap: wrap;
        }
        .myFolderContainer {
            width: 100%;
            min-height: 100px;
            .simFolder {
                height: 30px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                padding-left: 55px;
                box-sizing: border-box;
                span.icon {
                    margin-right: 5px;
                }
                &.active {
                    background: #66cbeb;
                    color: #fff;
                }
                &:not(.active):hover {
                    background: rgb(209, 250, 238);
                }
            }
        }
        .myTrush {}
    }
    
    .folderContainer {
        height: 100%;
        width: 300px;
        background: #fefefe;
        border-right: 1px solid #e1e1e1;
        box-sizing: border-box;
        .searchContainer {
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            box-sizing: border-box;
            padding: 0 5px;
            #searchInput {
                height: 40px;
                width: 80%;
                border: 1px solid #ddd;
                box-sizing: border-box;
                border-radius: 20px;
                outline: none;
                padding: 0 10px;
                font-size: 14px;
            }
            span {
                font-size: 24px;
                cursor: pointer;
                &:hover {
                    color: #66cbeb;
                }
            }
        }
        .searchResultContainer {
            width: 100%;
            height: calc(100% - 56px);
            overflow: auto;
            box-sizing: border-box;
            .simNoteContainer {
                height: auto;
                width: 100%;
                margin-bottom: 5px;
                box-sizing: border-box;
                padding: 0 5px 5px;
                border-bottom: 1px solid #ddd;
                &:hover {
                    background: #f0f0f0;
                }
                .title {
                    width: 100%;
                    height: 30px;
                    font-size: 16px;
                    line-height: 30px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #000;
                    span.icon {
                        font-size: 20px;
                        margin: 0 5px 0 0;
                    }
                    .titleWord {
                        font-size: 16px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
                .content {
                    width: 100%;
                    height: 40px;
                    line-height: 20px;
                    text-indent: 1em;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color: #333;
                }
                .tips {
                    height: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #999;
                    span.icon {
                        margin-right: 5px;
                        font-size: 12px;
                    }
                    &:hover>.right {
                        display: block;
                    }
                    .right {
                        display: none;
                        span.icon {
                            cursor: pointer;
                            &:hover {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }
    
    .editContainer {
        height: 100%;
        width: calc(100% - 500px);
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
        .noteTitleContainer {
            height: 56px;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            display: flex;
            #noteTtile {
                display: block;
                width: 100%;
                height: 100%;
                outline: none;
                box-sizing: border-box;
                padding: 0 10px;
                font-size: 16px;
                &:focus {
                    background: #f5f5f5;
                }
            }
            #saveNoteBtn {
                width: 100px;
                height: 100%;
                background: #ddd;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &:hover {
                    background: rgb(118, 222, 101);
                    color: #fff;
                }
            }
        }
        #editormd {
            width: 100%;
            height: calc(100% - 55px);
        }
    }
</style>