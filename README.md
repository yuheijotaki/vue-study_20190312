# Vue.js / JSON から情報を引っ張ってくる その12

## やること

- Qiita の API から投稿を描画する。
- 結果がない場合のエラー表示
- デフォルトで `vue.js` を `<input type="text">` にいれておく。
- タグの一覧から選択したタグの記事一覧を表示
- ページングをつける

#### 結果がない場合のエラー表示

```html
<div class="search_area">
  <input type="text" v-model="tag" v-on:input="filterTag()" name="" value="" placeholder="tag search">
</div>
<p v-show="error" class="state error">There is no tagged "{{tag}}" posts.</p>
```

```javascript
export default {
  name: 'myPosts',
  data () {
    return {
      ...
      error: false,
      ...
    }
  },
  methods: {
    ...
    filterTag: function(){
      axios.get( `https://qiita.com/api/v2/tags/${this.tag}/items` )
      .then( response => {
        this.error = false; // error を非表示にする
        this.loading = false; // loading を非表示にする
        this.posts = response.data;
      })
      .catch( error => {
        this.posts = [];
        this.error = true; // error を表示する
        console.log(error);
      });
    }
  }
}
```

#### タグの一覧から選択したタグの記事一覧を表示



## まとめ

[**Github**](https://github.com/yuheijotaki/vue-study_20190312)

- 
