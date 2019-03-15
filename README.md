# Vue.js / JSON から情報を引っ張ってくる その12

## やること

- Qiita の API から投稿を描画する。
- 結果がない場合のエラー表示
- デフォルトで `vue.js` を `<input type="text">` にいれておく。
- タグの一覧から選択したタグの記事一覧を表示

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

#### デフォルトで `vue.js` を `<input type="text">` にいれておく。

JavaScript 側で取得・書き換えする必要あるのと思い込んでいましたが、`data` の初期値に設定しておくだけでOK...

```javascript
  data () {
    return {
      ...
      tag: 'vue.js',
      ...
    }
  },
```

#### タグの一覧から選択したタグの記事一覧を表示

```html
<ul>
  <li v-for="(recommendTag,index) in recommendTags" :key="index">
    <a href="javascript:void(0);" @click="placeInput" :data-tag="recommendTag">{{recommendTag}}</a>
  </li>
</ul>
```

```javascript
export default {
  name: 'myPosts',
  data () {
    return {
      ...
      recommendTags: ['html','css','javascript','php']
    }
  },
  ...
  methods: {
    ...
    placeInput: function(event) {
      const clickedTag = event.currentTarget.getAttribute('data-tag'); // クリックしたタグの取得
      document.getElementById('search_field').value = clickedTag; // クリックしたタグをinputに入れる
      this.tag = clickedTag; // クリックしたタグを `this.tag` に定義
    }
  }
}
```

## まとめ

[**Github**](https://github.com/yuheijotaki/vue-study_20190312)

- やりたいこと ＜ キレイにおさめること  
  優先してしまってあまり勉強するべきことできていない気がするので反省しています。
- 次回やることはこれの続きか、ちょっと考えてみようと思います。

##### 本当はやりたいこと

- タグを選択したタイミングで検索が走るようにしたい
- ページングをつける
- （タグの掛け合わせ検索）

