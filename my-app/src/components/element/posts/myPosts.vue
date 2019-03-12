<template>
  <section>
    <p v-show="loading" class="loading">loading...</p>
    <ul class="post_list">
      <li v-for="(post,index) in posts" :key="index">
        <p>{{post.updated_at}} by: <a :href="`https://qiita.com/${post.user.id}`" target="_blank">{{post.user.name}}</a></p>
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
      loading: false
    }
  },
  created: function(){
    this.loading = true; // loading を表示する
    this.request();
  },
  methods: {
    request: function(){
      axios.get( 'https://qiita.com/api/v2/tags/vue.js/items' )
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
.post_list {
  margin-top: 40px;
  list-style: none;
  li {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    line-height: 1.2;
    h2 {
      margin-top: 5px;
      font-size: 18px;
    }
    a {
      // color: #333;
      text-decoration: none;
    }
  }
}

</style>
