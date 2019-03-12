# Vue.js / JSON から情報を引っ張ってくる その11

## やること

- Qiita の API から投稿を描画する。
- ユーザー取得できていないものの調整
- 検索テキストフィールドを用意してフィルター

#### Qiitaのユーザー取得について

見落としていただけなのですが、`user.name` は全ユーザーにあるわけではないようだったので、 `user.id` に変更しました。

```
by: <a :href="`https://qiita.com/${post.user.id}`" target="_blank">@{{post.user.id}}</a>
```

#### 入力したフィールドのテキストをもとにフィルター

この [Qiita](https://qiita.com/kobu_tomo/items/6f6e86f1226ab0651813) の記事通りなのですが、

```html
... 省略
<div class="search_area">
	<input type="text" v-model="tag" name="" value="">
	<input type="button" v-on:click="filterTag()" name="" value="search">
</div>
... 省略
```

```javascript
data () {
  return {
	  // ... 省略
    tag: ''
  }
},
methods: {
  // ... 省略
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
```

とすると、ボタンが押された際に入力されているテキストのタグが含まれる記事を出力してあげる。

## まとめ

[**Github**](https://github.com/yuheijotaki/vue-study_20190312)

- ブラウザリロード入れていると、結構すぐに [API Rate Limit](http://service.sakuraweb.com/fuyutiger/blog/2010/07/apiapi-rate-limit.html) なるものに引っかかっちゃいますね。。
- サクサクで動くのですげーってなりますね。

#### 残りやること

- 結果がない場合のエラー表示
- タグの一覧から選択したタグの記事一覧を表示
- ページングをつける