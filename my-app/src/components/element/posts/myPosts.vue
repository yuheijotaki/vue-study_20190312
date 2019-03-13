<template>
  <section>
    <div class="search_area">
      <input id="target" type="text" v-model="tag" v-on:input="filterTag()" name="" value="" placeholder="tag search">
      <nav class="recommend">
        <p>Recommend:</p>
        <ul>
          <li><a v-on:click="placeInput()" href="javascript:void(0);">html</a></li>
          <li><a v-on:click="placeInput()" href="javascript:void(0);">css</a></li>
          <li><a v-on:click="placeInput()" href="javascript:void(0);">javascript</a></li>
        </ul>
      </nav>
    </div>
    <p v-show="loading" class="state loading">loading...</p>
    <p v-show="error" class="state error">There is no tagged "{{tag}}" posts.</p>
    <ul class="post_list">
      <li v-for="(post,index) in posts" :key="index">
        <p>{{post.updated_at}} by: <a :href="`https://qiita.com/${post.user.id}`" target="_blank">@{{post.user.id}}</a></p>
        <h2><a :href="post.url" target="_blank">{{post.title}}</a></h2>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: 'myPosts',
  data () {
    return {
      posts: [],
      loading: false,
      error: false,
      tag: ''
    }
  },
  created: function(){
    this.loading = true; // loading を表示する
    this.filterDefault();
  },
  methods: {
    filterDefault: function(){
      axios.get( 'https://qiita.com/api/v2/tags/vue.js/items' )
      .then( response => {
        this.loading = false; // loading を非表示にする
        this.error = false; // error を非表示にする
        this.posts = response.data;
      })
      .catch( error => {
        console.log(error);
      });
    },
    filterTag: function(){
      axios.get( `https://qiita.com/api/v2/tags/${this.tag}/items` )
      .then( response => {
        this.loading = false; // loading を非表示にする
        this.error = false; // error を非表示にする
        this.posts = response.data;
      })
      .catch( error => {
        this.posts = [];
        this.loading = false; // loading を非表示にする
        this.error = true; // error を表示する
        console.log(error);
      });
    },
    placeInput: function(event) {
      document.getElementById('target').value = 'SYNCER';
    }
  }
}
</script>

<style lang="scss" scoped>
.state {
  margin-top: 40px;
}
.search_area {
  input {
    font-size: 12px;
    line-height: 1;
    padding: 6px 8px;
    box-sizing: border-box;
    &[type="text"] {
      background: #fff;
      border: #ccc 1px solid;
      color: #333;
      width: 100%;
    }
  }
  .recommend {
    display: flex;
    align-items: center;
    margin-top: 10px;
    p {
      color: #333;
      font-size: 12px;
      line-height: 1;
      margin-right: 10px;
    }
    ul {
      list-style-type: none;
      display: flex;
      li {
        margin-right: 4px;
        color: #333;
        font-size: 12px;
        line-height: 1;
        a {
          display: inline-block;
          padding: 3px 6px;
          border: #ddd 1px solid;
          background: #eee;
          color: #333;
          text-decoration: none;
          border-radius: 2px;
          &:hover {
            background: #ddd;
          }
        }
      }
    }
  }
}
.post_list {
  margin-top: 40px;
  list-style: none;
  li {
    margin-bottom: 15px;
    p {
      font-size: 10px;
      line-height: 1.2;
    }
    h2 {
      margin-top: 3px;
      font-size: 13px;
      line-height: 1.7;
    }
    a {
      color: #333;
      text-decoration: none;
      border-bottom: #333 1px dotted;
    }
  }
}
</style>
