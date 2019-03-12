# Vue.js / JSON から情報を引っ張ってくる その10

## やること

- Qiita の API から投稿を描画する。

#### Qiita のAPIから記事を引っ張ってくる

今回はとりあえず `vue.js` というタグがついた記事を引っ張るようにしたので、  
WordPress の REST API の際と一緒で、`axios` を使って、`https://qiita.com/api/v2/tags/vue.js/items` のエンドポイントを指定する。

```javascript
...
request: function(){
  axios.get( 'https://qiita.com/api/v2/tags/vue.js/items' )
    .then( response => {
    this.posts = response.data;
  })
}
...
```

参考：

- [Qiita API v2ドキュメント \- Qiita:Developer](https://qiita.com/api/v2/docs#get-apiv2tags)
- [Vue\.js\+axiosでQiitaの投稿を取得、表示してGitHub Pagesで公開しました \- Qiita](https://qiita.com/kobu_tomo/items/6f6e86f1226ab0651813)

#### `v-bind:` 内でデータと文字列を連結する

Qiita のユーザーページのリンクを描画したい場合、`https://qiita.com/[USERNAME]` のURLになる。  
`https://qiita.com/` と `post.user.id` を連結させたいので、

```html
<a :href="`https://qiita.com/${post.user.id}`" target="_blank">
```

と `v-bind:` 内にテンプレートリテラルを用いて書くと文字列の連結が可能。

参考：[Vueのテンプレートのv\-bind内でもJavaScriptのテンプレートリテラルが使えた \- GAミント至上主義](https://uyamazak.hatenablog.com/entry/2018/11/08/160714)

## まとめ

[**Github**](https://github.com/yuheijotaki/vue-study_20190312)

- ユーザー取得できていない記事があるのでもう少し調べる。
- 環境構築（Vue CLI のインストールだけですが）は時間かからなくなってきて慣れた感があります。
- タグの一覧から選択したタグの記事一覧を表示を次はやってみる
- ページング（or LOAD MORE）もつけてみたい

#### 参考

- [Vue\.jsでAPI通信 \- Qiita](https://qiita.com/MariMurotani/items/a8576974deeabf9daf6e)
- [axios＋Vue\.js＋Qiita API v2を利用して自分の投稿記事と閲覧件数（views）などを一覧表示してみる \- Qiita](https://qiita.com/You_name_is_YU/items/8c83e4c4c3f9c273b704)
- [Vue\.js\+axiosでQiitaの投稿を取得、表示してGitHub Pagesで公開しました \- Qiita](https://qiita.com/kobu_tomo/items/6f6e86f1226ab0651813)

