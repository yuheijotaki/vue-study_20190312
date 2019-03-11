<template>
  <section>
    <p v-show="loading" class="loading">loading...</p>
    <ul class="post_list">
      <li v-for="(post,index) in posts" :key="index" v-show="post.customData.display">
        <a :href="post.acf.post_url" target="_blank">
          <figure><img :src="post.images.full" :alt="post.title.rendered"></figure>
          <div class="wrap" :style="{ color: post.acf.post_color_letter, background: post.acf.post_color_bg }">
            <div class="inner">
              <h2>{{post.title.rendered}}</h2>
              <p>{{post.category_name}}</p>
            </div>
          </div>
        </a>
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
      axios.get( 'https://works.yuheijotaki.com/wp-json/wp/v2/posts?per_page=100' )
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
.post_category {
  margin-top: 40px;
  display: flex;
  list-style: none;
  li {
    font-size: 13px;
    line-height: 1.2;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
    a {
      color: #ccc;
      text-decoration: none;
      &.is-selected {
        color: #222;
      }
    }
  }
}
.loading {
  margin-top: 40px;
}
.post_list {
  margin-top: 40px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 25%;
    a {
      display: block;
      text-decoration: none;
      position: relative;
      figure {
        font-size: 0;
        line-height: 0;
        img {
          width: 100%;
          height: auto;
        }
      }
      .wrap {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          text-align: center;
          letter-spacing: 0.025em;
          h2 {
            font-size: 13px;
            line-height: 1.2;
          }
          p {
            margin-top: .2em;
            font-size: 10px;
            line-height: 1.4;
          }
        }
      }
      &:hover {
        .wrap {
          display: block;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
.post_list {
  li {
    width: 33.333334%;
    a {
      &:hover {
        .wrap {
          display: none;
        }
      }
    }
  }
}
} /* - 768px */

</style>
