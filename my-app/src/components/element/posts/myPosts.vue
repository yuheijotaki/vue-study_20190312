<template>
  <section>
    <div class="search_area">
      <input type="text" v-model="tag" name="" value="">
      <input type="button" v-on:click="filterTag()" name="" value="search">
    </div>
    <p v-show="loading" class="loading">loading...</p>
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
        this.posts = response.data;
      })
      .catch( error => {
        console.log(error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 40px;
}
.search_area {
  input {
    font-size: 12px;
    line-height: 1;
    padding: 5px 8px;
    box-sizing: border-box;
    &[type="text"] {
      background: #fff;
      border: #ddd 1px solid;
      color: #333;
    }
    &[type="button"] {
      background: #333;
      border: #333 1px solid;
      color: #fff;
      &:hover {
        cursor: pointer;
        opacity: .8;
      }
    }
  }
}
.post_list {
  margin-top: 40px;
  list-style: none;
  li {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    line-height: 1.2;
    h2 {
      margin-top: 10px;
      font-size: 12px;
    }
    p {
      font-size: 10px;
    }
    a {
      color: #333;
      text-decoration: none;
      border-bottom: #333 1px dotted;
    }
  }
}
</style>
